'use strict'

const mongoose = require('mongoose');
const Service = require('../models/Service');
const fs = require('fs');

exports.get = async () => {
    const query = { active: true };
    const res = await Service.find(
        query,
        'name price description image partner hours'
    );
    return res;
}

exports.getBySlug = async (slug) => {
    const query = { 
        slug: slug,
        active: true 
    };
    const res = await Service
        .findOne(
            query,
            'name price description image partner hours'
        );
    return res;
}

exports.getById = async (id) => {
    const res = await Service.findById(id);
    return res;
}

exports.getByTag = async (tag) => {
    const res = await Service.find({ 
        tags: tag,
        active: true
    }, 'name price description image partner hours');
    return res;
}

exports.create = async (body) => {
    const data = body;

    data.tags = [];
    data.tags[0] = body.name;
    data.tags[1] = body.price.toString();
    data.tags[2] = body.partner;
    
    const product = new Service(data);
    const res = await product.save();

    return res;
}

exports.update = async (id, body, file) => {
    const query = {};

    if(body.name) {
        query.name = body.name;
    }
    if(body.description) {
        query.description = body.description;
    }
    if(body.price) {
        query.price = body.price;
    }
    if(body.quantity) {
        query.quantity = body.quantity;
    }
    if(body.tags) {
        query.tags = body.tags;
    }
    if(body.slug) {
        query.slug = body.slug;
    }
    if(body.partner) {
        query.partner = body.partner;
    }
    if(body.hours) {
        query.hours = body.hours;
    }

 
    if(file) {
        let imageId = file.filename;
        query.image = { id: imageId, url: `src/public/uploads/services/${imageId}`};
        const service = await Service.findById(id, 'image');
        

        if(service.image) {
            const path = service.image.url;
            fs.unlinkSync(path);
        }
    }

    const res = await Service.findByIdAndUpdate(id, query);

    return res;
}

exports.delete = async (id) => {
    return await Service.findByIdAndRemove(id);
}