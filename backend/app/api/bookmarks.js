const api = {};

api.getBookmarks = (User, UserInfo, UserBookmarks, Token) => (req, res) => {
  if (Token) {

    const userId = req.query.user_id;

    UserBookmarks.hasOne(User, { sourceKey: 'bookmark_user', foreignKey: 'id' });
    User.hasOne(UserInfo, { sourceKey: 'id', foreignKey: 'user_id' });

    User.findOne({
      attributes: ['id'],
      where: {
        id: userId
      }
    })
    .then(user => {
      if (!user) return res.status(401).send({ success: false, message: 'Пользователь не найден!' });

      UserBookmarks.findAll({
        attributes: ['id'],
        where: {
          user_id: userId,
        },
        include: [
          {
            attributes: ['id', 'firstname', 'lastname', 'gender', 'date_created'],
            model: User,
            include: [
              {
                model: UserInfo,
                attributes: ['src', 'image', 'bg_image', 'main_sport', 'dop_sport'],
              },
            ]
          }
        ]
      })
      .then((bookmarks) => {

        res.json({
          success: true,
          result: bookmarks
        })

      })

    })

  } else return res.status(403).send({ success: false, message: 'Вы не авторизованы!' });
}

api.addBookmark = (User, UserBookmarks, Token) => (req, res) => {
  if (Token) {

    const userId = req.query.user_id,
          bookmarkUser = req.body.bookmark_user;

    User.findOne({
      attributes: ['id'],
      where: {
        id: userId
      }
    })
    .then(user => {
      if (!user) return res.status(401).send({ success: false, message: 'Пользователь не найден!' });

      UserBookmarks.create({
        user_id: userId,
        bookmark_user: bookmarkUser,
      })
      .then(bookmark => {
        const bookmarkId = bookmark.dataValues.id;

        res.json({
          success: true,
          result: {
            id: bookmarkId,
          }
        })
      })

    })

  } else return res.status(403).send({ success: false, message: 'Вы не авторизованы!' });
}

api.deleteBookmark = (User, UserBookmarks, Token) => (req, res) => {
  if (Token) {

    const userId = req.query.user_id,
          bookmarkUser = req.query.bookmark_user;

    User.findOne({
      attributes: ['id'],
      where: {
        id: userId
      }
    })
    .then(user => {
      if (!user) return res.status(401).send({ success: false, message: 'Пользователь не найден!' });

      UserBookmarks.destroy({
        where: {
          user_id: userId,
          bookmark_user: bookmarkUser
        }
      })
      .then(() => {
        res.json({ success: true })
      })

    })

  } else return res.status(403).send({ success: false, message: 'Вы не авторизованы!' });
}

module.exports = api;
