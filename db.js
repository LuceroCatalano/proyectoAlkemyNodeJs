const { Sequelize } = require('sequelize')


const sequelize = new Sequelize('HzjJgubnHn','HzjJgubnHn', 'audTUtghiW',{
    host: 'remotemysql.com',
    dialect:'mysql'
});
const modelsUsers = require('./models/usuarios');
const modelsPersonajes = require('./models/personajes') ;
const modelsPeliculas = require('./models/peliculas') ;
const modelsPeliculas_personajes = require('./models/peliculas_personajes');
const modelsGeneros = require('./models/generos') ;
const modelsGeneros_peliculas = require('./models/generos_peliculas');

const usersDB = modelsUsers(sequelize, Sequelize);
const personajesDB = modelsPersonajes(sequelize, Sequelize);
const peliculasDB = modelsPeliculas(sequelize, Sequelize);
const peliculas_personajesDB = modelsPeliculas_personajes(sequelize, Sequelize);
const generosDB = modelsGeneros(sequelize, Sequelize);
const generos_peliculasDB = modelsGeneros_peliculas(sequelize, Sequelize);

sequelize.sync({force: false})

module.exports = {sequelize, personajesDB, usersDB, peliculasDB, generosDB, peliculas_personajesDB, generos_peliculasDB}