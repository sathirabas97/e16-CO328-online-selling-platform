'use strict'
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name is mandatory'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is mandatory']
    },
    partner: {
        type:String,
        Required: [true, 'The name of the professional who provides the service is mandatory']
    },
    price: {
        type: Number,
        required: [true, 'The price is mandatory']
    },
    image: {
        type: Object
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{
        type: String,
        trim: true,
    }],
});

module.exports = mongoose.model('Service', schema);