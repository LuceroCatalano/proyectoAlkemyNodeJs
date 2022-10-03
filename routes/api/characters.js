const router = require('express').Router();
const { PersonajesDB } = require('../../db')
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../db')

// Busca toda la lista de personajes

router.get('/', async (req, res) => {
    const data = await PersonajesDB.findAll({
        attributes: ['nombre', 'imagen']
    });
    res.json(data);
});

//Buscada por nombre
router.get('/a', async (req, res) => {
   const parametro = (req.query.name||req.query.age);
   const busqueda = await sequelize.query('SELECT * FROM `personajes` WHERE `edad` = ?', {
    replacements: [parametro],
    type: QueryTypes.SELECT });

    res.json({busqueda});
});

// Crea personaje
router.post('/', async (req, res) => {
    if (req.body.nombre && req.body.historia && req.body.imagen && req.body.peso && req.body.edad){
        var personaje = await PersonajesDB.create(req.body);
        res.json({mensaje: 'Se ha creado correctamente el Personaje', personaje})
    }
    else(res.json({mensaje: 'Es necesario completar todos los campos para crear el Personaje'}))
    });

// Modifica personaje por nombre
router.put('/', async (req,res) => {
    if(req.body.nombre){
        if(req.body.historia || req.body.imagen || req.body.peso || req.body.edad){
            var personaje = req.body.nombre
            await PersonajesDB.update(req.body, {
            where: {nombre: req.body.nombre}
        });
    res.json({personaje, mensaje:'Se ha modificado correctamente '})
        }
        else(res.json({mensaje:'No se ha modificado ningun campo'})) 
    }
    else(res.json({mensaje: 'Es necesario Nombre para poder modificar el Personaje'}))
    
});

// Borra personaje por nombre
router.delete('/', async (req, res) =>{
    if(req.body.nombre){
        const personaje = req.body.nombre
        await PersonajesDB.destroy({
            where: { nombre: req.body.nombre }
        });
        res.json({personaje, mensaje:'El Personaje se ha borrado correctamente'})
    }
    else(res.json({mensaje: 'Es necesario Nombre para borrar un Personaje'}))
})

module.exports = router;