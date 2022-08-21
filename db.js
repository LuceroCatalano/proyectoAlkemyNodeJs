const Sequelize = require('sequelize')
const modelsPersonajes = require('./models/personajes') ;
const modelsPeliculasSeries = require('./models/peliculasSeries') ;
const modelsGeneros = require('./models/generos') ;
const modelsPersonajePelicula = require('./models/personajePelicula') ;
const modelsGenerojePelicula = require('./models/generoPelicula') ;

const sequelize = new Sequelize('AZ0h4WL1MU','AZ0h4WL1MU', '9mDKk6z3xI',{
    host: 'remotemysql.com',
    dialect:'mysql'
});
const personaje = modelsPersonajes(sequelize, Sequelize);
const peliculaSerie = modelsPeliculasSeries(sequelize, Sequelize);
const genero = modelsGeneros(sequelize, Sequelize);
const personajePelicula = modelsPersonajePelicula(sequelize, Sequelize)
const generoPelicula = modelsGenerojePelicula(sequelize, Sequelize)

sequelize.sync({force: true})

module.exports = {personaje, peliculaSerie, genero, personajePelicula, generoPelicula}