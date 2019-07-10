const path = require('path')
const webpack = require('webpack');
const utils = require('./utils')
const config = require('../config')
const vueConfig = require('./vue-loader.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

function resolve (dir) {
  return path.resolve(path.join(__dirname, '..'), dir);
}

const webpackConfig = {
  devtool: isProduction
    ? '#source-map'
    : '#cheap-module-source-map',
  output: {
    path: resolve('./dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: isProduction
          ? ExtractTextPlugin.extract({
            use: 'css-loader?minimize',
            fallback: 'vue-style-loader',
          })
          : ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 2 * 1024,
          name: '[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 2 * 1024,
          name: '[name].[hash:7].[ext]',
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 2 * 1024,
          name: '[name].[hash:7].[ext]',
        }
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProduction ? 'warning' : false,
  },
}

if (isProduction) {
  webpackConfig.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: 'common.[chunkhash].css',
    }),
    new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(ru)$/),
  ];
} else {
  webpackConfig.module.rules.unshift({
    test: /\.(js|vue)$/,
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
  });

  webpackConfig.plugins = [
    new FriendlyErrorsPlugin(),
  ];
}

module.exports = webpackConfig;
