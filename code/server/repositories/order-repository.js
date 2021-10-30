'use strict'

const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product')

exports.checkStock = async (items) => {
    for(let i = 0; i < items.length; i++) {
        const itemId = items[i].product;
        const quantityRequest = items[i].quantity;

        let data = await Product.findById(itemId, 'quantity');

        if(data.quantity < quantityRequest) {
            return {
                message: 'Estoque indisponivel',
                quantityAvaliable: data.quantity
            }
        } else {
            return null;
        }

    }
}

exports.create = async(data) => {
    var order = new Order(data);
    return await order.save();
}

exports.updateQuantities = async (items) => {
    for(let i = 0; i < items.length; i++) {
        const id = items[i].product;
        const product = await Product.findById(id);
        const oldQuantity =  product.quantity;
        const newQuantity = oldQuantity - items[i].quantity;
        const res = await Product.findByIdAndUpdate(id, { quantity: newQuantity});
    }
}

exports.get = async () => {
    const res = await Order.find({}, 'number status createDate')
    .populate('customer', 'name')
    .populate('items.product', 'name price')
    return res;
}

exports.getByCustomerId = async (id) => {
    const res = await Order.find({customer: id}, 'items')
    .populate('customer', 'name')
    .populate('items.product', 'name price')
    return res;
}

exports.getById = async(id) => {
    const res = await Order.findById(id);
    return res;
}

exports.getByStatus = async (status) => {
    const res = await Order.find({status: status}, 'items')
    .populate('customer', 'name')
    .populate('items.product', 'name price')
    return res;
}

exports.getByDate = async (date) => {
    return await Order.find({
        createDate: {
            day: date.day,
            month: date.month,
            year: date.year,
        }
    }, 'totalPrice hour number')
    .populate('customer', 'name')
    .populate('items.product', 'name');
}

