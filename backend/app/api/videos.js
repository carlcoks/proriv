const fs = require('fs'),
      path = require('path'),
      Busboy = require('busboy'),
      sharp = require('sharp'),
      crypto = require('crypto'),
      async = require('async');

const api = {};

api.addNewVideo = (User, UserVideos, Token) => (req, res) => {
  if (Token) {

    const userId = req.query.user_id;
    let title, link = '';

    const videoDir = 'public/videos';

    User.findOne({
      attributes: ['id'],
      where: {
        id: userId
      }
    })
    .then(user => {
      if (!user) return res.status(401).send({ success: false, message: 'Пользователь не найден!' });

      const timeStamp = Date.now();
      if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir);
      const randomStr = crypto.randomBytes(4).toString('hex');
      const fullLink = videoDir+'/'+timeStamp+''+userId+''+randomStr; // Конечная папка видеокурса пользователя
      if (!fs.existsSync(fullLink)) fs.mkdirSync(fullLink);

      const busboy = new Busboy({ headers: req.headers });
      busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

        let newFileName = crypto.randomBytes(12).toString('hex'); // создаём случайное имя файла без расширения
        let MiMe = mimetype.split("/").pop(); // берём расширение
        let fileName = newFileName+'.'+MiMe;

        let saveTo = path.join(fullLink, fileName);
        file.pipe(fs.createWriteStream(saveTo));

        file.on('end', function() {

          UserVideos.create({
            user_id: userId,
            title: title,
            src: fullLink,
            video: fileName,
          })
          .then((video) => {
            const videoId = video.dataValues.id;

            res.json({
              success: true,
              message: 'Видео успешно добавлено',
              result: {
                id: videoId,
                title: title,
                src: fullLink,
                video: fileName,
              }
            })

          })

        })

      })

      busboy.on('field', function(fieldname, value){
        if (fieldname == 'title') {
          title = value;
        } else if (fieldname == 'link') {
          link = value;
        }
      });

      busboy.on('finish', function() {

        if (link != '') {
          UserVideos.create({
            user_id: userId,
            title: title,
            link: link,
          })
          .then((video) => {
            const videoId = video.dataValues.id;

            res.json({
              success: true,
              message: 'Видео успешно добавлено',
              result: {
                id: videoId,
                title: title,
                link: link,
              }
            })

          })
        }

      })

      return req.pipe(busboy);

    })

  } else return res.status(403).send({ success: false, message: 'Вы не авторизованы!' });
}

// Взять все видео пользователя
api.getVideos = (UserVideos) => (req, res) => {

  const userId = req.query.user_id;

  UserVideos.findAll({
    attributes: ['id', 'title', 'src', 'video', 'link'],
    where: {
      user_id: userId,
    },
    order: [['date_created', 'DESC']],
  })
  .then((videos) => {
    res.json({ success: true, result: videos });
  })

}

//Взять 1 видео пользоветля по id
api.getVideo = (UserVideos) => (req, res) => {

  const userId = req.query.user_id,
        id = req.query.id;

  UserVideos.findOne({
    attributes: ['id', 'title', 'src', 'video', 'link', 'about', 'date_created'],
    where: {
      id: id,
      user_id: userId,
    },
  })
  .then((video) => {
    res.json({ success: true, result: video });
  })

}

//Обновить видео
api.updateVideo = (User, UserVideos, Token) => (req, res) => {
  if (Token) {

    const userId = req.body.user_id,
          id = req.body.id,
          data = req.body.data;

    User.findOne({
      attributes: ['id'],
      where: {
        id: userId
      }
    })
    .then(user => {
      if (!user) return res.status(401).send({ success: false, message: 'Пользователь не найден!' });

      UserVideos.update(data, {
        where: {
          id: id,
          user_id: userId,
        }
      })
      .then(() => {
        res.json({ success: true, message: 'Успешно обновлено', })
      })

    })

  } else return res.status(403).send({ success: false, message: 'Вы не авторизованы!' });
}

// Взять видео для главной
api.getVideosMain = (UserVideos) => (req, res) => {

  const userId = req.query.user_id;

  UserVideos.findAll({
    attributes: ['id', 'title', 'src', 'video', 'link'],
    where: {
      user_id: userId,
    },
    order: [['date_created', 'DESC']],
  })
  .then((videos) => {
    res.json({ success: true, result: videos });
  })

}

module.exports = api;
