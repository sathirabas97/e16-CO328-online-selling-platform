'use strict'

const Validator = require('./validator');

// Attributes
let validator;

// Constructor
function ProductValidation() {
    validator = new Validator();
    validator.clear();
};

// Methods

// Validation to make a POST
ProductValidation.prototype.postValidation = (data) => {
    validator.clear();
    // Required validation
    validator.isRequired(data.name, 'The name field is required');
    validator.isRequired(data.slug, 'Slug field is required');
    validator.isRequired(data.description, 'The Description field is required.');
    validator.isRequired(data.price, 'The Price field is required.');
    validator.isRequired(data.quantity, 'The Quantity field is required.');
    
    // If one of the required fields is not completed
    if(!validator.isValid()) {
        return false;
    }

    // Name validator
    validator.hasMinLen(data.name, 5, 'The name must have a minimum of 5 characters');
    validator.hasMaxLen(data.name, 50, 'The name must have a maximum of 50 characters');
       
    // Slug validator
    validator.contains(data.slug, " ", 'The slug must not contain spaces');
    
    // Description validator
    validator.hasMinLen(data.description, 10, 'Description must contain at least 10 letters');
    validator.hasMaxLen(data.description, 500, 'Description must contain a maximum of 500 letters');

    if(validator.isValid()) {
        return true;
    }
    
    return false;
}

// Validation to make a PUT
ProductValidation.prototype.putValidation = (data) => {
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
        validator.hasMaxLen(data.description, 400, 'Description must contain a maximum of 400 letters');
    }
    // Check quantity
    if(data.quantity) {
        validator.isRequired(data.quantity, 'Quantity must be greater than 0');
    }

    // Check slug
    if(data.slug) {
        validator.contains(data.slug, " ", 'The slug must not contain spaces');
    }

    if(validator.isValid()) {
        return true;
    }
    
    return false;
}

// GetErrors
ProductValidation.prototype.errors = () => { 
    return validator.errors(); 
}

module.exports = ProductValidation;