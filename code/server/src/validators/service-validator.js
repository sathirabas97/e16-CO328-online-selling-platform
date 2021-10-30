'use strict'

const Validator = require('./validator');

// Attributes
let validator;

// Constructor
function ServiceValidation() {
    validator = new Validator();
    validator.clear();
};

// Methods

// Validation to make a POST
ServiceValidation.prototype.postValidation = (data) => {
    validator.clear();
    // Required validation
    validator.isRequired(data.name, 'The name field is required');
    validator.isRequired(data.description, 'The Description field is mandatory.');
    validator.isRequired(data.partner, 'The Professional field is required.');
    validator.isRequired(data.price, 'The Price field is required.');
    
    // If one of the required fields is not completed
    if(!validator.isValid()) {
        return false;
    }

    // Name validator
    validator.hasMinLen(data.name, 4, 'The name must have a minimum of 4 characters');
    validator.hasMaxLen(data.name, 20, 'The name must have a maximum of 20 characters');
    
    // Description validator
    validator.hasMinLen(data.description, 50, 'The Description must contain at least 50 letters');
    validator.hasMaxLen(data.description, 200, 'The Description must contain a maximum of 200 letters');

    // Partner validator
    validator.hasMinLen(data.partner, 10, 'The Professional\'s name must contain at least 10 letters');
    validator.hasMaxLen(data.partner, 30, 'The Professional\'s name must contain a maximum of 30 letters');

    if(validator.isValid()) {
        return true;
    }
    
    return false;
}

// Validation to make a PUT
ServiceValidation.prototype.putValidation = (data) => {
    validator.clear();

    // Check name
    if(data.name) {
        validator.hasMinLen(data.name, 5, 'The name must have a minimum of 5 characters');
        validator.hasMaxLen(data.name, 50, 'The name must have a maximum of 50 characters');
    }

    // Check price
    if(data.price) {
        validator.isRequired(data.price, 'Price must be greater than 0');
    }

    // Check description
    if(data.description) {
        validator.hasMinLen(data.description, 10, 'Description must contain at least 10 letters');
        validator.hasMaxLen(data.description, 50, 'Description must contain a maximum of 50 letters');
    }

    // Check partner
    if(data.partner) {
        validator.hasMinLen(data.partner, 10, 'The Professional\'s name must contain at least 10 letters');
        validator.hasMaxLen(data.partner, 30, 'The Professional\'s name must contain a maximum of 30 letters');
    }
    
    if(validator.isValid()) {
        return true;
    }
    
    return false;
}

// GetErrors
ServiceValidation.prototype.errors = () => { 
    return validator.errors(); 
}

module.exports = ServiceValidation;