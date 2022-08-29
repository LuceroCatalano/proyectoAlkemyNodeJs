module.exports = (sequelize, DataTypes)=>{
    return sequelize.define("pelicula", {
        id:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        imagen: DataTypes.STRING,
        titulo:{ 
          type: DataTypes.STRING,
          primaryKey: true,
        },
        fechaCreacion: DataTypes.DATE,
        calificacion: DataTypes.INTEGER,
        personajesAsociados: DataTypes.STRING           
      });
    }