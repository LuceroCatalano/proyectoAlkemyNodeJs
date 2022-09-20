module.exports = (sequelize, DataTypes)=>{
    return sequelize.define("peliculas_personaje", {
        nombre:{
          type: DataTypes.STRING,
          primaryKey: true,
        },
          titulo:{ 
          type: DataTypes.STRING,
          primaryKey: true,
        },          
      });
    }