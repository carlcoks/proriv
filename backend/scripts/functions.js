const async = require('async'),
      fs = require('fs'),
      util = require('util'),
      path = require('path');

// const readdir = util.promisify(fs.readdir);
// const lstat = util.promisify(fs.lstat);
// const unlink = util.promisify(fs.unlink);
// const rmdir = util.promisify(fs.rmdir);

const functions = {};

functions.removeFolder = async (location, next) => {

  try {
    let allFiles = [];
    const files = await fs.readdir(location);

    files.map(item => {
      allFiles.push(path.join(location, item));
    })

    async.map(allFiles, (f, cb) => {
      console.log(f)

      fs.lstat(f, (err, file) => {
        console.log(file)
        if (err) return cb(err);

        if (file.isDirectory()) {
          functions.removeFolder(f, cb);
        } else
          fs.unlink(f, cb);
      });

    }, (err) => {
      if (err) return next(err);

      console.log(location);

      // fs.readdir(location, (err, files) => {
      //   if (files.length > 0)
      //     functions.removeFolder(location, next);
      //   else
      //     fs.rmdir(location, () => {
      //       next(null);
      //     })
      // })

      fs.rmdir(location, () => {
        return next(null);
      })

    })

  } catch(e) {
    return next(e);
  }
}


module.exports = functions;
