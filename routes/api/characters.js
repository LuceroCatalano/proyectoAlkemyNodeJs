const router = require('express').Router();
const { PersonajesDB } = require('../../db')

router.get('/', async (req, res) => {
    const personajes = await PersonajesDB.findAll();
    res.json(personajes)
});

router.get('/:nombre', async (req, res) => {
    const personaje = await PersonajesDB.findOne(req.body.nombre);
    res.json(personaje)
});

router.post('/', async (req, res) => {
const personaje = await PersonajesDB.create(req.body);
res.json({mensaje: 'Se ha creado correctamente', personaje})
});

router.put('/:nombre', async (req,res) =>{
    await PersonajesDB.upDate(req.body, {
        where: {nombre: req.params.nombre}
    });
    res.json({mensaje:'Se ha modificado correctamente'})
});

router.delete('/:nombre', async (req, res) =>{
    await PersonajesDB.destroy({
        where: { nombre: req.params.nombre }
    });
    res.json({mensaje:'Se ha borrado correctamente'})
})

module.exports = router;