const mailer = require('../../middleware/mailer'),
      generatePassword = require('password-generator'),
      async = require('async'),
      fs = require('fs'),
      path = require('path'),
      Busboy = require('busboy'),
      sharp = require('sharp'),
      crypto = require('crypto');

const api = {};

//Регистрация
api.signup = (User) => (req, res) => {
  const email = req.body.email,
        telefon = req.body.telefon,
        password = req.body.password,
        firstname = req.body.firstname,
        lastname = req.body.lastname,
        who = req.body.who,
        gender = req.body.gender,
        urlAddress = req.body.url;

  if (!email || !telefon || !password || !firstname || !lastname || !who || !gender || !urlAddress)
    res.status(400).send({ success: false, message: 'Заполните все поля!' });
  else {

    let hash = User.generateHash(password);

    User.findOrCreate({
      where: {
        email: email,
      },
      defaults: {
        firstname: firstname,
        lastname: lastname,
        user_status_id: who,
        gender: gender,
        telefon: telefon,
        password: hash
      }
    })
    .then(([user, created]) => {
      if (!created) return res.status(400).json({ success: false, message:  'Пользователь с таким email уже существует!' });

      const newHash = generatePassword(12, false);

      async.parallel([
        (callback) => {
          User.update({
            accept_email_hash: newHash
          }, {
            where: {
              id: user.dataValues.id,
              email: email,
            }
          })
          .then(() => {
            callback(null);
          })
        },
        (callback) => {
          (async () => {
            const link = `${urlAddress}/?accept-email=${newHash}`;
            let text = `Подтвердите ваш email адрес перейдя по ссылке: ${link}`;

            const response = await mailer.sendMail('Подтверждение email адреса', text, email);
            callback(null);
          })()
        }
      ], (err, result) => {
        if (err) return res.status(400).send({ success: false, message: 'Произошла ошибка' })

        res.json({ success: true, message: 'Аккаунт успешно создан', });
      })

    })
  }
}

//Восстановление пароля
api.resetPassword = (User) => (req, res) => {

  const email = req.body.email;
  if (!email)
    res.status(400).json({ success: false, message: 'Введите email!' });
  else {
    User.findOne({
      where: {
        email: email
      }
    })
    .then(user => {
      if (!user) return res.status(400).json({ success: false, message:  'Пользователь с таким email не найден!' });

      const newPass = generatePassword(12, false);
      const password = User.generateHash(newPass);

      User.update({
        password: password
      }, {
        where: {
          email: email
        }
      })
      .then(user => {
        const text = `Ваш новый пароль: ${newPass}`;

        (async () => {
          const response = await mailer.sendMail('Восстановление пароля', text, email);
          res.json({ success: true, message: 'Новый пароль отправлен на вашу почту!' })
        })()

      })

    })
  }

}

//Подтверждение e-mail
api.acceptEmail = (User) => (req, res) => {

  const hash = req.body.accept;

  if (!hash || !id) return res.status(400).send({ success: false, message: '', })

  User.findOne({
    where: {
      accept_email_hash: hash
    }
  })
  .then((user) => {
    if (!user) return res.status(400).send({ success: false, message: 'Пользователь не найден!' })

    User.update({
      accept_email: 1,
      accept_email_hash: '',
    }, {
      where: {
        id: user.dataValues.id,
        accept_email_hash: hash
      }
    })
    .then(() => {
      res.json({ success: true, message: 'E-mail адрес подтвержден' })
    })

  })

}

//Взять все виды спорта
api.getSport = (SportType) => (req, res) => {

  SportType.findAll({})
  .then((types) => {

    res.json({ success: true, result: types });

  })

}

//Получение пользователя по id
api.getUser = (User, UserStatus, UserInfo) => (req, res) => {

  const userId = req.query.user_id;

  User.hasOne(UserStatus, {sourceKey: 'user_status_id', foreignKey: 'id'})
  User.hasOne(UserInfo, {sourceKey: 'id', foreignKey: 'user_id'});

  User.findOne({
    attributes: ['id', 'email', 'firstname', 'lastname', 'gender', 'telefon'],
    where: {
      id: userId,
    },
    include: [{
      model: UserStatus,
    }, {
      model: UserInfo,
    }]
  })
  .then(user => {
    if (!user) return res.status(400).send({ success: false, message: 'Пользователь не найден' })

    res.json({ success: true, result: user })
  })

}

