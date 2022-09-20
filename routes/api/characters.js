const router = require('express').Router();
const { PersonajesDB } = require('../../db')

// Busca toda la lista de personajes
router.get('/', async (req, res) => {
    const personajes = await PersonajesDB.findAll();
    res.json(personajes);
});

// Busca personaje por nombre
router.get('/:nombre', async (req, res) => {
    const personaje = await PersonajesDB.findOne(
        { where: {nombre: req.params.nombre} })
    res.json(personaje)
});

// Crea personaje
router.post('/', async (req, res) => {
const personaje = await PersonajesDB.create(req.body);
res.json(
    { success: 'Se ha creado correctamente', personaje })
});

// Modifica personaje por nombre
router.put('/:nombre', async (req,res) => {
    await PersonajesDB.update(req.body, {
        where: {nombre: req.params.nombre}
    });
    res.json({success:'Se ha modificado correctamente '})
});

// Borra personaje por nombre
router.delete('/:nombre', async (req, res) =>{
    const personaje = await PersonajesDB.destroy({
        where: { nombre: req.params.nombre }
    });
    res.json({mensaje:'Se ha borrado correctamente', personaje})
})

module.exports = router;