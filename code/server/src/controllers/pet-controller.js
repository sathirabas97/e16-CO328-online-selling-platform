'use struct'

const repository = require('../repositories/pet-repository');
const PetValidator = require('../validators/pet-validator');
const multer = require('multer');
const path = require('path');

// Configuring multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/uploads/pets');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({ storage });
exports.uploadImage = upload.single('file');

// Controllers 
exports.checkPostData = async (req, res, next)  => {
    const petValidator = new PetValidator();
    if(!petValidator.postValidation(req.body)){
        res.status(200).send( petValidator.errors() );
    } else {
        next();
    }
}

exports.post = async (req, res, next) => {
    try {
        await repository.create(req.body, req.file);
        res.status(201).send({ message: "Pet successfully registered." });
    } catch(err) {
        res.status(500).send({ 
            message: 'Failed to process request',
            err: err.message,
            code: err.code
        });
    };;  
};

exports.get = async (req, res,  next) => {
    try {
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

exports.getByOwnerId = async (req, res, next) => {
    try{
        let data = await repository.getByOwnerId(req.params.id);
        res.status(200).send(data);
    } catch(err) {
        res.status(500).send({ 
            message: 'Failed to process request',
            err: err.message,
            code: err.code
        });
    };     
}

exports.checkPutData = async (req, res, next) => {
    const petValidator = new PetValidator();
    if(req.body.age) {
        req.body.age = parseInt(req.body.age, 10); 
    }
    if(!petValidator.putValidation(req.body)) {
        res.status(200).send( petValidator.errors() );
    } else {
        next();
    }
}

exports.put = async (req, res, next) => {
    try {
        const cb = await repository.update(req.params.id, req.body, req.file);
        if(cb === null) {
            res.status(200).send({
                message: 'Pet not found!'
            });
        } else {
            res.status(200).send({
                message: 'Successfully updated pet!'
            });
            next();
        }
    } catch(err) {
        res.status(500).send({ 
            message: 'Failed to process request',
            err: err.message,
            code: err.code
        });
    };
};

exports.delete = async (req, res, next) => {
    try {
        const cb = await repository.delete(req.params.id);
        if(cb === null) {
            res.status(200).send({
                message: 'Pet not found!'
            });
        } else {
            res.status(200).send({
                message: 'Successfully removed pet!'
            });
        }
    } catch(err) {
        res.status(500).send({ 
            message: 'Failed to process request',
            err: err.message,
            code: err.code
        });
    };
};