const router = require('express').Router();
const { PersonajesDB } = require('../../db')

//toda la lista de personajes
router.get('/', async (req, res) => {
    const personajes = await PersonajesDB.findAll();
    res.json(personajes)
});

//busqueda de personaje por nombre
router.get('/:nombre', async (req, res) => {
    const personaje = await PersonajesDB.findOne(req.params, {
        where: {nombre: req.params.nombre}
    })
    res.json(personaje)
});

//crea personaje
router.post('/', async (req, res) => {
const personaje = await PersonajesDB.create(req.body);
res.json({mensaje: 'Se ha creado correctamente', personaje})
});

//modifica personaje por nombre
router.put('/:nombre', async (req,res) =>{
    await PersonajesDB.upDate(req.body, {
        where: {nombre: req.params.nombre}
    });
    res.json({mensaje:'Se ha modificado correctamente'})
});

//borra personaje por nombre
router.delete('/:nombre', async (req, res) =>{
    await PersonajesDB.destroy({
        where: { nombre: req.params.nombre }
    });
    res.json({mensaje:'Se ha borrado correctamente'})
})

module.exports = router;