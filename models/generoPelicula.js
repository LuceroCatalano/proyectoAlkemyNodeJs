module.exports = (sequelize, DataTypes)=>{

    const User = sequelize.define('generoPelicula', {
        nombre:{ 
            type: DataTypes.STRING,
            primaryKey: true,
          },
          titulo:{ 
            type: DataTypes.STRING,
            primaryKey: true,
          }           
      });
    }