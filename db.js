const { Sequelize } = require('sequelize')

const sequelizeDB = new Sequelize('HzjJgubnHn','HzjJgubnHn', 'audTUtghiW',{
    host: 'remotemysql.com',
    dialect:'mysql'
});

const usuario = require('./models/usuarios');
const personaje = require('./models/personajes') ;
const pelicula = require('./models/peliculas') ;
const generos = require('./models/generos') ;
const PPs = require('./models/PPs');
const PGs = require('./models/PGs');

const UsersDB = usuario(sequelizeDB, Sequelize);
const PersonajesDB = personaje(sequelizeDB, Sequelize);
const PeliculasDB = pelicula(sequelizeDB, Sequelize);
const GenerosDB = generos(sequelizeDB, Sequelize);
const PPsDB = PPs(sequelizeDB, Sequelize);
const PGsDB = PGs(sequelizeDB, Sequelize);

sequelizeDB.sync( { force: false} );

PersonajesDB.belongsToMany(PeliculasDB, { through: 'PPs' });
PeliculasDB.belongsToMany(PersonajesDB, { through: 'PPs' });
GenerosDB.belongsToMany(PeliculasDB, {through: 'PGs'});
PeliculasDB.belongsToMany(GenerosDB, {through: 'PGs'});

module.exports = {
    sequelizeDB,
    UsersDB,
    PersonajesDB,
    PeliculasDB,
    GenerosDB,
    PPsDB,
    PGsDB
};
