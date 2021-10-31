'use strict'

const Validator = require('./validator');

// Attributes
let validator;

// Constructor
function CustomerValidation() {
    validator = new Validator();
    validator.clear();
};

// Methods
CustomerValidation.prototype.postValidation = (data) => {
    validator.clear();
    // Required validation
    validator.isRequired(data.name, 'The name field is required');
    validator.isRequired(data.email, 'The Email field is required');
    validator.isRequired(data.phone, 'The Phone field is required');
    validator.isRequired(data.address, 'The Address field is required');
    validator.isRequired(data.password, 'The Password field is required');
    
    // If one of the required fields is not completed
    if(!validator.isValid()) {
        return false;
    }

    // Name validator
    validator.hasMinLen(data.name, 5, 'The name must have a minimum of 5 characters');
    validator.hasMaxLen(data.name, 50, 'The name must have a maximum of 50 characters');
       
    // Email validator
    validator.isEmail(data.email, 'The email must be in the format user@domain.com');
    
    // Phone validator
    validator.hasMinLen(data.phone, 10, 'The phone number must be in the format (+94) xx-xxxxxxx');
    validator.hasMaxLen(data.phone, 12, 'The phone number must be in the format (+94) xx-xxxxxxx');

    // Password validator
    validator.validPassword(data.password, 'Password must be 8 to 32 characters long, a number and a letter and a special character(!,@,#,etc.)');

    // Address validator
    validator.hasMinLen(data.address, 10, 'The address must be at least 10 characters long');

    if(validator.isValid()) {
        return true;
    }
    
    return false;
}

CustomerValidation.prototype.putValidation = (data) => {
    validator.clear();

    // Name validator
    if(data.name) {
        validator.hasMinLen(data.name, 5, 'The name must have a minimum of 5 characters');
        validator.hasMaxLen(data.name, 50, 'The name must have a maximum of 50 characters');
    }

    // Email validator
    if(data.email) {
        validator.isEmail(data.email, 'The email must be in the format user@domain.com');
    }

    // Phone validator
    if(data.phone) {
        validator.hasMinLen(data.phone, 10, 'The phone number must be in the format (+94) xx-xxxxxxx');
        validator.hasMaxLen(data.phone, 12, 'The phone number must be in the format (+94) xx-xxxxxxx');
    }

    // Password validator
    if(data.password) {
        validator.validPassword(data.password, 'Password must be 8 to 32 characters long, a number and a letter and a special character(!,@,#,etc.)');
    }

    // Address validator
    if(data.address) {
        validator.hasMinLen(data.address, 10, 'The address must be at least 10 characters long');
    }

    if(validator.isValid()) {
        return true;
    }
    
    return false;
}

// GetErrors
CustomerValidation.prototype.errors = () => { 
    return validator.errors(); 
}

module.exports = CustomerValidation;