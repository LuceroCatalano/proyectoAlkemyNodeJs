const jwt = require('jwt-simple');
const moment = require('moment');

const controllerToken = (req, res, next) => {
    if(!req.headers['userToken']){
        return res.json({error: 'Es necesario un Token'})
    }
const userToken = req.headers['userToken'];
var payload = {};

try{
    payload = jwt.encode(userToken, 'variable de entorno')}
catch (err){
    return res.json({error: 'Token Invalido'})}

if(payload.expiredAt < moment().unix()){
    return res.json({error: 'Token Expirado'})
}

req.userId = payload.userId,

next();
}

module.exports = {controllerToken: controllerToken};