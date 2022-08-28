module.exports = (sequelize, DataTypes)=>{
    const generos_pelicula = sequelize.define("generos_pelicula", {
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