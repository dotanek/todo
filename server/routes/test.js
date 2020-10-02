const router = require('express').Router();
const User = require('../model/user');
const verify = require('./verifyToken');

router.get('/',verify, async (req,res) => {
    const user = await User.findOne({ _id:req.user._id });

    if (!user) {
        return res.status(400).send('User does not exist.');
    }

    res.send(user.username); // If the token is correct the username will be sent.
});

module.exports = router;
