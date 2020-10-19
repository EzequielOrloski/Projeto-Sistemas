const Config = require('../models/config');
const router  = require('express').Router();

router.post('/', async (req, res) => {
    try{
        const config = await Config.create(req.body);
        return res.json({ config });
    }catch(err){
        return res.status(400).send({ error: "Não foi possivel criar as configuraçoes!" });
    }
});

router.get('/', async (req, res) => {
    try{
        const config = await Config.find();
        return res.json({ config });
    }catch(err){
        return res.status(400).send({ error: "Não foi possivel recuperar os config!" });
    }
});

router.get('/:id', async (req, res) => {
    try{
        const config = await Config.findById(req.params.id); //.populate('user');
        return res.json({ config });
    }catch(err){
        return res.status(400).send({ error: "Não foi possivel recuperar um beacon!" });
    }
});

router.delete('/:id', async (req, res) => {
    try{
        await Config.findByIdAndRemove(req.params.id);
        return res.send();
    }catch(err){
        return res.status(400).send({ error: "Não foi possivel deletar o beacon!" });
    }
});

router.put('/:id', async (req, res) => {
    try{
        const config = await Config.findByIdAndUpdate(req.params.id, req.body);
        await config.save();
        console.log(config);
        return res.send({ config });
    }catch(err){
        return res.status(400).send({ error: "Não foi possivel atualizar o beacon!" });
    }
});
module.exports = router;