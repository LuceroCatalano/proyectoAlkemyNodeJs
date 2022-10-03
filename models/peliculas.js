module.exports = (sequelize, DataTypes)=>{
    return sequelize.define("pelicula", {
        idMovie:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        titulo: DataTypes.STRING,
        imagen: DataTypes.STRING,
        fechaCreacion: DataTypes.DATE,
        calificacion: DataTypes.INTEGER,
               
      });
    }