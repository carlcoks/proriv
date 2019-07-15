const fs = require('fs'),
      path = require('path'),
      Busboy = require('busboy'),
      sharp = require('sharp'),
      crypto = require('crypto'),
      async = require('async'),
      rimraf = require("rimraf");

const api = {};

api.addToLenta = (User, UserLenta, LentaFiles, Token) => (req, res) => {
  if (Token) {

    const userId = req.query.user_id;
    let text, length, imgArray = [], key = 1, errorMess = '';

    const lentaDir = 'public/lenta';

    User.findOne({
      attributes: ['id'],
      where: {
        id: userId
      }
    })
    .then(user => {
      if (!user) return res.status(401).send({ success: false, message: 'Пользователь не найден!' });

      const timeStamp = Date.now();
      if (!fs.existsSync(lentaDir)) fs.mkdirSync(lentaDir);
      const randomStr = crypto.randomBytes(4).toString('hex');
      const fullLink = lentaDir+'/'+timeStamp+''+userId+''+randomStr;
      if (!fs.existsSync(fullLink)) fs.mkdirSync(fullLink);

      const busboy = new Busboy({ headers: req.headers });
      busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

        let type = fieldname.split('_').pop();

        const randomStr = crypto.randomBytes(12).toString('hex');
        let linkDir = fullLink+'/'+randomStr;
        if (!fs.existsSync(linkDir)) fs.mkdirSync(linkDir);

        let newFileName = crypto.randomBytes(12).toString('hex'); // создаём случайное имя файла без расширения
        let MiMe = mimetype.split("/").pop(); // берём расширение
        let fileName = newFileName+'.'+MiMe; // новое имя файла с расширением
        imgArray.push({
          // user_id: userId,
          type: type,
          src: randomStr,
          image: fileName,
        })

        let saveTo = path.join(linkDir, fileName);
        file.pipe(fs.createWriteStream(saveTo));

        file.on('end', function() {

          async.parallel([
            (callback) => {
              if (type == 'image') {
                sharp(saveTo)
                  .resize(720, 450)
                  .toFile(linkDir+'/big_'+fileName, (err, info) => {
                    if (err)
                      return callback('Некоторые фотографии имеют не поддерживаемый формат');
                    callback(null);
                  });
              }
            },
            (callback) => {
              if (type == 'image') {
                sharp(saveTo)
                  .resize(350, 270)
                  .toFile(linkDir+'/same_'+fileName, (err, info) => {
                    if (err)
                      return callback('Некоторые фотографии имеют не поддерживаемый формат');
                    callback(null);
                  });
              }
            },
            (callback) => {
              if (type == 'image') {
                sharp(saveTo)
                  .resize(230, 170)
                  .toFile(linkDir+'/small_'+fileName, (err, info) => {
                    if (err)
                      return callback('Некоторые фотографии имеют не поддерживаемый формат');
                    callback(null);
                  });
              }
            },
            (callback) => {
              if (type == 'image') {
                sharp(saveTo)
                  .resize(170, 125)
                  .toFile(linkDir+'/mini_'+fileName, (err, info) => {
                    if (err)
                      return callback('Некоторые фотографии имеют не поддерживаемый формат');
                    callback(null);
                  });
              }
            }
          ], (err, returnres) => {
            if (err) return res.status(400).send({ success: false, message: err });

            if (length == key) {

              UserLenta.create({
                user_id: userId,
                text: text,
                src: fullLink,
              })
              .then((lenta) => {
                const lentaId = lenta.dataValues.id;

                imgArray.map(item => {
                  item.lenta_id = lentaId;
                })

                LentaFiles.bulkCreate(imgArray)
                  .then((arr) => {
                    let result = {
                      success: true,
                      message: 'Успешно добавлен',
                      result: {
                       id: lentaId,
                       text: text,
                       src: fullLink,
                       date_created: new Date(),
                       lenta_files: arr,
                     }
                    }

                    if (errorMess != '') {
                      result.success = false;
                      result.message = errorMess;
                    }

                    res.json(result)

                  })
              })

            }
            key++;

          }) // END ASYNC PARALLEL

        })

      })

      busboy.on('field', function(fieldname, value){
        if (fieldname == 'text') {
          text = value;
        } else if (fieldname == 'length') {
          length = value;
        }
      });

      busboy.on('finish', function() {
      })

      return req.pipe(busboy);

    })

  } else return res.status(403).send({ success: false, message: 'Вы не авторизованы!' });
}

api.getLenta = (UserLenta, LentaFiles) => (req, res) => {

  const userId = req.query.user_id;

  UserLenta.hasMany(LentaFiles, { sourceKey: 'id', foreignKey: 'lenta_id' });

  UserLenta.findAll({
    attributes: ['id', 'text', 'src', 'date_created'],
    order: [['date_created', 'DESC']],
    include: [
      {
        model: LentaFiles,
        attributes: ['id', 'type', 'src', 'image'],
      }
    ]
  })
  .then((result) => {

    res.json({ success: true, result });

  })

}

api.deleteInLenta = (User, UserLenta, LentaFiles, Token) => (req, res) => {
  if (Token) {

    const userId = req.query.user_id,
          id = req.query.id;

    const lentaDir = 'public/lenta';

    User.findOne({
      attributes: ['id'],
      where: {
        id: userId
      }
    })
    .then(user => {
      if (!user) return res.status(401).send({ success: false, message: 'Пользователь не найден!' });

      UserLenta.findOne({
        attributes: ['src'],
        where: {
          id: id,
          user_id: userId,
        }
      }).then((lenta) => {

        const src = lenta.dataValues.src;

        async.parallel([
          (callback) => {

            rimraf(src, callback);

          },
          (callback) => {

            UserLenta.destroy({
              where: {
                id: id,
                user_id: userId,
              }
            })
            .then((result) => {
              callback(null);
            })

          },
          (callback) => {

            LentaFiles.destroy({
              where: {
                lenta_id: id,
              }
            })
            .then(() => {
              callback(null);
            })

          }
        ], (err, result) => {
          if (err) return res.status(400).send({ success: false, message: err });

          res.json({
            success: true,
            message: 'Успешно удалено',
          })

        })

      })

    })

  } else return res.status(403).send({ success: false, message: 'Вы не авторизованы!' });
}

module.exports = api;
