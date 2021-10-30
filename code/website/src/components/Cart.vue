<template>
  <div>
    <div id="cart-content">

      <!-- Sucess menssage when finish an order -->
      <div class="success" v-if="orderSuccess">
            <h3>{{ orderSuccessMsg }}</h3>
      </div>

      <!-- Empty Cart message -->
      <div v-if="!cart.length" class=error>
        <div class="message">
          <img src="/static/img/icons/box_red_icon.png" alt="">
          <h1>You don't have any items in your cart yet.</h1>
          <router-link to="/products">Visit the products section</router-link>
        </div>
      </div>

      <!-- Cart with items -->
      <div id="cart-table" v-else>
        <h2>My request</h2>

        <!-- Products table -->
        <table>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Animal</th>
            <th>The amount</th>
            <th>Value</th>
          </tr>
          <tr v-for="item in cart" :key="item._id">
            <td>{{item.product.name}}</td>
            <td>{{item.product.category}}</td>
            <td>{{item.product.animal}}</td>
            <td>{{item.quantity}}</td>
            <td>${{item.quantity * item.product.price}},00</td>
          </tr>
        </table>

        <!-- Input card number -->
        <h3 style="margin: 25px;">Total: ${{ total }},00</h3>
        <div v-if="user.name != undefined">
          <h4>Card number</h4>
          <input type="number" placeholder="Enter card number" v-model="cardNumber">
        </div>

        <!-- Display ERRORS -->
        <div class="error" v-else>
          <h3>You must be logged in to complete the purchase</h3>
        </div>

        <div v-if="orderError || orderSuccess" style="margin: 10px;">
          <div class="error" v-if="orderError">
            <h3>{{ orderErrors }}</h3>
          </div>
        </div>

        <!-- Confirm order -->
        <div v-if="user.name != undefined">
          <input type="button" @click.stop.prevent="finishOrder()"
           value="Checkout"
           class="finish-btn">
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Bus from './bus';
import Cart from '../scripts/cart/cart-config'

export default {
  name: 'Cart',
  props: {
    cart: { type: Array },
    user: { type: Object }
  },
  
  // Hooks
  mounted() {
    this.total = 0;
    for(let i = 0; i < this.cart.length; i++) {
      this.total += this.cart[i].product.price * this.cart[i].quantity;
    }
  },

  data: () => {
    // Varibles
    return {
      // Cart global variables
      total: 0,
      cardNumber: '',

      // Error display
      orderError: false,
      orderErrors: '',

      // SuccessDisplay
      orderSuccess: false,
      orderSuccessMsg: '',

    };
  },
  methods: {
    // Make an order
    async finishOrder() {
      if(!this.checkCardNumber()) {
        this.orderError = true;
        this.orderErrors = "Please enter card number";
        this.orderSuccess = false;
        return;
      } else if(!this.validateCardNumber()) {
        this.orderError = true;
        this.orderErrors = "Card number is invalid";
        this.orderSuccess = false;
        return;
      } else {
        this.orderError = false;
        this.orderSuccess = false;
      }

      try {
        const cart = new Cart();

        const res = await cart.registerOrder(this.cart, this.total, this.user);
        this.orderSuccess = true;
        this.orderSuccessMsg = res.message;

        Bus.$emit('item-in-cart', []);
      } catch(err) {
        console.log(err);
      }
    },

    // Validation methods
    checkCardNumber() {
      return (this.cardNumber.length > 0);
    },
    validateCardNumber() {
      const regex = new RegExp("^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$", "i");
      return (regex.test(this.cardNumber));
    }
  }
}
</script>

<style scoped>
/* Main content */
#cart-content {
  background-color: white;
  margin: 30px 80px;
  min-height: 550px;
  text-align: center;
  padding: 10px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  border: 1px solid rgb(165, 165, 165);
  border-radius: 20px;
}

#cart-table {
  padding: 5px;
  display: grid;
}

#cart-table h2 {
  margin: 10px;
  height: 50px;
}

/* table */
#cart-table table { 
  border: 1px solid rgb(165, 165, 165);
  border-radius: 10px;
  table-layout: auto;
  margin: 5px 50px;
}

#cart-table table tr th, td {
  padding: 5px;
  width: 200px;
  overflow: hidden;
}

#cart-table table tr th:hover {
  background-color: white;
}
/* table  headers */
#cart-table table tr:hover {
  background-color: rgb(231, 231, 231);
}


.message {
  text-align: center;
  font-size: 20px;
  margin-bottom: 15px;
  transition: 1s;
  margin: 100px 200px;
}

.error ul {
  list-style-type: none;
}
.error li {
  font-size: 15px;
}

.error {
    color: rgb(255, 122, 122);
    display: grid;
    grid-template-columns: 1fr;
}

.success {
    color:rgb(0, 255, 0);
    display: grid;
    grid-template-columns: 1fr;
}

 input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

#cart-table input[type=number] {
  padding: 5px 0px 5px 20px;
  border: 1px solid blue;
  border-radius: 10px;
  font-size: 15px;
  transition: 0.5s;
  min-width: 250px;
  max-width:  400px;
  margin:  20px;
  height: 30px;
  overflow: hidden;
}

#cart-table input[type=number]:focus {
  outline: none;
  box-shadow: 0px 0px 5px rgb(115, 115, 255);
}

.finish-btn {
  width: 180px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgb(165, 165, 165);
  background-color: rgb(0, 255, 0);
  font-weight: bold;
  transition: 0.2s;
}

.finish-btn:hover {
  cursor: pointer;
  background-color: rgb(0, 168, 0);
}

.finish-btn:focus {
  outline: none;
}
 
</style>