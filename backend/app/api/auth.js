const jwt = require('jsonwebtoken'),
      config = require('../../config');

const api = {};

api.getUser = (User, Token) => (req, res) => {
  if (Token) {

    const userId = req.body.userId;

    User.findOne({
      attributes: ['firstname', 'lastname', 'image'],
      where: {
        id: userId
      }
    })
    .then(user => {
      if (!user) return res.status(401).send({ success: false, message: 'Пользователь не найден!' });
      else {
        res.json({
          success: true,
          profile: {
            firstname: user.dataValues.firstname,
            lastname: user.dataValues.lastname,
            image: user.dataValues.image,
          }
        });
      }
    })

  } else return res.status(403).send({ success: false, message: 'Вы не авторизованы!' });
}

api.login = (User, UserInfo) => (req, res) => {
  const email = req.body.email,
        password = req.body.password;

  User.hasOne(UserInfo, {sourceKey: 'id', foreignKey: 'user_id'});

  User.findOne({
    attributes: ['id', 'password', 'firstname', 'lastname', 'gender', 'accept_email'],
    where: {
      email: email
    },
    include: [{
      model: UserInfo,
      attributes: ['src', 'image', 'bg_image'],
    }]
  }).then((user) => {
    if (!user) res.status(401).send({ success: false, message: 'Пользователь с таким email не найден!' });
    else {

      const userId = user.dataValues.id,
            userPass = user.dataValues.password;

      User.validatePassword(password, userPass, (error, matches) => {
        if (matches && !error) {

          if (!user.dataValues.accept_email)
            return res.status(401).send({ success: false, message: 'Ваш email адрес не подтвержден!' });

          const token = jwt.sign({ user }, config.secret);

          res.json({ success: true, message: 'Токен получен.',
            token,
            user_id: userId,
            profile: {
              firstname: user.dataValues.firstname,
              lastname: user.dataValues.lastname,
              gender: user.dataValues.gender,
              user_info: user.dataValues.user_info,
            }
          });

        } else {
          res.status(401).send({ success: false, message: 'Не правильный пароль!' });
        }
      });

    }
  })
}

api.verify = (headers) => {
  if (headers && headers.authorization) {
    const split = headers.authorization.split(' ');
  if (split.length === 2) return split[1];
    else return null;
  } else return null;
}

module.exports = api;
