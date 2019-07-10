const fs = require('fs'),
      path = require('path'),
      Busboy = require('busboy'),
      sharp = require('sharp'),
      crypto = require('crypto'),
      async = require('async');

const api = {};

api.createAlbum = (User, UserAlbums, UserPhotos, Token) => (req, res) => {
  if (Token) {

    const userId = req.query.user_id;
    let title, length, imgArray = [], key = 1, errorMess = '';

    const albumsDir = 'public/albums';

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

        let cover = (fieldname.indexOf('_cover') > -1) ? 1 : 0;

        let newFileName = crypto.randomBytes(12).toString('hex'); // создаём случайное имя файла без расширения
        let MiMe = mimetype.split("/").pop(); // берём расширение
        let fileName = newFileName+'.'+MiMe; // новое имя файла с расширением
        imgArray.push({
          user_id: userId,
          src: fullLink,
          image: fileName,
          cover: cover,
        })

        let saveTo = path.join(fullLink, fileName);
        file.pipe(fs.createWriteStream(saveTo));

        file.on('end', function() {

          sharp(saveTo)
            .resize(65, 65)
            .toFile(fullLink+'/mini_'+fileName, (err, info) => {
              if (err)
                errorMess = 'Некоторые фотографии имеют не поддерживаемый формат';
                // return res.status(400).send({ success: false, message: 'sharp_mini: '+err })
            });
          sharp(saveTo)
            .resize(270, 200)
            .toFile(fullLink+'/cover_'+fileName, (err, info) => {
              if (err)
                errorMess = 'Некоторые фотографии имеют не поддерживаемый формат';
                // return res.status(400).send({ success: false, message: 'sharp_cover: '+err })
            });

          if (length == key) {

            UserAlbums.create({
              user_id: userId,
              title: title,
            })
            .then((album) => {
              const albumId = album.dataValues.id;

              imgArray.map(item => {
                item.album_id = albumId;
              })

              UserPhotos.bulkCreate(imgArray)
                .then(() => {

                  let result = {
                    success: true,
                    message: 'Альбом успешно добавлен'
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

        })

      })

      busboy.on('field', function(fieldname, value){
        if (fieldname == 'title') {
          title = value;
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

api.getAlbums = (UserAlbums, UserPhotos) => (req, res) => {

  const userId = req.query.user_id;

  UserAlbums.hasOne(UserPhotos, {sourceKey: 'id', foreignKey: 'album_id'});

  UserAlbums.findAll({
    attributes: ['id', 'title'],
    where: {
      user_id: userId,
    },
    order: [['date_created', 'DESC']],
    include: [
      {
        model: UserPhotos,
        attributes: ['album_id', 'src', 'image'],
        where: {
          cover: 1,
        },
      }
    ]
  })
  .then((result) => {

    res.json({ success: true, result });

  })

}

api.getAlbum = (UserAlbums, UserPhotos) => (req, res) => {

  const userId = req.query.user_id,
        albumId = req.query.album_id;

  UserPhotos.hasOne(UserAlbums, {sourceKey: 'album_id', foreignKey: 'id'});

  UserPhotos.findAll({
    attributes: ['id', 'src', 'image'],
    where: {
      user_id: userId,
      album_id: albumId,
    },
    order: [['date_created', 'DESC']],
    include: [
      {
        model: UserAlbums,
        attributes: ['title'],
      }
    ]
  })
  .then((result) => {

    res.json({ success: true, result });

  })

}

api.getPhotosMini = (UserPhotos) => (req, res) => {

  const userId = req.query.user_id;

  UserPhotos.findAll({
    attributes: ['id', 'src', 'image'],
    where: {
      user_id: userId
    }
  })
  .then(result => {
    res.json({ success: true, result })
  })

}

api.getPhoto = (UserPhotos, PhotoComments, User, UserInfo) => (req, res) => {

  const userId = req.query.user_id,
        photoId = req.query.photo_id;

  PhotoComments.hasOne(User, {sourceKey: 'user_id', foreignKey: 'id'});
  User.hasOne(UserInfo, {sourceKey: 'id', foreignKey: 'user_id'});

  async.parallel([
    (callback) => {
      UserPhotos.findOne({
        attributes: ['id', 'src', 'image', 'date_created', 'about'],
        where: {
          id: photoId,
          user_id: userId,
        },
      })
      .then((photo) => {
        callback(null, photo);
      })
    },
    (callback) => {

      PhotoComments.findAll({
        attributes: ['id', 'comment', 'date_created'],
        order: [['date_created', 'ASC']],
        include: [
          {
            model: User,
            attributes: ['id', 'firstname', 'lastname', 'gender'],
            include: [
              {
                model: UserInfo,
                attributes: ['src', 'image'],
              }
            ]
          }
        ]
      })
      .then((comments) => {
        callback(null, comments);
      })

    }
  ], (err, result) =>{
    if (err) return res.status(400).send({ success: false, message: err })

    res.json({
      success: true,
      result: {
        single: result[0],
        comments: result[1],
      }
    })
  })

}

api.updatePhoto = (User, UserPhotos, Token) => (req, res) => {
  if (Token) {

    const userId = req.body.user_id,
          photoId = req.body.photo_id,
          data = req.body.data;

    User.findOne({
      attributes: ['id'],
      where: {
        id: userId
      }
    })
    .then(user => {
      if (!user) return res.status(401).send({ success: false, message: 'Пользователь не найден!' });

      UserPhotos.update(data, {
        where: {
          id: photoId,
          user_id: userId,
        }
      })
      .then((result) => {

        res.json({ success: true, message: 'Успешно обновлено!', })

      })

    })

  } else return res.status(403).send({ success: false, message: 'Вы не авторизованы!' });
}

api.addPhotoComment = (User, PhotoComments, Token) => (req, res) => {
  if (Token) {

    const userId = req.body.user_id,
          photoId = req.body.photo_id,
          mess = req.body.message;
    let data = req.body.data;

    User.findOne({
      attributes: ['id'],
      where: {
        id: userId
      }
    })
    .then(user => {
      if (!user) return res.status(401).send({ success: false, message: 'Пользователь не найден!' });

      PhotoComments.create({
        user_id: userId,
        photo_id: photoId,
        comment: mess
      })
      .then((comment) => {

        data.id = comment.dataValues.id;
        req.io.emit('addPhotoComment', data);
        res.json({ success: true, message: 'Комментарий добавлен успешно', })

      })

    })

  } else return res.status(403).send({ success: false, message: 'Вы не авторизованы!' });
}

module.exports = api;
