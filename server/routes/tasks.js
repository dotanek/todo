const router = require('express').Router();
const verify = require('./verifyToken');

// Model imports

const User = require('../model/user');
const Task = require('../model/task');

router.get('/fetch', verify, async (req,res) => {
    const user = await User.findOne({ _id:req.user._id });

    if (!user) {
        return res.status(400).send('User does not exist.');
    }

    const tasks = await Task.find({ user_id:user._id });
    res.send(tasks);
});

module.exports = router;
