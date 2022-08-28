const Sequelize = require('sequelize')

const sequelize = new Sequelize('HzjJgubnHn','HzjJgubnHn', 'audTUtghiW',{
    host: 'remotemysql.com',
    dialect:'mysql'
});
const modelsPersonajes = require('./models/personajes') ;
const modelsUsers = require('./models/usuarios');
/*const modelsPeliculas = require('./models/peliculas') ;
const modelsGeneros = require('./models/generos') ;
const modelsPeliculas_personajes = require('./models/peliculas_personaje');
const modelsGenero_peliculas = require('./models/generos_pelicula');*/

const personajesDB = modelsPersonajes(sequelize, Sequelize);
const usersDB = modelsUsers(sequelize, Sequelize);
/*const peliculasDB = modelsPeliculas(sequelize, Sequelize);
const generosDB = modelsGeneros(sequelize, Sequelize);
const peliculas_personajesDB = modelsPeliculas_personajes(sequelize, Sequelize);
const generos_peliculasDB = modelsGenero_peliculas(sequelize, Sequelize);*/

sequelize.sync({force: false})

module.exports = {personajesDB, usersDB/* peliculas, generos, roles, peliculas_personajes, generos_peliculas*/}