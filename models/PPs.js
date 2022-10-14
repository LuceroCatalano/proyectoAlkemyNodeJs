const personajes = require('./personajes');
const peliculas = require('./peliculas');

module.exports = (sequelize, DataTypes) => {
  const PPs = sequelize.define("PP", {
    idPPs: {
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    idMovie: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
  });
  PPs.associate = models => {
    PPs.belongsTo(personajes, {
      foreignKey: 'nombre'
    });
    PPs.belongsTo(peliculas, {
      foreignKey: 'idMovie'
    });
  }
  return PPs;
};