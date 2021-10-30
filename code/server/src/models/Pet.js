'use strict'
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    owner: {
        type: String,
        required: [true, 'Owner is mandatory'],
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Username is required'],
        trim:true
    },
    image: {
        type: Object
    },
    race: {
        type: String,
        required: [true, 'Race is mandatory'],
        trim: true
    },
    age: {
        type: Number,
        required: [true, 'Age is mandatory']
    }
});

module.exports = mongoose.model('Pet', schema);