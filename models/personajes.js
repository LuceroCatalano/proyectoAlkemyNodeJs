module.exports = (sequelize, DataTypes) => {
  return sequelize.define("personaje", { 
    nombre:{
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true
    },
    imagen:{
      type: DataTypes.STRING,
      validate:{
        isUrl: true
      }
    },
    edad: DataTypes.INTEGER,
    peso: DataTypes.INTEGER,
    historia: DataTypes.TEXT,
    peliculasRelacionadas: DataTypes.JSON(DataTypes.STRING)
  });
}
