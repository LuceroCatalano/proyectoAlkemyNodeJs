module.exports = (sequelize, DataTypes)=>{

    const User = sequelize.define('personajePelicula', {
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