// Обновление видов спорта пользователя
api.updateUserInfo = (User, UserInfo, Token) => (req, res) => {
  if (Token) {

    const userId = req.body.user_id,
          data = req.body.data;

    console.log(data)

    User.findOne({
      attributes: ['id'],
      where: {
        id: userId
      }
    })
    .then(user => {
      if (!user) return res.status(401).send({ success: false, message: 'Пользователь не найден!' });

      UserInfo.findOne({
        attributes: ['id'],
        where: {
          user_id: userId,
        }
      })
      .then((obj) => {
        if (obj) {
          obj.update(data);
        }
        else {
          UserInfo.create({
            user_id: userId,
            ...data
          })
        }

        res.json({ success: true, message: 'Информация успешно обновлена!', })
      })
    })

  } else return res.status(403).send({ success: false, message: 'Вы не авторизованы!' });
}

// Обновление контактной информации пользователя
api.updateUserContacts = (User, Token) => (req, res) => {
  if (Token) {

    const userId = req.body.user_id,
          data = req.body.data;

    User.findOne({
      attributes: ['id'],
      where: {
        id: userId
      }
    })
    .then(user => {
      if (!user) return res.status(401).send({ success: false, message: 'Пользователь не найден!' });

      User.findOne({
        attributes: ['id'],
        where: data,
      })
      .then(user => {

        if (user && user.dataValues.id != userId)
          return res.status(401).send({ success: false, message: 'Пользователь с таким e-mail или телефоном уже зарегистрирован!' });

        User.update(data, {
          where: {
            id: userId,
          }
        })
        .then(() => {

          res.json({
            success: true,
            message: 'Информация успешно обновлена!',
          })

        })
      })

    })

  } else return res.status(403).send({ success: false, message: 'Вы не авторизованы!' });

}

api.updateUserAvatar = (User, UserInfo, Token) => (req, res) => {
  if (Token) {

    const userId = req.query.user_id;
    const usersDir = 'public/users';
    let errorMess = '';

    const timeStamp = Date.now();
    const randomStr = crypto.randomBytes(4).toString('hex');
    let fullLink = usersDir+'/'+timeStamp+''+userId+''+randomStr;

    User.hasOne(UserInfo, {sourceKey: 'id', foreignKey: 'user_id'});

    User.findOne({
      attributes: ['id'],
      where: {
        id: userId
      },
      include: [
        {
          model: UserInfo,
          attributes: ['src', 'image'],
        }
      ]
    })
    .then(user => {
      if (!user) return res.status(401).send({ success: false, message: 'Пользователь не найден!' });

      if (user.dataValues.user_info) {
        if (user.dataValues.user_info.src) {
          fullLink = user.dataValues.user_info.src;
          fs.readdir(fullLink, (err, files) => {
            for (let key in files) {
              fs.unlink(`${fullLink}/${files[key]}`, (err) => {});
            }
          })
        }
      }

      if (!fs.existsSync(usersDir)) fs.mkdirSync(usersDir);
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
                .resize(40, 40)
                .toFile(fullLink+'/mini_'+fileName, (err, info) => {
                  if (err)
                    errorMess = 'Фотография имеет не поддерживаемый формат';
                  callback(null);
                });
            },
            (callback) => {
              sharp(saveTo)
                .resize(170, 170)
                .toFile(fullLink+'/cover_'+fileName, (err, info) => {
                  if (err)
                    errorMess = 'Фотография имеет не поддерживаемый формат';
                  fs.unlink(fullLink+'/'+fileName, (err) => {
                    callback(null);
                  })
                });
            }
          ], (err, result) => {
            if (err) errorMess = 'Фотография имеет не поддерживаемый формат';

            const data = {
              src: fullLink,
              image: fileName,
            }

            UserInfo.findOne({
              attributes: ['id'],
              where: {
                user_id: userId,
              }
            })
            .then((obj) => {
              if (obj) {
                obj.update(data);
              }
              else {
                UserInfo.create({
                  user_id: userId,
                  ...data
                })
              }

              let result = {
                success: true,
                message: 'Фотография успешно обновлена'
              }
              if (errorMess != '') {
                result.success = false;
                result.message = errorMess;
              }

              res.json({ success: result.success, message: result.message, data })
            })

          })

        })

      })

      busboy.on('field', function(fieldname, value){});

      busboy.on('finish', function() {})

      return req.pipe(busboy);

    })

  } else return res.status(403).send({ success: false, message: 'Вы не авторизованы!' });
}

module.exports = api;
