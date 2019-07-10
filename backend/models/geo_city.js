module.exports = function(sequelize, Sequelize) {

  const GeoCity = sequelize.define('geo_city', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    country_id: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
  }, {
    tableName: 'geo_city',
  });

  return GeoCity;

}
