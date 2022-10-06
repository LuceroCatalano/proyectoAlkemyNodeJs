const router = require('express').Router();
const { peliculasDB } = require('../../db')
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../db')

// Busca toda la lista de peliculas
router.get ('/', async (req, res) =>{
    const data = await peliculasDB.findAll({
        attributes: ['titulo', 'imagen', 'fechaCreacion']
    });
    res.json(data);
});

// Crea pelicula
router.post('/', async (req, res) => {
    if (req.body.titulo && req.body.fechaCreacion && req.body.imagen && req.body.calificacion){
        var pelicula = await peliculasDB.create(req.body);
        res.json({mensaje: 'Se ha creado correctamente la pelicula', pelicula})
    }
    else(res.json({mensaje: 'Es necesario completar todos los campos para crear la pelicula'}))
    });

// Modifica pelicula por titulo
router.put('/', async (req,res) => {
    if(req.body.titulo){
        if(req.body.fechaCreacion || req.body.imagen || req.body.calificacion){
            var pelicula = req.body.titulo
            await peliculasDB.update(req.body, {
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
        await peliculasDB.destroy({
            where: { titulo: req.body.titulo }
        });
        res.json({pelicula, mensaje:'La pelicula se ha borrado correctamente'})
    }
    else(res.json({mensaje: 'Es necesario titulo para borrar una Pelicula'}))
})

//Buscada de peliculas por genero, nombre o por orden
router.get('/movies', async (req, res) => {
    const parametro = req.query.genre || req.query.name || req.query.order;
    if(req.query.genre){
        const busqueda = await sequelize.query('SELECT * FROM `generos` WHERE `idGenero` = ?', {
            replacements: [parametro],
            type: QueryTypes.SELECT });
        if(busqueda.length==0){
            res.json({mensaje:'No se han encontrado coincidencias'})
        }
        else { res.json(busqueda) }
    }
    
    else if(req.query.name){
        const busqueda = await sequelize.query('SELECT * FROM `peliculas` WHERE `titulo` = ?', {
            replacements: [parametro],
            type: QueryTypes.SELECT });
        if(busqueda.length==0){
            res.json({mensaje:'No se han encontrado coincidencias'})
        }
        else { res.json(busqueda) }
   }
    
    else if(req.query.order){
        const busqueda = await sequelize.query('SELECT * FROM `peliculas` WHERE `titulo` = ?', {
            replacements: { order: ['ASC'] },
            type: QueryTypes.SELECT });

    res.json(busqueda)}
    
});

module.exports = router;