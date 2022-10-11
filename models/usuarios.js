module.exports = (sequelize, DataTypes) => {
    return sequelize.define("usuario", {
      email: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique:true,
      validate:{
        isEmail: true        
      }
    },      
      password: {
        type: DataTypes.STRING
      }
    });
  };