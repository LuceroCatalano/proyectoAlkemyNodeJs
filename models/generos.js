module.exports = (sequelize, DataTypes)=>{

    const User = sequelize.define('genero', {
        id:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        imagen: DataTypes.STRING,
        nombre:{ 
          type: DataTypes.STRING,
          primaryKey: true
        }
      });
    }