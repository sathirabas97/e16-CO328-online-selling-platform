'use strict'
import axios from 'axios';

// Attributes
let errors;
let success;

// Constructor
function User() {

}

// Methods
User.prototype.updateUserData = async (data, userId, userToken) => {
    let json = {};
    errors = [];
    success = [];

    // Test everry possible data, once the put not necessary needs a data
    if(data.name) {
        json.name = data.name;
    }
    if(data.email) {
        json.email = data.email;
    }
    if(data.phone) {
        json.phone = data.phone;
    }
    if(data.address) {
        json.address = data.address;
    }
    if(data.password) {
        json.password = data.password;
    }

    // Keep the token to put into the new user datas.
    json.token = userToken;
    var res = {};
    try {
        // Update user information
        const url = `http://localhost:8081/customers/${userId}`;
        const data = json;
        const headers = {};
        await axios.put(url, data, headers)
        .then(response => {
            res.data = response.data;
            if(response.data.message) {
                res.status = 0;
            } else if(response.data[0].message) {
                res.status = 1;
            }
        });

        // Getting the new user data
        await axios.get(url)
        .then(response => {
          res.user = response.data;
          res.user.token = userToken;
        });
    } catch(err) {
      console.log(err);
    }

    // Return the user with the data updated
    return res;
}

// getters
User.prototype.getErrors = () => {
    return errors; 
}
User.prototype.getSuccess = () => { 
    return success; 
}

User.prototype.clear = () => {
    errors = [];
}

export default User;