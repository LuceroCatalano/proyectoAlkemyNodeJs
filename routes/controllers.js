const jwt = require('jwt-simple');
const moment = require('moment');

const controllerToken = (req, res, next) => {
    if(req.headers['token']) {
        const userToken = req.headers['token'];
        var acceso = {};

        try{
            acceso = jwt.decode(userToken, 'variable de entorno')}
        catch (error){
            return res.json({error: 'Token Invalido'})}

        if(acceso.expiredAt < moment().unix()){
            return res.json({error: 'El tiempo ha expirado. Necesita un nuevo Token'})
        }
        req.userId = acceso.userId;
    }
    else{
        return res.json({error: 'Es necesario un Token para continuar.'})
        
    }
    next();
}

module.exports = {controllerToken};