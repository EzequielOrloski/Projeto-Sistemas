const router = require('express').Router();
const Planners = require('../models/planner.models');
const Beacons  = require('../models/beacons.models');

router.post('/', async (req, res) => {
    try{
        const planner = await Planners.create(req.body);
        return res.json({ planner });
    }catch(err){
        return res.status(400).send({ error: "Não foi possivel criar um mapa!" });
    }
});

router.get('/', async (req, res) => {
    try{
        const planners = await Planners.find();
        return res.json({ planners });
    }catch(err){
        return res.status(400).send({ error: "Não foi possivel recuperar os mapas!" });
    }
});

router.get('/:id', async (req, res) => {
    try{
        const planner = await Planners.findById(req.params.id); //.populate('user');
        return res.json({ planner });
    }catch(err){
        return res.status(400).send({ error: "Não foi possivel recuperar um mapa!" });
    }
});

router.delete('/:id', async (req, res) => {
    try{
        await Planners.findByIdAndRemove(req.params.id);
        return res.send();
    }catch(err){
        return res.status(400).send({ error: "Não foi possivel deletar o mapa!" });
    }
});

router.put('/:id', async (req, res) => {
    try{
        const { beacons } = req.body;
        const planner = await Planners.findByIdAndUpdate(req.params.id, {new: true});
        planner.beacons = [];
        await Promise.all(beacons.map(async b => {
            const pl = new Beacons({ name: b.name, x:b.x, y:b.y });
            await pl.save();
            planner.beacons.push(pl);
        }));
        await planner.save();
        return res.send({ planner });
    }catch(err){
        return res.status(400).send({ error: "Não foi possivel atualizar o mapa!" });
    }
});
module.exports = router;