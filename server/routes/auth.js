const router = require('express').Router();
const User = require('../model/user');

const validation = require('./validation');

router.post('/register', async (req,res) => {

    const {error} = validation.registerValidation(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    documentUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    try {
        await documentUser.save();
        res.send('User created succesfully.');
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/sign-in', (req,res) => {
    res.send('Sign-in route.');

});

module.exports = router;