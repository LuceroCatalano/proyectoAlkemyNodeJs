const personajes = require('./personajes');
const peliculas = require('./peliculas');

module.exports = (sequelize, DataTypes)=>{
    return sequelize.define("PP", {
        nombre_1:{
          type: DataTypes.STRING,
          references: {
            model: personajes,
            key: 'nombre'
          }
        },
        idMovie_1:{
          type: DataTypes.INTEGER,
          references: {
            model: peliculas,
            key: 'idMovie'
          }
        }     
    });
}
   