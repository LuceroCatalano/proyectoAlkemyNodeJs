const router = require('express').Router();
const bcrypt = require('bcryptjs');
const usersDB = require('../../db');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple') 


router.post('/register', [
    check('email', 'Debe ingresar un Email valido').isEmail(),
    check('email', 'El Email es obligatorio').not().isEmpty(),
    check('password', 'El Password es obligatorio').not().isEmpty(),
], async (req, res) => {
    const error = validationResult(req)
    if(error.isEmpty()){
        req.body.password = bcrypt.hashSync(req.body.password);
        const user = await usersDB.create(req.body);
        res.json(user)}
    else{
        res.status(422).json({error:error})
    }
});

router.post('/login', async (req, res) =>{
const usersDB = require('../../db');
const user = await usersDB.findOne({where: {email: req.body.email}})
if(user){
    const valida = bcrypt.compareSync(req.body.password, user.password)
    if(valida){
        res.json({succes: token(user)});
    }
    else{
        res.json({error: 'Usuario o Contraseña invalidos'})
    }
}
else{
    res.json({error: 'Usuario o Contraseña invalidos'})
}
});

const token = (user) =>{
    const payload = {
        userId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(10, 'minutes').unix()
    }
    return jwt.encode(payload, 'variable de entorno') 
}

module.exports = router;