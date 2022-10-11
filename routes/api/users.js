const router = require('express').Router();
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple') 
const { check, validationResult } = require('express-validator');
const { UsersDB } = require('../../db');



router.post('/register', [
    check('email', 'Debe ingresar un Email valido').isEmail(),
    check('email', 'El Email es obligatorio').not().isEmpty(),
    check('password', 'El Password es obligatorio').not().isEmpty()],
    async (req, res) => {
        try{
            const err = validationResult(req)
            if(err.isEmpty()){
            req.body.password = bcrypt.hashSync(req.body.password);
            const user = await UsersDB.create(req.body);
            res.json(user)}
        else{
            res.status(422).json(err)
        }}
    catch (error){
        res.json(error)
    }
});

router.post('/login', async (req, res) => {
const user = await UsersDB.findOne({where: {email: req.body.email}})
try{
    if(user){
        const valida = bcrypt.compareSync(req.body.password, user.password)
        
        if(valida){
            res.json({Token: token(user)});
        }
        else{
            res.json({error: 'Contraseña invalida'})
        }
    }
    else{
        res.json({error: 'Usuario invalido o inexistente'})
    }
}
catch(error){
    return res.json(error)
}});

const token = (user) => {
    const payload = {
        userId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(60, 'minutes').unix()
    }
    return jwt.encode(payload, 'variable de entorno') 
}

module.exports = router;