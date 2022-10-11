module.exports = (sequelize, DataTypes)=>{
    return sequelize.define("genero", {
      nombre:{ 
        type:DataTypes.STRING,
        primaryKey: true ,
        unique: true
      },
      imagen:{
        type: DataTypes.STRING,
        validate:{
          isUrl: true
        }
      },
      peliculasYseries: DataTypes.JSON(DataTypes.STRING)
      });
    }