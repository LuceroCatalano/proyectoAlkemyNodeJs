const router = require('express').Router();
const { PeliculasDB } = require('../../db')
const { sequelizeDB } = require('../../db')
const { QueryTypes } = require('sequelize');

// Busca toda la lista de peliculas
router.get ('/', async (req, res) =>{
    const data = await PeliculasDB.findAll({
        attributes: ['titulo', 'imagen', 'fechaCreacion']
    });
    res.json(data);
});

// Crea pelicula
router.post('/', async (req, res) => {
    if (req.body.titulo && req.body.fechaCreacion && req.body.imagen && req.body.calificacion){
        try{
            const pelicula = await PeliculasDB.create(req.body);
            res.json({mensaje: 'Se ha creado correctamente la pelicula', pelicula});  
        }
        catch(error){
            return res.json(error)
        }   
    }
    else(res.json({mensaje: 'Es necesario completar todos los campos para crear la pelicula'}))
    });

// Modifica pelicula por titulo
router.put('/', async (req,res) => {
    if(req.body.titulo){
        if(req.body.fechaCreacion || req.body.imagen || req.body.calificacion){
            var pelicula = req.body.titulo
            await PeliculasDB.update(req.body, {
            where: {titulo: pelicula}
        });
            res.json({pelicula, mensaje:'Se ha modificado correctamente '})
        }
        else(res.json({mensaje:'No se ha modificado ningun campo'})) 
    }
    else(res.json({mensaje: 'Es necesario Titulo para poder modificar la pelicula'}))
    
});

// Borra pelicula por titulo
router.delete('/', async (req, res) =>{
    if(req.body.titulo){
        const pelicula = req.body.titulo
        await PeliculasDB.destroy({
            where: { titulo: req.body.titulo }
        });
        res.json({pelicula, mensaje:'La pelicula se ha borrado correctamente'})
    }
    else(res.json({mensaje: 'Es necesario titulo para borrar una Pelicula'}))
})

//Buscada de peliculas por genero, nombre o por orden
router.get('/movies', async (req, res) => {
    const parametro =  req.query.name || req.query.genre || req.query.order;
    if(req.query.name){
        try{
            const busqueda = await sequelizeDB.query('SELECT `idMovie` FROM `PPs` WHERE `nombre` = ?', {
            replacements: [parametro],
            type: QueryTypes.SELECT });
        if(busqueda.length==0){
            res.json({mensaje:'No se han encontrado coincidencias'})
        }
        else { res.json(busqueda) }
        }
        catch(error){
            return res.json(error)
        }
   }
    else if(req.query.genre){
        try{
            const busqueda = await sequelizeDB.query('SELECT * FROM `generos` WHERE `idGenero` = ?', {
            replacements: [parametro],
            type: QueryTypes.SELECT });
        if(busqueda.length==0){
            res.json({mensaje:'No se han encontrado coincidencias'})
        }
        else { res.json(busqueda) }
        }
        catch(error){
            return res.json(error)
        }    
    }
    else if(req.query.order){
        try{
            if(parametro == 'ASC'){
                parametro.push(['createdAt', 'ASC'])
            }
            else{
                parametro.push(['createdAt', 'DESC'])
            }
            return await PeliculasDB.findAll({
                attributes: ['id', 'picture', 'title', 'createdAt'],
                order: parametro})
        }
        catch(error){
            return res.json(error)
        }    
    }
});

module.exports = router;