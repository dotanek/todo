const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        min: 0,
        max: 255
    },
    description: {
        type: String,
        required: false,
        min: 0,
        max: 1024
    },
    date: { 
        type: String, // Will be stored as js timestamp, hence the string.
        required: false
    }
});

module.exports = mongoose.model('Task', taskSchema);