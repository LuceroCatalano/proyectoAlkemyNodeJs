const generos = require("./generos");
const peliculas = require("./peliculas");

module.exports = (sequelize, DataTypes)=>{
    return sequelize.define("PG", {
        nombre_2:{
          type: DataTypes.STRING,
          references: {
            model: generos,
            key: 'nombre'
          }
        },
        idMovie_2:{ 
        type: DataTypes.INTEGER,
        references: {
          model: peliculas,
          key: 'idMovie'
        }
        },          
      });
    }