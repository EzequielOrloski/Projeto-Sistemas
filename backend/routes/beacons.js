const Beacons = require('../models/beacons.models');
const router  = require('express').Router();

router.post('/', async (req, res) => {
    try{
        const beacons = await Beacons.create(req.body);
        return res.json({ beacons });
    }catch(err){
        return res.status(400).send({ error: "Não foi possivel criar um beacon!" });
    }
});

router.get('/', async (req, res) => {
    try{
        const beacons = await Beacons.find();
        return res.json({ beacons });
    }catch(err){
        return res.status(400).send({ error: "Não foi possivel recuperar os beacons!" });
    }
});

router.get('/:id', async (req, res) => {
    try{
        const beacons = await Beacons.findById(req.params.id); //.populate('user');
        return res.json({ beacons });
    }catch(err){
        return res.status(400).send({ error: "Não foi possivel recuperar um beacon!" });
    }
});

router.delete('/:id', async (req, res) => {
    try{
        await Beacons.findByIdAndRemove(req.params.id);
        return res.send();
    }catch(err){
        return res.status(400).send({ error: "Não foi possivel deletar o beacon!" });
    }
});

router.put('/:id', async (req, res) => {
    try{
        const beacons = await Beacons.findByIdAndUpdate(req.params.id, req.body);
        await beacons.save();
        console.log(beacons);
        return res.send({ beacons });
    }catch(err){
        return res.status(400).send({ error: "Não foi possivel atualizar o beacon!" });
    }
});
module.exports = router;