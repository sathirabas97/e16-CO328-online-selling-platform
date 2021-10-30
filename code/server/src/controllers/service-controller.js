'use struct'

const repository = require('../repositories/service-repository');
const ServiceValidator = require('../validators/service-validator');
const multer = require('multer');
const path = require('path');

// Configuring multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/uploads/services');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({ storage });
exports.uploadImage = upload.single('file');

// Controllers 
exports.checkPostData = async (req, res, next)  => {
    const serviceValidator = new ServiceValidator();
    if(!serviceValidator.postValidation(req.body)){
        res.status(200).send( serviceValidator.errors() );
    } else {
        next();
    }
}

exports.post = async (req, res, next) => {
    try {
        await repository.create(req.body);
        res.status(201).send({ message: "Service registered successfully." });
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



exports.getBySlug = async (req, res, next) => {
    try {
        let data = await repository.getBySlug(req.params.slug);
        if(data === null) {
            res.status(200).send({ message: 'Service not found' });
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

exports.getById = async (req, res, next) => {
    try{
        let data = await repository.getById(req.params.id);
        if(data === null) {
            res.status(200).send({ message: 'Service not found' });
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
}
exports.getByTag = async (req, res, next) => {
    try {
        let data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch(err) {
        res.status(500).send({ 
            message: 'Failed to process request',
            err: err.message,
            code: err.code
        });
    };
};

exports.checkPutData = async (req, res, next) => {
    const serviceValidator = new ServiceValidator();
    if(!serviceValidator.putValidation(req.body)) {
        res.status(200).send( serviceValidator.errors() );
    } else {
        next();
    }
}

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body, req.file);
        res.status(200).send({
            message: 'Service updated successfully!'
        })
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
            res.status(200).send([{
                message: 'Service not found!'
            }]);
        } else {
            res.status(200).send({
                message: 'Service removed successfully!'
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