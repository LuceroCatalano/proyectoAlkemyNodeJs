module.exports = (sequelize, DataTypes)=>{
    const peliculas_personaje = sequelize.define("peliculas_personaje", {
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