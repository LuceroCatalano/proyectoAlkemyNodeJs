module.exports = (sequelize, DataTypes)=>{
    return sequelize.define("peliculas_personajes", {
        personajes:{
          type: DataTypes.STRING,
          primaryKey: true,
          unique: true
        },
        peliculas:{ 
          type: DataTypes.INTEGER,
          primaryKey: true,
          unique: true
        },         
      });
    }