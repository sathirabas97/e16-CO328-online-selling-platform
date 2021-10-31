'use strict'

const Validator = require('./validator');

// Attributes
let validator;

// Constructor
function PetValidation() {
    validator = new Validator();
    validator.clear();
};


PetValidation.prototype.postValidation = (data) => {
    validator.clear();
    // Required validation
    validator.isRequired(data.owner, 'The Owner field is required');
    validator.isRequired(data.name, 'The name field is required');
    validator.isRequired(data.race, 'The Race field is required.');
    validator.isRequired(data.age, 'The Age field is required.');
    
    // If one of the required fields is not completed
    if(!validator.isValid()) {
        return false;
    }


    // Name validator
    if(data.name) {
        data.name = data.name.replace(/\s+/g, ' '); // replace bouble white spaces from name
        validator.hasMaxLen(data.name, 20, 'The name must have a maximum of 20 characters');
    }

    // Race validator
    if(data.race) {
        validator.hasMinLen(data.race, 3, 'The breed must have a minimum of 3 characters');
        validator.hasMaxLen(data.race, 30, 'The breed must have a maximum of 30 characters');
    }

    // Age validator
    if(data.age) {
        validator.isLower(data.age, 1, 'Age must be greater than 0');
    }

    if(validator.isValid()) {
        return true;
    }
    
    return false;
    
}

PetValidation.prototype.putValidation = (data) => {
    validator.clear();
    
    // Name validator
    if(data.name) {
        validator.hasMaxLen(data.name, 50, 'The name must have a maximum of 50 characters');
    }

    // Race validator
    if(data.race) {
        validator.hasMinLen(data.race, 3, 'The breed must have a minimum of 3 characters');
        validator.hasMaxLen(data.race, 50, 'The breed must have a maximum of 50 characters');
    }

    if(data.age) {
        validator.isLower(parseInt(data.age), 0, 'Age must be greater than 0');
    }

    if(validator.isValid()) {
        return true;
    }
    
    return false;
    
}

// GetErrors
PetValidation.prototype.errors = () => { 
    return validator.errors(); 
}

module.exports = PetValidation;