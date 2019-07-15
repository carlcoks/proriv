const fs = require('fs'),
      path = require('path'),
      Busboy = require('busboy'),
      sharp = require('sharp'),
      crypto = require('crypto'),
      async = require('async'),
      rimraf = require("rimraf");

const api = {};

api.addGoal = (User, UserGoals, Token) => (req, res) => {
  if (Token) {

    const userId = req.query.user_id;
    let title, about, category;

    const goalsDir = 'public/goals';

    User.findOne({
      attributes: ['id'],
      where: {
        id: userId
      }
    })
    .then(user => {
      if (!user) return res.status(401).send({ success: false, message: 'Пользователь не найден!' });

      const timeStamp = Date.now();
      if (!fs.existsSync(goalsDir)) fs.mkdirSync(goalsDir);
      const randomStr = crypto.randomBytes(4).toString('hex');
      const fullLink = goalsDir+'/'+timeStamp+''+userId+''+randomStr;
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
                .resize(385, 285)
                .toFile(fullLink+'/cover_'+fileName, (err, info) => {
                  if (err)
                    return callback('Некоторые фотографии имеют не поддерживаемый формат');
                  callback(null);
                });
            }
          ], (err, result) => {
            if (err) return res.status(400).send({ success: false, message: err }) ;

            UserGoals.create({
              user_id: userId,
              title: title,
              about: about,
              category: category,
              src: fullLink,
              image: fileName,
            })
            .then(goal => {

              const goalId = goal.dataValues.id;

              res.json({
                success: true,
                message: 'Успешно добавлено',
                result: {
                  id: goalId,
                  title: title,
                }
              })

            })

          })

        })

      })

      busboy.on('field', function(fieldname, value){
        if (fieldname == 'title') {
          title = value;
        } else if (fieldname == 'about') {
          about = value;
        } else if (fieldname == 'category') {
          category = value;
        }
      });

      busboy.on('finish', function() {
      })

      return req.pipe(busboy);

    })

  } else return res.status(403).send({ success: false, message: 'Вы не авторизованы!' });

}

api.getMainGoals = (UserGoals) => (req, res) => {

  const userId = req.query.user_id;

  UserGoals.findAll({
    attributes: ['id', 'title'],
    where: {
      user_id: userId,
    },
    order: [['date_created', 'DESC']],
    limit: 5,
  })
  .then(goals => {

    res.json({ success: true, result: goals });

  })

}

api.getGoals = (UserGoals) => (req, res) => {

  const userId = req.query.user_id;

  UserGoals.findAll({
    attributes: ['id', 'title'],
    where: {
      user_id: userId,
    },
    order: [['date_created', 'DESC']],
  })
  .then(goals => {

    res.json({ success: true, result: goals });

  })

}

api.getSingleGoal = (UserGoals, SportType) => (req, res) => {

  const userId = req.query.user_id,
        id = req.query.id;

  UserGoals.hasOne(SportType, { sourceKey: 'category', foreignKey: 'id', });

  UserGoals.findOne({
    attributes: ['id', 'title', 'about', 'src', 'image'],
    where: {
      id: id,
      user_id: userId,
    },
    include: [
      {
        model: SportType,
      }
    ]
  })
  .then((goal) => {

    res.json({
      success: true,
      result: goal,
    })

  })

}

api.deleteSingleGoal = (User, UserGoals, Token) => (req, res) => {
  if (Token) {

    const userId = req.query.user_id,
          id = req.query.id;

    User.findOne({
      attributes: ['id'],
      where: {
        id: userId
      }
    })
    .then(user => {
      if (!user) return res.status(401).send({ success: false, message: 'Пользователь не найден!' });

      UserGoals.findOne({
        attributes: ['src'],
        where: {
          id: id,
          user_id: userId,
        }
      })
      .then(goal => {
        const src = goal.dataValues.src;

        async.parallel([
          (callback) => {
            rimraf(src, callback);
          },
          (callback) => {
            UserGoals.destroy({
              where: {
                id: id,
                user_id: userId,
              }
            })
            .then(() => {
              callback(null);
            })
          }
        ], (err, result) => {
          if (err) return res.status(400).send({ success: false, message: err });

          res.json({ success: true, message: 'Цель успешно удалена!' })
        })

      })

    })

  } else return res.status(403).send({ success: false, message: 'Вы не авторизованы!' });
}

module.exports = api;
