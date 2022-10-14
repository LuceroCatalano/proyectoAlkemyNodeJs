module.exports = (sequelizeDB, DataTypes)=>{
  const peliculas = sequelizeDB.define("pelicula", {
    idMovie:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    titulo:{
      type: DataTypes.STRING,
      unique: true
      },
      imagen:{
        type: DataTypes.STRING,
        validate:{
          isUrl: true
        }
      },
    fechaCreacion: DataTypes.DATE,
    calificacion:{
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      }
    }
  });
  return peliculas
}