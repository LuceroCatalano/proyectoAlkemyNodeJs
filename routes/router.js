const router = require('express').Router();
const controller = require('./controllers')

const characters = require('./api/characters')
const users = require('./api/users')

router.use('/characters', controller.controllerToken, characters);
router.use('/user', users);

module.exports = router;