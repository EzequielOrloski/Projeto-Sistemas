const User    = require('../models/user.models');
const router  = require('express').Router();
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');

function getToken(params = {}){
	return jwt.sign(params, "840932093u509u509u250256u", { expiresIn: 86400, });
}

router.post('/register', async (req, res) => {
	const { email } = req.body; 
	try{
		if(await User.findOne({ email })){
			return res.status(400).send({ 'error': 'Email ja existe!' })
		}
		const user = await User.create(req.body);
		user.password = undefined;
		const token = getToken({ id: user.id });
		return res.send({ user, token });
	}catch(err){
		return res.status(400).send({ 'error': 'falha no registro!' });
	}
});

router.post('/authenticate', async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email }).select('+password');
	if(!user){
		return res.status(400).send({ 'error': 'email ou senha invalido!' });	
	}
	if(!await bcrypt.compare(password, user.password)){
		return res.status(400).send({ 'error': 'senha ou email invalido!' });
	}
	const token = getToken({ id: user.id });
	user.password = undefined;
	res.send({ user, token });
});

module.exports = router;