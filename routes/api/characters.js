const router = require('express').Router();
const { PersonajesDB } = require('../../db');
const { sequelizeDB } = require('../../db');
const { QueryTypes } = require('sequelize');

// Buscar toda la lista de personajes
router.get('/', async (req, res) => {
    try{
        const data = await PersonajesDB.findAll({
        attributes: ['nombre', 'imagen'] });
        res.json(data) 
    }
    catch(error){
        return res.json(error)
    } 
});

// Crear personaje
router.post('/', async (req, res) => {
        if (req.body.nombre && req.body.imagen && req.body.edad && req.body.peso && req.body.historia){
            try{
                const personaje = await PersonajesDB.create(req.body)                
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
    const parametro = await PersonajesDB.findOne({where: {nombre: `${personaje}`} })
    if(parametro){
            if(req.body.historia || req.body.imagen || req.body.peso || req.body.edad){
                try{
                    await PersonajesDB.update(req.body, { where: { nombre: personaje }});
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
    const parametro = await PersonajesDB.findOne({where: {nombre: `${personaje}`} })
    if(parametro){
        try{
            await PersonajesDB.destroy({
                where: { nombre: req.body.nombre }
            });
            res.json({personaje, mensaje:'El Personaje se ha borrado correctamente'})}
        catch(error){
            return res.json(error)
        }
    }
    else(res.json({personaje, mensaje: 'Personaje inexistente'}))
});

//Buscar personajes por nombre, edad, peso o por id de peliculas que participo 
router.get('/Personajes', async (req, res) => {
    const parametro = req.query.name || req.query.age || req.query.weight|| req.query.movies ;
    if(req.query.name){
        try{
            const busqueda = await sequelizeDB.query('SELECT Per.nombre, Per.edad, Per.historia, Per.peso, Per.imagen, Pel.titulo FROM personajes Per, PPs, peliculas Pel WHERE Per.nombre = PPs.nombre AND Pel.idMovie = PPs.idMovie AND Per.nombre = ?',{
                replacements: [parametro],
                type: QueryTypes.SELECT
            });
            if(busqueda.length === 0){
                res.json({mensaje:'No hay Personajes con ese nombre'})
            }
            else { res.json(busqueda) }}
        catch(error){
            return res.json(error)
        }
    }
    
    else if(req.query.age){
        try{
            const busqueda = await sequelizeDB.query('SELECT Per.nombre, Per.edad, Per.historia, Per.peso, Per.imagen, Pel.titulo FROM personajes Per, PPs, peliculas Pel WHERE Per.nombre = PPs.nombre AND PPs.idMovie = Pel.idMovie AND Per.edad = ?', {
                replacements: [parametro],
                type: QueryTypes.SELECT });
            if(busqueda.length === 0){
                res.json({mensaje:'No hay Personajes con esa edad'});
            }
            else{ res.json(busqueda) }}
        catch(error){
            return res.json(error)
        }
    }
    
    if(req.query.weight){
        try{
            const busqueda = await sequelizeDB.query('SELECT Per.nombre, Per.edad, Per.historia, Per.peso, Per.imagen, Pel.titulo FROM personajes Per, PPs, peliculas Pel WHERE Per.nombre = PPs.nombre AND PPs.idMovie = Pel.idMovie AND Per.peso = ?', {
                replacements: [parametro],
                type: QueryTypes.SELECT
            });
            if(busqueda.length === 0){
                res.json({mensaje:'No hay Personajes con ese peso'})
            }
            else { res.json(busqueda) }}
        catch(error){
            return res.json(error)
        }
    }

    else if(req.query.movies){
        try{
            const busqueda = await sequelizeDB.query('SELECT Per.nombre, Per.edad, Per.historia, Per.peso, Per.imagen FROM personajes Per, PPs, peliculas Pel WHERE Per.nombre = PPs.nombre AND Pel.idMovie = PPs.idMovie AND Pel.idMovie =?', {
                replacements: [parametro],
                type: QueryTypes.SELECT });
            if(busqueda.length == 0){
                res.json({mensaje:'No se han encontrado coincidencias'})
            }
            else{ res.json(busqueda) }
         }
        catch (error){
            return res.json(error)
        }
    }
});

module.exports = router;