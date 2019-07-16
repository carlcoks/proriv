const sequelize = require('sequelize');

const api = {}

api.getTreners = (User, UserInfo, UserBookmarks) => (req, res) => {

  const userId = req.query.user_id;

  User.hasOne(UserInfo, { sourceKey: 'id', foreignKey: 'user_id' });
  User.hasOne(UserBookmarks, { sourceKey: 'id', foreignKey: 'bookmark_user' });

  User.findAll({
    attributes: ['id', 'firstname', 'lastname', 'gender', 'date_created'],
    where: {
      user_status_id: 1
    },
    include: [
      {
        model: UserInfo,
        attributes: ['src', 'image', 'bg_image', 'main_sport', 'dop_sport'],
      },
      {
        attributes: ['id'],
        model: UserBookmarks,
        where: {
          user_id: userId,
        },
        required: false,
      }
    ],
  })
  .then(treners => {

    res.json({ success: true, result: treners })

  })

}

module.exports = api;
