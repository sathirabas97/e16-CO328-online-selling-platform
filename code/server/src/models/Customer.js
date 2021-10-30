'use strict'
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        pattern: "^(\\([0-9]{2}\\))?[0-9]{4}-[0-9]{4}$"
    },
    address: {
        type: String,
        required: [true, 'The address is mandatory']
    },
    image: {
        type: Object
    },
    email: {
        type: String,
        pattern: "/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi",
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'User password is required']
    },
    numCard: {
        type: Number
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }]
});

module.exports = mongoose.model('Customer', schema);