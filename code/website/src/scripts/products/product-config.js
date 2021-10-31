'use strict'
import axios from 'axios';

// Attributes
let errors;

// Constructor
function Product() {

}

// Methods
Product.prototype.getByTag = async (tag) => {
    let res = {};
    try {
        const url = `http://localhost:8081/products/tags/${tag}`
        
        await axios.get(url)
            .then(response => {
                res = response.data;
            })
    } catch(err) {
        console.log(err);
    }

    return res;
}

export default Product;