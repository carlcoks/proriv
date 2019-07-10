const webpack = require('webpack');
const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const base = require('./webpack.base.conf');
const config = require('../config');

const webpackConfig = merge(base, {
  entry: {
    app: './src/entry-client.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.env,
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        );
      },
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new VueSSRClientPlugin(),
  ],
});

if (process.env.analyzer) {
  console.log('Bundle analyzer server started at localhost:8888');

  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'server',
    // Host that will be used in `server` mode to start HTTP server.
    analyzerHost: '127.0.0.1',
    // Port that will be used in `server` mode to start HTTP server.
    analyzerPort: 8888,
    reportFilename: 'report.html',
    defaultSizes: 'parsed',
    openAnalyzer: true,
    generateStatsFile: false,
    statsFilename: 'stats.json',
    statsOptions: null,
    logLevel: 'info',
  }));
}

module.exports = webpackConfig;
