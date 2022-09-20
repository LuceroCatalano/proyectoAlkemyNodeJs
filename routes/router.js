const router = require('express').Router();

const characters = require('./api/characters')
const acceso = require('./controllers')
const users = require('./api/users')

router.use('/characters', acceso.controllerToken, characters);
router.use('/auth', users);

module.exports = router;
//