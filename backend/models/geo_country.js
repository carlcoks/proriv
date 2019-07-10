module.exports = function(sequelize, Sequelize) {

  const GeoCountry = sequelize.define('geo_country', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
    },
  }, {
    tableName: 'geo_country',
  });

  return GeoCountry;

}
