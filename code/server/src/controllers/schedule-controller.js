'use strict'

const repository = require('../repositories/schedule-repository');
const guid = require('guid');

exports.checkDayAvaliable = async (req, res, next) => {
    try {
        const date = req.body.date;
        const cb  = await repository.getByDate(date);

        if(cb.length === 10) {
            res.status(200).send({
                message: 'Full day',
            });
        } else {
            next();
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
    // Creates the data to save
    let data = {
        customer: req.body.customer,
        pet: req.body.pet,
        service: req.body.service,
        createDate: {
            day: now.getDate(),
            month: now.getMonth()+1,
            year: now.getFullYear(),
        },
        scheduleDate: req.body.date,
        hour: "8:00",
        totalPrice: req.body.price
    };

    data.scheduleDate.year = '2021';
    // Saves in the DB
    try {
        const cb = await repository.create(data);
        
        res.status(200).send({ 
            message: 'Successfully scheduled service!',
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
        if(data === null) {
            res.status(200).send({ message: 'There are no appointments!' });
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

exports.getByCustomerId = async (req, res,  next) => {
    try{
        const cb = await repository.getByCustomerId(req.params.id);
        
        if(cb === null) {
            res.status(200).send({message: 'No appointment found'});
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

exports.getByDate = async (req, res,  next) => {
    try{
        const data = await repository.getByDate(req.params);
        if(data.length === 0) {
            res.status(200).send({ 
                message: 'No appointment found',
                data: data  //empty data
            });
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

exports.delete = async(req, res, next) => {
    try{
        const cb = await repository.delete(req.params.id);
        if(cb === null) {
            res.status(200).send({ message: 'Schedule not found!' });
        } else {
            res.status(200).send({ 
                message: 'Schedule removed successfully!',
                data: cb 
            });
        }
    } catch(err) {
        res.status(500).send({ 
            message: 'Failed to process request',
            err: err.message,
            code: err.code
        });
    };
}