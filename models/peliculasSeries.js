module.exports = (sequelize, DataTypes)=>{

    const User = sequelize.define('peliculaSerie', {
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