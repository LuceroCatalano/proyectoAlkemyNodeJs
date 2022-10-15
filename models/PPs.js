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

  return PPs;
};