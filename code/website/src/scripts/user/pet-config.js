'use strict'
import axios from 'axios';

// Attributes
let errors;
let success;

// Constructor
function Pet() {

}

// Methods
//  GET all the pets passing a user id as parameter
Pet.prototype.getPets = async (userId, userToken) => {
    if(!userId) return;

    const res = {};
    try {
        const url = `http://localhost:8081/pets/${userId}/${userToken}`;
        await axios.get(url)
        .then(response => {
            if(response.data.message) {
                res.message = response.data.message;
                res.status = 1;
            } else {
                res.data = response.data;
                res.status = 0; 
            }
        });
    } catch(err) {
        console.log(err);
    }
    return res;
}

Pet.prototype.addNewPet = async (userId, userToken, petData) => {
    if(!userId) return;

    const res = {};
    try {
        const url = `http://localhost:8081/pets/`;

        const data = petData;
        data.owner = userId;
        data.token = userToken;

        await axios.post(url, data)
        .then(response => {
            if(response.data.message) {
                res.data = response.data;
                res.status = 0;
            } else {
                res.data = response.data;
                res.status = 1;
            }
        });
    } catch(err) {
        console.log(err);
    }
    return res;
}

Pet.prototype.updatePetData = async (userId, petData, petId, userToken) => {
    if(!petId || !userId) return;

    const res = {};
    try {
        const url = `http://localhost:8081/pets/${userId}`;

        const data = petData;
        data.token = userToken;
        data.id = petId;

        await axios.put(url, data)
        .then(response => {
            if(response.data.message) {
                res.data = response.data;
                res.status = 0;
            } else {
                res.data = response.data;
                res.status = 1;
            }
        });
    } catch(err) {
        console.log(err);
    }
    return res;
}

Pet.prototype.deletePet = async (petId, userToken) => {
    const res = {};
    try {
        const url = `http://localhost:8081/pets/${petId}/${userToken}`;

        await axios.delete(url)
        .then(response => {
            res.data = response.data;
        });
    } catch(err) {
        console.log(err);
    }
    return res;
}

// getters
Pet.prototype.getErrors = () => {
    return errors; 
}
Pet.prototype.getSuccess = () => { 
    return success; 
}

Pet.prototype.clear = () => {
    errors = [];
}

export default Pet;