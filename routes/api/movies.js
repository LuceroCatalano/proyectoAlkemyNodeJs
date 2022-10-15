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

//Buscada de peliculas por genero, nombre de personaje o por orden
router.get('/peliculas', async (req, res) => {
    const parametro =  req.query.title || req.query.genre || req.query.order;
    if(req.query.title){
        try{
            const busqueda = await sequelizeDB.query('SELECT Pel.titulo, Pel.fechaCreacion, Pel.imagen, Pel.calificacion, Per.nombre FROM personajes Per, PPs, peliculas Pel WHERE Per.nombre = PPs.nombre AND Pel.idMovie = PPs.idMovie AND Pel.titulo = ?', {
                replacements: [parametro],
                type: QueryTypes.SELECT
            });
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
            const busqueda = await sequelizeDB.query('SELECT Pel.titulo, Pel.fechaCreacion, Pel.imagen, Pel.calificacion FROM peliculas Pel, PGs, generos Gen WHERE Pel.idMovie = PGs.idMovie AND Gen.nombre = PGs.nombre AND Gen.nombre = ?', {
            replacements: [parametro],
            type: QueryTypes.SELECT });
        if(busqueda.length==0){
            res.json({mensaje:'No se han encontrado coincidencias'})
        }
        else { res.json(busqueda)
        }
        }
        catch(error){
            return res.json(error)
        }    
    }
    else if(req.query.order){
        const atributos = ['titulo', 'imagen', 'fechaCreacion', 'calificacion']
        try{
            const data = await PeliculasDB.findAll({
                attributes: atributos })
            if(parametro == 'ASC'){
                res.json(data.sort())    
            }
            else if(parametro == 'DESC'){
                res.json(data.reverse())
            }
        }
        catch(error){
            return res.json(error)
        }    
    }
});

module.exports = router;