'use strict'

const mongoose = require('mongoose');
const Pet = require('../models/Pet');
const fs = require('fs');

exports.getByOwnerId = async (id) => {
    const query = { owner: id };
    const res = await Pet.find(
        query,
        'name race age'
    );
    return res;
}

exports.create = async (body, file) => {
    const product = new Pet(body);

    if(file) {
        let imageId = file.filename;
        product.image = { id: imageId, url: `src/public/uploads/pets/${imageId}`};
    }
    const res = await product.save();
    return res;
}

exports.update = async (id, body, file) => {
    const query = {
    };

    const searchQuery = { owner: id, _id: body.id };

    if(body.name) {
        query.name = body.name;
    }
    if(body.race) {
        query.race = body.race;
    }
    if(body.age) {
        query.age = body.age;
    }

    // Updating image if there is one
    const pet = await Pet.find(searchQuery, 'image');
    if(file != null && pet != null) {
        let imageId = file.filename;
        query.image = { id: imageId, url: `src/public/uploads/pets/${imageId}`};
       
        // Remove the old image from the upload folder
        if(pet.image) {
            const path = pet.image.url;
            console.log(path);
            fs.unlinkSync(path);
        }
    }

    const res = await Pet.findOneAndUpdate(searchQuery, query);

    return res;
}

exports.delete = async (id) => {
    const query = {_id: id};
    const res = await Pet.findOneAndRemove(query);
    return res;
}