const fs = require('fs'),
      path = require('path'),
      Busboy = require('busboy'),
      sharp = require('sharp'),
      crypto = require('crypto'),
      async = require('async');

const api = {};

api.createReward = (User, UserRewards, Token) => (req, res) => {
  if (Token) {

    const userId = req.query.user_id;
    let title, description, errorMess = '';

    const albumsDir = 'public/rewards';

    User.findOne({
      attributes: ['id'],
      where: {
        id: userId
      }
    })
    .then(user => {
      if (!user) return res.status(401).send({ success: false, message: 'Пользователь не найден!' });

      const timeStamp = Date.now();
      if (!fs.existsSync(albumsDir)) fs.mkdirSync(albumsDir);
      const randomStr = crypto.randomBytes(4).toString('hex');
      const fullLink = albumsDir+'/'+timeStamp+''+userId+''+randomStr;
      if (!fs.existsSync(fullLink)) fs.mkdirSync(fullLink);

      const busboy = new Busboy({ headers: req.headers });
      busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

        let newFileName = crypto.randomBytes(12).toString('hex'); // создаём случайное имя файла без расширения
        let MiMe = mimetype.split("/").pop(); // берём расширение
        let fileName = newFileName+'.'+MiMe; // новое имя файла с расширением

        let saveTo = path.join(fullLink, fileName);
        file.pipe(fs.createWriteStream(saveTo));

        file.on('end', function() {

          async.parallel([
            (callback) => {
              sharp(saveTo)
                .resize(270, 200)
                .toFile(fullLink+'/cover_'+fileName, (err, info) => {
                  if (err)
                    return callback('Некоторые фотографии имеют не поддерживаемый формат');
                  callback(null);
                });
            },
            (callback) => {
              sharp(saveTo)
                .resize(270, 150)
                .toFile(fullLink+'/mini_'+fileName, (err, info) => {
                  if (err)
                    return callback('Некоторые фотографии имеют не поддерживаемый формат');
                  callback(null);
                });
            }
          ], (err, resultend) => {
            if (err) return res.status(400).send({ success: false, message: err })

            UserRewards.create({
              user_id: userId,
              src: fullLink,
              image: fileName,
              title: title,
              description: description,
            })
            .then(() => {
              let result = {
                success: true,
                message: 'Награда успешно добавлена'
              }
              if (errorMess != '') {
                result.success = false;
                result.message = errorMess;
              }

              res.json(result)

            })

          })

        })

      })

      busboy.on('field', function(fieldname, value){
        if (fieldname == 'title') {
          title = value;
        } else if (fieldname == 'desc') {
          description = value;
        }
      });

      busboy.on('finish', function() {
      })

      return req.pipe(busboy);

    })

  } else return res.status(403).send({ success: false, message: 'Вы не авторизованы!' });
}

api.getRewards = (UserRewards) => (req, res) => {

  const userId = req.query.user_id;

  UserRewards.findAll({
    attributes: ['id', 'src', 'image', 'title', 'description'],
    where: {
      user_id: userId,
    },
    order: [['date_created', 'DESC']],
  })
  .then((result) => {

    res.json({ success: true, result });

  })

}

api.getRewardsMain = (UserRewards) => (req, res) => {

  const userId = req.query.user_id;

  UserRewards.findAll({
    attributes: ['id', 'src', 'image', 'title'],
    where: {
      user_id: userId
    }
  })
  .then(result => {
    res.json({ success: true, result })
  })

}

module.exports = api;
