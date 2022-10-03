module.exports = (sequelize, DataTypes)=>{
    return sequelize.define("generos_peliculas", {
        nombre:{
          type: DataTypes.STRING,
          primaryKey: true
        },
        idMovie:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        },          
      });
    }