const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('HzjJgubnHn','HzjJgubnHn', 'audTUtghiW',{
    host: 'remotemysql.com',
    dialect:'mysql'
});
const modelsPersonajes = require('./models/personajes') ;
const modelsUsers = require('./models/usuarios');
const modelsPeliculas_personajes = require('./models/peliculas_personajes');
const modelsPeliculas = require('./models/peliculas') ;
const modelsGeneros = require('./models/generos') ;
const modelsGenero_peliculas = require('./models/generos_peliculas');

const PersonajesDB = modelsPersonajes(sequelize, Sequelize);
const usersDB = modelsUsers(sequelize, Sequelize);
const peliculas_personajesDB = modelsPeliculas_personajes(sequelize, Sequelize);
const peliculasDB = modelsPeliculas(sequelize, Sequelize);
const generosDB = modelsGeneros(sequelize, Sequelize);
const generos_peliculasDB = modelsGenero_peliculas(sequelize, Sequelize);

sequelize.sync({force: false})

module.exports = {sequelize, PersonajesDB, usersDB, peliculasDB, generosDB, peliculas_personajesDB, generos_peliculasDB}