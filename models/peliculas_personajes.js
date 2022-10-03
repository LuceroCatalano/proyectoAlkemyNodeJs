module.exports = (sequelize, DataTypes)=>{
    return sequelize.define("peliculas_personajes", {
        nombre:{
          type: DataTypes.STRING,
          primaryKey: true,
        },
          idMovie:{ 
          type: DataTypes.INTEGER,
          primaryKey: true,
        },         
      });
    }