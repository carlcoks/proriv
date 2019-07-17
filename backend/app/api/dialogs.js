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

      UserToDialog.hasMany(UserToDialog, { sourceKey: 'dialog_id', foreignKey: 'dialog_id' });
      UserToDialog.hasOne(UserDialogs, { sourceKey: 'dialog_id', foreignKey: 'id' });
      UserDialogs.hasMany(UserMessages, { sourceKey: 'id', foreignKey: 'dialog_id' });
      UserToDialog.hasOne(User, { sourceKey: 'user_id', foreignKey: 'id' });
      User.hasOne(UserInfo, {sourceKey: 'id', foreignKey: 'user_id'});

      UserToDialog.findAll({
        attributes: ['id'],
        where: {
          user_id: userId,
        },
        order: [ [ UserToDialog, UserDialogs, 'date_updated', 'DESC' ] ],
        include: [
          {
            attributes: ['id'],
            model: UserToDialog,
            where: {
              [Op.not]: [
                {
                  user_id: userId
                }
              ]
            },
            include: [
              {
                attributes: ['id', 'date_updated'],
                model: UserDialogs,
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
              },
            ]
          }
        ]
      })
      .then(dialogs => {
        let result = [];

        if (dialogs.length > 0) {
          dialogs.map(item => {
            result.push(item.user_to_dialogs[0]);
          })
        }

        res.json({ result: result })

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

api.addMessage = (User, UserInfo, UserDialogs, UserMessages, UserToDialog, Token) => (req, res) => {
  if (Token) {

    const userId = req.query.user_id,
          sel = req.body.sel,
          mess = req.body.mess,
          forWho = req.body.forWho;

    let dialogId = req.body.dialog_id;

    User.hasOne(UserInfo, { sourceKey: 'id', foreignKey: 'user_id' });

    User.findOne({
      attributes: ['id', 'firstname', 'lastname', 'gender'],
      where: {
        id: userId
      },
      include: [
        {
          attributes: ['src', 'image'],
          model: UserInfo,
        }
      ]
    })
    .then(user => {
      if (!user) return res.status(401).send({ success: false, message: 'Пользователь не найден!' });

      async.waterfall([
        (callback) => {
          // Если нет диалога, создаем новый диалог
          if (!dialogId) {
            UserDialogs.create({})
            .then((newDialog) => {
              dialogId = newDialog.dataValues.id;

              const data = [
                {
                  user_id: userId,
                  dialog_id: dialogId
                },
                {
                  user_id: sel,
                  dialog_id: dialogId
                },
              ]
              UserToDialog.bulkCreate(data)
              .then((todialog) => {
                const toDialogId = todialog[1].dataValues.id
                callback(null, toDialogId);
              })
            })

          } else { // Если есть обновляем старый
            UserDialogs.update({
              date_updated: new Date(),
            }, {
              where: {
                id: dialogId,
              }
            })
            .then(() => {
              UserToDialog.findOne({
                attributes: ['id'],
                where: {
                  [Op.not]: [
                    {
                      user_id: userId,
                    }
                  ],
                  dialog_id: dialogId,
                }
              })
              .then((todialog) => {
                const toDialogId = todialog.dataValues.id
                callback(null, toDialogId);
              })
            })
          }
        }
      ], (err, resend) => {
        if (err) return res.status(400).send({ success: false, message: err });

        // Добавляем сообщение
        UserMessages.create({
          dialog_id: dialogId,
          user_id: userId,
          message: mess,
        })
        .then((message) => {

          const newDate = new Date();

          let newMessage = {
            id: message.dataValues.id,
            forwhoId: forWho.id,
            dialog_id: dialogId,
            user_id: userId,
            message: mess,
            date_created: newDate,
            user: user,
          };

          let newDialog = {
            id: resend,
            user_dialog: {
              id: dialogId,
              date_update: newDate,
              user_messages: [
                {
                  id: message.dataValues.id,
                  user_id: userId,
                  message: mess,
                  date_created: newDate,
                }
              ],
            },
            user: forWho,
          };

          let result = { message: newMessage, dialog: newDialog }

          req.io.emit('addNewMessage', result);
          res.json({ success: true, result: result });

        })

      })

    })

  } else return res.status(403).send({ success: false, message: 'Вы не авторизованы!' });
}

module.exports = api;
