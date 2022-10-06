const router = require('express').Router();
const { personajesDB } = require('../../db')
const { QueryTypes, Error } = require('sequelize');
const { sequelize } = require('../../db')

// Buscar toda la lista de personajes
router.get('/', async (req, res) => {
    try{
        const data = await personajesDB.findAll({
        attributes: ['nombre', 'imagen'] });
    res.json(data);
    }
    catch(error){
        return res.json(error)
    }
    
});

// Crear personaje
router.post('/', async (req, res) => {
        if (req.body.nombre && req.body.historia && req.body.imagen && req.body.peso && req.body.edad){
            try{
                var personaje = await personajesDB.create(req.body);
                res.json({mensaje: 'Se ha creado correctamente el Personaje', personaje})
            }
            catch (error){
                return res.json(error)
            }
        }
        else(res.json({mensaje: 'Es necesario completar todos los campos para crear el Personaje'}))
});

// Modificar personaje por nombre
router.put('/', async (req,res) => {    
    const personaje = req.body.nombre
    const parametro = await personajesDB.findOne({where: {nombre: `${personaje}`} })
    
    if(parametro){
            if(req.body.historia || req.body.imagen || req.body.peso || req.body.edad){
                try{
                    await personajesDB.update(req.body, { where: { nombre: personaje }});
                    res.json({ personaje, mensaje:'Se ha modificado correctamente '})
                }
                catch (error){
                    return res.json(error)
                }
            }
            else{res.json({ personaje, mensaje:'No ha modificado ningun campo' })}
    }
    else{res.json({ personaje, mensaje:'Personaje inexistente' })}
});

// Borrar personaje por nombre
router.delete('/', async (req, res) =>{
    const personaje = req.body.nombre
    const parametro = await personajesDB.findOne({where: {nombre: `${personaje}`} })

    if(parametro){
        try{
            await personajesDB.destroy({
                where: { nombre: req.body.nombre }
            });
            res.json({personaje, mensaje:'El Personaje se ha borrado correctamente'})}
        catch(error){
            return res.json(error)
        }
    }
    else(res.json({personaje, mensaje: 'Personaje inexistente'}))
});

//Buscar personajes por nombre, edad o peliculas
router.get('/characters', async (req, res) => {
    const parametro = req.query.name || req.query.age || req.query.movies;
    
    if(req.query.name){
        const busqueda = await sequelize.query('SELECT * FROM `personajes` JOIN `peliculas_personajes` ON(personajes.nombre = peliculas_personajes.personajes) WHERE `nombre` = ?', {
            replacements: [parametro],
            type: QueryTypes.SELECT });
        if(busqueda.length === 0){
            res.json({mensaje:'No hay Personajes con ese nombre'})
        }
        else { res.json(busqueda) }
    }

    else if(req.query.age){
        const busqueda = await sequelize.query('SELECT * FROM `personajes` WHERE `edad` = ?', {
            replacements: [parametro],
            type: QueryTypes.SELECT });
        if(busqueda.length === 0){
            res.json({mensaje:'No hay Personajes con esa edad'});
        }
        else{ res.json(busqueda) }         
    }

    else if(req.query.movies){
        const busqueda = await sequelize.query('SELECT `titulo` FROM `peliculas_personajes` WHERE `idMovie` = ?', {
            replacements: [parametro],
            type: QueryTypes.SELECT });
        
        res.json(busqueda);
    }
});

module.exports = router;