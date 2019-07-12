const sequelize = require('sequelize');

const api = {}

api.getTreners = (User, UserInfo) => (req, res) => {

  User.hasOne(UserInfo, { sourceKey: 'id', foreignKey: 'user_id' });

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
    ],
  })
  .then(treners => {

    res.json({ success: true, result: treners })

  })

}

module.exports = api;
