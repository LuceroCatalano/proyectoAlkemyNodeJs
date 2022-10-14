module.exports = (sequelize, DataTypes)=>{
    const generos = sequelize.define("genero", {
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
      }
    });
    return generos
}