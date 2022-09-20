const jwt = require('jwt-simple');
const moment = require('moment');

const controllerToken = (req, res, next) => {
    if(req.headers['token']) {
        const userToken = req.headers['token'];
        var payload = {};

        try{
            payload = jwt.decode(userToken, 'variable de entorno')}
        catch (err){
            return res.json({error: 'Token Invalido'})}

        if(payload.expiredAt < moment().unix()){
            return res.json({error: 'El tiempo ha expirado. Necesita un nuevo Token'})
        }
        req.userId = payload.userId;
    }
    else{
        return res.json({error: 'Es necesario un Token para continuar.'})
        
    }
    next();
}

module.exports = {controllerToken: controllerToken};