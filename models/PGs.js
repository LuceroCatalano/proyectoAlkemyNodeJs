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

  return PGs;
};