'use strict'
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name is mandatory'],
        trim: true
    },
    slug: {
        type: String,
        required: [true, 'The slug is mandatory'],
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Description is mandatory']
    },
    price: {
        type: Number,
        trim: true,
        required: [true, 'The price is mandatory']
    },
    active: {
        type: Boolean,
        required: [true, 'Status is mandatory'],
        default: true
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is mandatory'],
        default: 1
    },
    image: {
        type: Object
    },
    category: {
        type: String,
        required: true
    },
    animal: {
        type: String,
        trim: true,
        required: true
    },
    tags: [{
        type: String,
        trim: true,
        required: [true, 'Tags are mandatory']
    }],
});

module.exports = mongoose.model('Product', schema);