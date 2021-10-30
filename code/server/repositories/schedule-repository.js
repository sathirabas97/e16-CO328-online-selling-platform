'use strict'

const mongoose = require('mongoose');
const Schedule = require('../models/Schedule');

exports.create = async(data) => {
    
    var schedule = new Schedule(data);
    return await schedule.save();
}

exports.get = async () => {
    const res = await Schedule.find({}, 'createDate scheduleDate hour totalPrice pet service')
    .populate('customer', 'name')
    return res;
}

exports.getByCustomerId = async (id) => {
    const res = await Schedule.find({ customer: id }, 'scheduleDate hour')
    .populate('customer', 'name')
    .populate('pet', 'name')
    .populate('service', 'name price');

    return res;
}

exports.getByDate = async (date) => {
    const query = {
        scheduleDate: {
            day: date.day,
            month: date.month,
            year: date.year,
        }
    };
    const res = await Schedule.find(
        query)
        .populate('customer', 'name');
    return res;
}

exports.delete = async (id) => {
    const res = await Schedule.findOneAndDelete({ _id: id })
    .populate('customer', 'name')
    return res;
}

