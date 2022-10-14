const router = require('express').Router();
const { PPsDB, PGsDB } = require('../../db')

router.post('/personajes', async (req, res) =>{
    if(req.body.idMovie && req.body.nombre){
        try{
            await PPsDB.create(req.body)
            res.json({mensaje:'se ha creado la relacion Peliculas-Personajes correctamente'})
        }
        catch(error){
            return res.json(error)
        }
    }
    else{
        res.json({mensaje: 'es necesario completar los campos idMovie y Nombre'})
    }

})

router.post('/generos', async (req, res) =>{
    if(req.body.idMovie && req.body.nombre){
        try{
            await PGsDB.create(req.body)
            res.json({mensaje:'se ha creado la relacion Peliculas-Generos correctamente'})
        }
        catch(error){
            return res.json(error)
        }
    }
    else{
        res.json({mensaje: 'es necesario completar los campos idMovie y Nombre'})
    }
})
module.exports = router;