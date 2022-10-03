module.exports = (sequelize, DataTypes)=>{
    return sequelize.define("genero", {
      nombre:{ 
        type: DataTypes.STRING,
        primaryKey: true
      },
      imagen: DataTypes.STRING 
      });
    }