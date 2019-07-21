module.exports = function(sequelize, Sequelize) {

  const Peoples = sequelize.define('peoples', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    people_id: {
      type: Sequelize.STRING,
    },
    birthday: {
      type: Sequelize.INTEGER,
    },
    city: {
      type: Sequelize.STRING,
    },
    family: {
      type: Sequelize.INTEGER,
    },
    job: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.INTEGER,
    },
    license: {
      type: Sequelize.INTEGER,
    },
    cars: {
      type: Sequelize.INTEGER,
    },
    childs: {
      type: Sequelize.INTEGER,
    },
  }, {
    tableName: 'peoples',
  });

  return Peoples;

}
