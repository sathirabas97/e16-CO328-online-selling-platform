'use strict'
import axios from 'axios';

// Attributes
let errors;

// Constructor
function Cart() {

}

// Methods
Cart.prototype.registerOrder = async (order, totalPrice, user) => {
    let res = {};
    try {
        const url = `http://localhost:8081/orders`
        const data = {
            token: user.token,
            customer: user._id,
            items: order,
            totalPrice: totalPrice
        };

        await axios.post(url, data)
            .then(response => {
                res = response.data;
            }) 
    } catch(err) {
        console.log(err);
    }
    return res;
}


Cart.prototype.clear = () => {
    errors = [];
}

export default Cart;