module.exports = function(sequelize, Sequelize) {

  const UserRewards = sequelize.define('user_rewards', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    src: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    date_created: {
      type: Sequelize.DATE,
    },
  }, {
    tableName: 'user_rewards',
    // classMethods: {
    //   associate: function(models) {
    //     UserRewards.belongsTo(models.User, {
    //       foreignKey: "user_id"
    //     });
    //   }
    //  }
  });

  return UserRewards;

}
