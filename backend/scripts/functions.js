const async = require('async'),
      fs = require('fs'),
      util = require('util'),
      path = require('path');

const readdir = util.promisify(fs.readdir);
const lstat = util.promisify(fs.lstat);
const unlink = util.promisify(fs.unlink);
const rmdir = util.promisify(fs.rmdir);

const functions = {};

functions.removeFolder = async (location, next) => {

  try {
    let allFiles = [];
    const files = (await readdir(location)).map(f => path.join(location, f))
    allFiles.push(...files);


      async.each(allFiles, (f, cb) => {

        (async() => {
          try {
            let file = await lstat(f);

            if (file.isDirectory()) {

                await functions.removeFolder(f, cb);

            } else {

                await unlink(f);
                cb();
            }
          } catch(e) {

          }

        })()


      }, (err) => {
        if (err)
          return err
          // return next(err);

        (async() => {
          try {
            await rmdir(location);
            // return next();
          } catch(e) {
            // return next(e);
          }
        })()

      })

  } catch(e) {
    // return next(e);
  }
}


module.exports = functions;
