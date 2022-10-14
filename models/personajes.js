module.exports = (sequelizeDB, DataTypes) => {
   const personajes = sequelizeDB.define("personaje", { 
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
    peso: DataTypes.FLOAT,
    historia: DataTypes.TEXT
  });
  return personajes
}