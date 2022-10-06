module.exports = (sequelize, DataTypes)=>{
    return sequelize.define("genero", {
      idGenero:{
        type: DataTypes.INTEGER,
        primaryKey: true ,
        autoIncremet: true,
        unique:true
      },
      nombre: DataTypes.STRING,
      imagen: DataTypes.STRING 
      });
    }