'use strict'

const repository = require('../repositories/order-repository');
const guid = require('guid');

exports.checkStock= async (req, res, next) => {
    try {
        let items  = req.body.items;
        const cb = await repository.checkStock(items);
        if(cb === null) {
            next();
        } else  {
            res.status(200).send(cb);
        }
    } catch(err) {
        res.status(500).send({ 
            message: 'Failed to process request',
            err: err.message,
            code: err.code
        });
    }
}

exports.post = async (req, res, next) => {
    let now = new Date();
    let data = {
        customer: req.body.customer,
        number:  guid.raw().substring(0, 6),
        createDate: {
            day: now.getDate(),
            month: now.getMonth()+1,
            year: now.getFullYear(),
        },
        items: req.body.items,
        hour: now.getHours() + ':' + now.getMinutes(),
        totalPrice: req.body.totalPrice
    };
    try {
        let cb = await repository.create(data);
        if(cb != null) {
            repository.updateQuantities(cb.items);
        }
        res.status(200).send({ 
            message: 'Your order has been successfully registered.!',
            data: cb 
        });
    } catch(err) {
        res.status(500).send({ 
            message: 'Failed to process request',
            err: err.message,
            code: err.code
        });
    }
};

exports.get = async (req, res,  next) => {
    try{
        const data = await repository.get();
        res.status(200).send(data);
    } catch(err) {
        res.status(500).send({ 
            message: 'Failed to process request',
            err: err.message,
            code: err.code
        });
    };
};

exports.getByCustomerId = async (req, res,  next) => {
    try{
        const cb = await repository.getByCustomerId(req.params.id);
        
        if(cb === null) {
            res.status(200).send({message: 'No orders found'});
        } else {
            res.status(200).send(cb);
        }
    } catch(err) {
        res.status(500).send({ 
            message: 'Failed to process request',
            err: err.message,
            code: err.code
        });
    };
};

exports.getByStatus = async (req, res,  next) => {
    try{
        const data = await repository.getByStatus(req.params.status);
        if(data.length === 0) {
            res.status(200).send({ message: 'No orders found' });
        } else {
            res.status(200).send(data);
        }
    } catch(err) {
        res.status(500).send({ 
            message: 'Failed to process request',
            err: err.message,
            code: err.code
        });
    };
};

exports.getByDate = async (req, res,  next) => {
    try{
        const data = await repository.getByDate(req.params);
        if(data.length === 0) {
            res.status(200).send({ message: 'No orders found' });
        } else {
            res.status(200).send(data);
        }
    } catch(err) {
        res.status(500).send({ 
            message: 'Failed to process request',
            err: err.message,
            code: err.code
        });
    };
};