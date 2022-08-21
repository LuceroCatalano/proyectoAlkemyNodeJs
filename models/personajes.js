module.exports = (sequelize, DataTypes)=>{

const User = sequelize.define('personaje', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    imagen: DataTypes.STRING,
    nombre:{ 
      type: DataTypes.STRING,
      primaryKey: true,
    },
    edad: DataTypes.INTEGER,
    peso: DataTypes.INTEGER,
    historia: DataTypes.STRING
  });
}