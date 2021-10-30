'use strict'
import axios from 'axios';

// Attributes
let errors;

// Constructor
function Admin() {

}

// Methods
// Make an user an admin
Admin.prototype.putAdmin = async (userEmail, userToken) => {
    let res = {};
    try {
        const url = `http://localhost:8081/customers/admin/${userToken}`
        const data = {
            email: userEmail,
        };

        await axios.put(url, data)
        .then(response => {
            res.data = response.data;
        });
    } catch(err) {
        console.log(err);
    }
    return res;
}

    // PRODUCT
Admin.prototype.postProduct = async (product, userToken) => {
    let res = {};
    try {
        const url = `http://localhost:8081/products`;
        const data = product;
        data.token = userToken;

        await axios.post(url, data)
        .then(response => {
            if(response.data.message) {
                res.data = response.data.message;
                res.status = 0;
            } else {
                res.data = [];
                for(let i = 0; i < response.data.length; i++) {
                    res.data[i] = response.data[i].message;
                }
                res.status = 1;
            }
        })
    } catch(err) {
        console.log(err);
    }
    return res;
}

Admin.prototype.putProduct = async (product, userToken) => {
    let res = {};
    try {
        const url = `http://localhost:8081/products/${product.id}`;
        const data = product;
        data.token = userToken;

        await axios.put(url, data)
        .then(response => {
            if(response.data.message) {
                res.data = response.data.message;
                res.status = 0;
            } else {
                res.data = [];
                for(let i = 0; i < response.data.length; i++) {
                    res.data[i] = response.data[i].message;
                }
                res.status = 1;
            }
        })
    } catch(err) {
        console.log(err);
    }
    return res;
}

Admin.prototype.deleteProduct = async (product, userToken) => {
    let res = {};
    try {
        const url = `http://localhost:8081/products/${product.id}/${userToken}`;

        await axios.delete(url)
        .then(response => {
            if(response.data.message) {
                res.data = response.data.message;
                res.status = 0;
            } else {
                res.data = [];
                for(let i = 0; i < response.data.length; i++) {
                    res.data[i] = response.data[i].message;
                }
                res.status = 1;
            }
        })
    } catch(err) {
        console.log(err);
    }
    return res;
}

    // SERVICE
Admin.prototype.postService = async (service, userToken) => {
    let res = {};
    try {

        const url = `http://localhost:8081/services`;
        const data = service;
        data.token = userToken;

        await axios.post(url, data)
        .then(response => {
            if(response.data.message) {
                res.data = response.data.message;
                res.status = 0;
            } else {
                res.data = [];
                for(let i = 0; i < response.data.length; i++) {
                    res.data[i] = response.data[i].message;
                }
                res.status = 1;
            }
        })
    } catch(err) {
        console.log(err);
    }
    return res;
}

Admin.prototype.putService = async (service, userToken) => {
    let res = {};
    try {

        const url = `http://localhost:8081/services/${service.id}`;
        const data = service;
        data.token = userToken;

        await axios.put(url, data)
        .then(response => {
            if(response.data.message) {
                res.data = response.data.message;
                res.status = 0;
            } else {
                res.data = [];
                for(let i = 0; i < response.data.length; i++) {
                    res.data[i] = response.data[i].message;
                }
                res.status = 1;
            }
        })
    } catch(err) {
        console.log(err);
    }
    return res;
}

Admin.prototype.deleteService = async (service, userToken) => {
    let res = {};
    try {

        const url = `http://localhost:8081/services/${service.id}/${userToken}`;
        const data = service;
        data.token = userToken;

        await axios.delete(url, data)
        .then(response => {
            if(response.data.message) {
                res.data = response.data.message;
                res.status = 0;
            } else {
                res.data = [];
                for(let i = 0; i < response.data.length; i++) {
                    res.data[i] = response.data[i].message;
                }
                res.status = 1;
            }
        })
    } catch(err) {
        console.log(err);
    }
    return res;
}

Admin.prototype.getEarnScreen = async (date, userToken) => {
    let res = {};
    try {

        const url = `http://localhost:8081/orders/${userToken}/${date.day}/${date.month}/${date.year}`;

        await axios.get(url)
        .then(response => {
            if(response.data.message) {
                res.data = response.data.message;
                res.status = 1;
            } else {
                res.data = [];
                for(let i = 0; i < response.data.length; i++) {
                    res.data[i] = response.data[i];
                }
                res.status = 0;
            }
        })
    } catch(err) {
        console.log(err);
    }
    return res;
}

Admin.prototype.clear = () => {
    errors = [];
}

export default Admin;