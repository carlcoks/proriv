const fs = require('fs'),
      path = require('path'),
      Busboy = require('busboy'),
      sharp = require('sharp'),
      crypto = require('crypto'),
      async = require('async');

const api = {};

api.addVideokurs = (User, UserVideokursi, Token) => (req, res) => {
  if (Token) {

    const userId = req.query.user_id;
    let title, description = '', price;

    let coverName, previewName, length, filesArray = [], imgArray = [], key = 1, errorMess = '';

    const kursDir = 'public/videokursi';

    User.findOne({
      attributes: ['id'],
      where: {
        id: userId
      }
    })
    .then(user => {
      if (!user) return res.status(401).send({ success: false, message: 'Пользователь не найден!' });

      const timeStamp = Date.now();
      if (!fs.existsSync(kursDir)) fs.mkdirSync(kursDir);
      const randomStr = crypto.randomBytes(4).toString('hex');
      const fullLink = kursDir+'/'+timeStamp+''+userId+''+randomStr; // Конечная папка видеокурса пользователя
      if (!fs.existsSync(fullLink)) fs.mkdirSync(fullLink);

      const busboy = new Busboy({ headers: req.headers });
      busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

        let newFileName = crypto.randomBytes(12).toString('hex'); // создаём случайное имя файла без расширения
        let MiMe = mimetype.split("/").pop(); // берём расширение
        let fileName; // новое имя файла с расширением

        if (fieldname.indexOf('file_') > -1) {
          let newMime = '';
          if (MiMe == 'vnd.openxmlformats-officedocument.wordprocessingml.document') {
            newMime = 'docx';
          } else if (MiMe == 'msword') {
            newMime = 'doc';plain
          } else if (MiMe == 'plain') {
            newMime = 'txt';
          } else {
            newMime = MiMe;
          }
          fileName = 'file'+newFileName+'.'+newMime; // новое имя файла с расширением

          filesArray.push({
            name: fileName,
            real_name: filename,
          })
        } else if (fieldname == 'cover') {
          fileName = newFileName+'.'+MiMe;
          coverName = fileName;
        } else if (fieldname == 'preview') {
          fileName = newFileName+'.'+MiMe;
          previewName = fileName;
        }

        let saveTo = path.join(fullLink, fileName);
        file.pipe(fs.createWriteStream(saveTo));

        file.on('end', function() {

          async.parallel([
            (callback) => {
              if (fieldname == 'cover') {
                sharp(saveTo)
                  .resize(240, 190)
                  .toFile(fullLink+'/cover_'+fileName, (err, info) => {
                    if (err)
                      return callback('Некоторые фотографии имеют не поддерживаемый формат');
                    callback(null);
                  });
              } else {
                callback(null);
              }
            }
          ], (err, resultend) => {
            if (err) return res.status(400).send({ success: false, message: err })

            if (length == key) {

              const allFiles = JSON.stringify(filesArray);

              UserVideokursi.create({
                user_id: userId,
                title: title,
                description: description,
                price: price,
                src: fullLink,
                image: coverName,
                preview: previewName,
                files: allFiles,
              })
              .then((kurs) => {
                const kursId = kurs.dataValues.id;

                let result = {
                  success: true,
                  message: 'Видеокурс успешно добавлен',
                  result: {
                   id: kursId,
                   title: title,
                   price: price,
                   src: fullLink,
                   image: coverName,
                 }
                }

                if (errorMess != '') {
                  result.success = false;
                  result.message = errorMess;
                }

                res.json(result)
              })

            }
            key++;

          })

        })

      })

      busboy.on('field', function(fieldname, value){
        if (fieldname == 'title') {
          title = value;
        } else if (fieldname == 'description') {
          description = value;
        } else if (fieldname == 'price') {
          price = value;
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

api.getVideokursi = (UserVideokursi) => (req, res) => {

  const userId = req.query.user_id;

  UserVideokursi.findAll({
    attributes: ['id', 'title', 'price', 'src', 'image'],
    where: {
      user_id: userId,
    },
    order: [['date_created', 'DESC']],
  })
  .then(kursi => {

    res.json({ success: true, result: kursi })

  })

}

api.getSingleKurs = (UserVideokursi) => (req, res) => {

  const userId = req.query.user_id,
        id = req.query.id;

  UserVideokursi.findOne({
    attributes: ['id', 'title', 'description', 'price', 'src', 'image', 'files'],
    where: {
      id: id,
      user_id: userId,
    },
  })
  .then(kurs => {

    res.json({ success: true, result: kurs })

  })

}

module.exports = api;
