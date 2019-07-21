const jwt = require('jsonwebtoken'),
      config = require('../../config');

const api = {};

//Вход
api.login = (Users) => (req, res) => {
  const telefon = req.body.telefon,
        password = req.body.password;

  Users.findOne({
    attributes: ['id', 'name', 'password'],
    where: {
      telefon: telefon,
    },
  }).then((user) => {
    if (!user) res.status(401).send({ success: false, message: 'Пользователь с таким телефоном не найден!' });
    else {

      const userId = user.dataValues.id,
            userPass = user.dataValues.password;

      Users.validatePassword(password, userPass, (error, matches) => {
        if (matches && !error) {

          const token = jwt.sign({ user }, config.secret);

          res.json({ success: true, message: 'Токен получен.',
            token,
            user_id: userId,
            profile: {
              name: user.dataValues.name,
            }
          });

        } else {
          res.status(401).send({ success: false, message: 'Не правильный пароль!' });
        }
      });

    }
  })
}

//Регистрация
api.signup = (Users) => (req, res) => {
  const telefon = req.body.telefon,
        password = req.body.password,
        name = req.body.name;

  if (!telefon || !password || !name)
    res.status(400).send({ success: false, message: 'Заполните все поля!' });
  else {

    let hash = Users.generateHash(password);

    Users.findOrCreate({
      where: {
        telefon: telefon,
      },
      defaults: {
        name: name,
        telefon: telefon,
        password: hash
      }
    })
    .then(([user, created]) => {
      if (!created) return res.status(400).json({ success: false, message:  'Пользователь с таким email уже существует!' });

      res.json({ success: true, message: 'Аккаунт успешно создан' });

    })
  }
}

//Получение пользователя по id
api.getUser = (Users) => (req, res) => {

  const userId = req.query.user_id;

  Users.findOne({
    attributes: ['name'],
    where: {
      id: userId,
    },
  })
  .then(user => {
    if (!user) return res.status(400).send({ success: false, message: 'Пользователь не найден' })

    res.json({ success: true, result: user })
  })

}

module.exports = api;
