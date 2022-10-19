const { Sequelize } = require('sequelize')
const { USUARIO, NOMBRE, PASS } = require("./config");

const sequelizeDB = new Sequelize(USUARIO, NOMBRE ,PASS ,{
    host: 'remotemysql.com',
    dialect:'mysql'
});

const usuarios = require('./models/usuarios');
const personajes = require('./models/Personajes') ;
const peliculas = require('./models/peliculas') ;
const generos = require('./models/generos') ;
const PGs = require('./models/PGs');
const PPs = require('./models/PPs');


const UsersDB = usuarios(sequelizeDB, Sequelize);
const PersonajesDB = personajes(sequelizeDB, Sequelize);
const PeliculasDB = peliculas(sequelizeDB, Sequelize);
const GenerosDB = generos(sequelizeDB, Sequelize);
const PGsDB = PGs(sequelizeDB, Sequelize)
const PPsDB = PPs(sequelizeDB, Sequelize)

sequelizeDB.sync( { force: false} );

module.exports = {
    sequelizeDB,
    UsersDB,
    PersonajesDB,
    PeliculasDB,
    GenerosDB,
    PPsDB,
    PGsDB
};
