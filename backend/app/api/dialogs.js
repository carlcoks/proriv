const { Op } = require('sequelize'),
      async = require('async');

const api = {};

api.getDialogs = (User, UserInfo, UserDialogs, UserMessages, UserToDialog, Token) => (req, res) => {
  if (Token) {

    const userId = req.query.user_id;

    User.findOne({
      attributes: ['id'],
      where: {
        id: userId
      }
    })
    .then(user => {
      if (!user) return res.status(401).send({ success: false, message: 'Пользователь не найден!' });

      UserToDialog.hasOne(UserDialogs, {sourceKey: 'dialog_id', foreignKey: 'id'});
      UserDialogs.hasMany(UserMessages, {sourceKey: 'id', foreignKey: 'dialog_id'});
      UserToDialog.hasOne(User, {sourceKey: 'user_id', foreignKey: 'id'});
      User.hasOne(UserInfo, {sourceKey: 'id', foreignKey: 'user_id'});

      UserToDialog.findAll({
        attributes: ['id'],
        where: {
          [Op.not]: [
            { user_id: userId }
          ]
        },
        include: [
          {
            model: UserDialogs,
            attributes: ['id', 'date_updated'],
            order: [['date_updated', 'DESC']],
            include: [
              {
                model: UserMessages,
                attributes: ['id', 'user_id', 'message', 'date_created'],
                order: [['date_created', 'DESC']],
                limit: 1,
              }
            ]
          },
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
      .then(result => {

        res.json({ success: true, result })

      })

    })

  } else return res.status(403).send({ success: false, message: 'Вы не авторизованы!' });
}

api.getMessages = (User, UserInfo, UserMessages, Token) => (req, res) => {
  if (Token) {

    const userId = req.query.user_id,
          dialogId = req.query.dialog_id,
          sel = req.query.sel;

    if (!userId || !dialogId) return res.status(400).send({ success: false, message: 'Ошибка!' });

    User.findOne({
      attributes: ['id'],
      where: {
        id: userId
      }
    })
    .then(user => {
      if (!user) return res.status(401).send({ success: false, message: 'Пользователь не найден!' });

      UserMessages.hasOne(User, {sourceKey: 'user_id', foreignKey: 'id'});
      User.hasOne(UserInfo, {sourceKey: 'id', foreignKey: 'user_id'});

      async.parallel([
        (callback) => {

          User.findOne({
            where: {
              id: sel,
            },
            attributes: ['id', 'firstname', 'lastname', 'gender'],
            include: [
              {
                model: UserInfo,
                attributes: ['src', 'image'],
              }
            ]
          })
          .then((profile) => {
            callback(null, profile);
          })

        },
        (callback) => {
          UserMessages.findAll({
            where: {
              dialog_id: dialogId,
            },
            order: [['date_created', 'DESC']],
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
          .then(result => {
            callback(null, result);
          })
        }
      ], (err, result) => {
        if (err) return res.status(400).send({ success: false, message: err })

        let array = {
          user: null,
          messages: null,
        };
        array.user = result[0];
        array.messages = result[1];

        res.json({ success: true, result: array })
      })

    })

  } else return res.status(403).send({ success: false, message: 'Вы не авторизованы!' });
}

module.exports = api;
