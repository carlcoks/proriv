module.exports = function(sequelize, Sequelize) {

  const SportType = sequelize.define('sport_type', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
    },
  }, {
    tableName: 'sport_type',
  });

  return SportType;

}
