'use strict'
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    pet: {
        type: String,
    },
    service: {
        type: String,
    },
    createDate: {
        day: {
            type: String,
            required: true,
        },
        month: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            required: true,
        }, 
    },
    scheduleDate: {
        day: {
            type: String,
            required: true,
        },
        month: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            required: true,
        }, 
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Schedule', schema);