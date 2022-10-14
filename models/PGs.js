const generos = require("./generos");
const peliculas = require("./peliculas");

module.exports = (sequelize, DataTypes) => {
  const PGs = sequelize.define("PG", {
    idPGs: {
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    idMovie: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
  });
  PGs.associate = models => {
    PGs.belongsTo(generos, {
      foreignKey: 'nombre'
    });
    PGs.belongsTo(peliculas, {
      foreignKey: 'idMovie'
    });
  }
  return PGs;
};