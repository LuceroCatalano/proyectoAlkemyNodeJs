const router = require('express').Router();

const characters = require('./api/characters')
const users = require('./api/users')

router.use('/characters', characters);
router.use('/user', users);

module.exports = router;