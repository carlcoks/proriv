module.exports = function(sequelize, Sequelize) {

  const Service = sequelize.define('service', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
    },
    people_id: {
      type: Sequelize.STRING,
    },
    service_id: {
      type: Sequelize.STRING,
    },
  }, {
    tableName: 'service',
  });

  return Service;

}
