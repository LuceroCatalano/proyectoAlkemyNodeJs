const router = require('express').Router();

const users = require('./api/users')
const acceso = require('./controllers')
const characters = require('./api/characters')
const movies = require('./api/movies')
const relaciones = require('./api/relaciones') 

router.use('/characters', /*acceso.controllerToken,*/ characters);
router.use('/auth', users);
router.use('/movies', /*acceso.controllerToken,*/ movies)
router.use('/relaciones', /*acceso.controllerToken,*/relaciones)

module.exports = router;