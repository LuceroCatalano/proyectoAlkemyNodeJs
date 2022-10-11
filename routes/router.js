const router = require('express').Router();

const characters = require('./api/characters')
const acceso = require('./controllers')
const users = require('./api/users')
const movies = require('./api/movies')

router.use('/characters', /*acceso.controllerToken,*/ characters);
router.use('/auth', users);
router.use('/movies', /*acceso.controllerToken,*/ movies)

module.exports = router;
