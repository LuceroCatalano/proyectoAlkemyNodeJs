module.exports = (sequelize, DataTypes) => {
    return sequelize.define("user", {
      email: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING
      }
    });
  };