const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const validation = require('./validation');

// Model imports

const User = require('../model/user');

router.get('/', async (req,res) => {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(400).send('Access denied.');
    }

    try {
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        let user = await User.findOne({ _id:verified._id });
        if (!user) {
            return res.status(400).send('User does not exist.')
        }

        res.send({ username:user.username });
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post('/register', async (req,res) => {

    console.log(req.body);

    const {error} = validation.registerValidation(req.body); // Validation of username and password.

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const userExist = await User.findOne({ username:req.body.username });   // Checking if user exists.

    if (userExist) {
        return res.status(400).send('User with given name already exists.');
    }

    const hashPassword = await bcrypt.hash(req.body.password,10);

    const user = new User({
        username: req.body.username,
        password: hashPassword
    });

    try {
        await user.save();
        res.send('User created succesfully.');
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/sign-in', async (req,res) => {
    const user = await User.findOne({ username:req.body.username });

    if (!user) { // Checking if user exists.
        res.status(400).send('Incorrect username or password was given.');
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    
    if (!match) { // Checking if password matches. 
        return res.status(400).send('Incorrect username or password was given.');
    }

    const token = jwt.sign({ _id:user.id },process.env.TOKEN_SECRET); // Creating token.
    
    res.header('auth-token', token).send(token);
});

module.exports = router;