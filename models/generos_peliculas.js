module.exports = (sequelize, DataTypes)=>{
    return sequelize.define("generos_pelicula", {
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