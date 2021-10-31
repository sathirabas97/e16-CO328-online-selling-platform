<template>
  <div id="app-products">
    <div id="products-content">
      <!-- Filters -->
      <aside id="filter-menu">
        <!-- ANIMALS -->
        <div class="filter-parent">
          <!-- cachorro -->
          <h2>Animals</h2>
          <div class='filter-child'>
            <input type="checkbox" @click="enableCachorro">
            <h3>Puppy</h3>
          </div>

          <!-- gato -->
          <div class='filter-child'>
            <input type="checkbox" @click="enableGato">
            <h3>Cat</h3>
          </div>

          <!-- passaro -->
          <div class='filter-child'>
            <input type="checkbox" @click="enablePassaro">
            <h3>Bird</h3>
          </div>

          <!-- roedor -->
          <div class='filter-child'>
            <input type="checkbox" @click="enableRoedor">
            <h3>Rodent</h3>
          </div>
        </div>

        <!-- CATEGORY -->
        <div class="filter-parent">
          <h2>Category</h2>

          <!-- racao -->
          <div class='filter-child'>
            <input type="checkbox" @click="enableRacao">
            <h3>Portion</h3>
          </div>

          <!-- acessorio -->
          <div class='filter-child'>
            <input type="checkbox" @click="enableAcessorio">
            <h3>Accessory</h3>
          </div>

          <!-- brinquedo -->
          <div class='filter-child'>
            <input type="checkbox" @click="enableBrinquedo">
            <h3>Toy</h3>
          </div>

          <!-- medicamento -->
          <div class='filter-child'>
            <input type="checkbox" @click="enableMedicamento">
            <h3>Medicine</h3>
          </div>
        </div>
      </aside>

      <!-- Products display-->
      <main id="products-container">  
        <div class="item" 
        v-for="(product, index) in products" 
        :key="product.id" v-show="product.quantity > 0 && product.show">
          <!-- Product information -->
          <img src="/static/img/logos/inimal_logo.jpeg" alt="">
          <h2>{{ product.name }}</h2>
          <h4>{{ product.description }}</h4>
          <h3>Price: ${{ product.price }},00</h3>
          
          <!-- Select quantity -->
          <div v-if="product.status === true">
            <div >
              <div class="flex-input">
                <input type="number" id="quantity" 
                placeholder="The amount" v-model="quantity"/>

                <input type="button" 
                value="Add" 
                @click="addToCart(product._id, index)"
                id="confirm"/>
              </div>

              <!-- No quantity in stock error -->
              <div class="message error" v-if="product.error">
                <ul>
                  <li>ERROR</li>
                  <li>{{productErrors}}</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Add to Cart -->
          <div v-else>
            <input type="button" 
            value="Add to cart" 
            @click="showQuantity(product._id, index)"
            id="add-Cart"/>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Bus from './bus';

export default {
  name: 'Products',
  props: {
    user: { type: Object },
    cart: { type: Array },
  },
  data() {
    return {
      // Variaveis
      products: [],
      displayQuantityFlag: false,
      quantity: '',

      productError: false,
      productErrors: '',

      // Filter 
        // Animal flags
      cachorro: false,
      gato: false,
      passaro: false,
      roedor: false,

        // Category flags
      racao: false,
      acessorio: false,
      brinquedo: false,
      medicamento: false,
    };
  },
  async mounted() { 
    this.getProducts();
  },
  methods: {
    //Request all the products with a GET method
    async getProducts() {
      try {
        await axios
          .get('http://localhost:8081/products')
          .then((response) => {
            this.products = response.data
            for(let i = 0; i < this.products.length; i++) {
              this.products[i].status = false;
              this.products[i].show = true;
            }
          });
      } catch(err) {
        console.log(err);
      }
    },

    // Methods to add products in the Cart
    showQuantity(productId, index) {
      this.products[index].price += 1;
      this.products[index].price -= 1;
      this.products[index].status = true;
    },
    addToCart(productId, index) {
      this.products[index].price += 1;
      this.products[index].price -= 1;

      this.cleanErrors();
      if(this.quantity > this.products[index].quantity)  {
        this.products[index].error = true;
        this.productErrors = 'Quantity in stock: ' + this.products[index].quantity;
        this.quantity = '';
        return;
      }

      this.products[index].status = false;
      this.cart.push({product: this.products[index], quantity: this.quantity});
      this.quantity = '';
      Bus.$emit('item-in-cart', this.cart);
      Bus.$on('save-cart', (value) => {
        this.cart = value;
      });
    },
    cleanErrors() {
      for(let i = 0; i < this.products.length; i++) {
        this.products[i].error = false;
      }
    },

    // Filter methods
      // Enable and disable flags
    enableCachorro() {
      this.cachorro = !this.cachorro;
      this.filterAll();
    },
    enableGato() {
      this.gato = !this.gato;
      this.filterAll();
    },
    enablePassaro() {
      this.passaro = !this.passaro;
      this.filterAll();
    },
    enableRoedor() {
      this.roedor = !this.roedor;
      this.filterAll();
    },
    enableRacao() {
      this.racao = !this.racao;
      this.filterAll();
    },
    enableAcessorio() {
      this.acessorio = !this.acessorio;
      this.filterAll();
    },
    enableBrinquedo() {
      this.brinquedo = !this.brinquedo;
      this.filterAll();
    },
    enableMedicamento() {
      this.medicamento = !this.medicamento;
      this.filterAll();
    },
      // Fiter by the flags
    filterAll() {
      this.filterAnimals();
    },
    filterAnimals() {
      for(let i = 0; i < this.products.length; i++) {
        if(!this.cachorro && !this.gato && !this.passaro && !this.roedor) {
          this.products[i].show = true;
          this.filterCategory(i, true);
        } else {
          if(this.products[i].animal === 'Puppy') {
              this.products[i].show = this.cachorro;
              this.filterCategory(i, this.cachorro);
          }
          if(this.products[i].animal === 'Cat') {
              this.products[i].show = this.gato;
              this.filterCategory(i, this.gato);
          }
          if(this.products[i].animal === 'Bird') {
              this.products[i].show = this.passaro;
              this.filterCategory(i, this.passaro);
          }
          if(this.products[i].animal === 'Rodent') {
              this.products[i].show = this.roedor;
              this.filterCategory(i, this.roedor);
          }
        }
        this.products[i].price += 1;
        this.products[i].price -= 1;
      }
    },
    filterCategory(index, value) {
      if(!this.racao && !this.acessorio && !this.brinquedo && !this.medicamento) {
        return;
      }
      if(this.products[index].category === 'Portion') {
        this.products[index].show = (this.racao && value);
      }
      if(this.products[index].category === 'Accessory') {
        this.products[index].show = (this.acessorio && value);
      }
      if(this.products[index].category === 'Toy') {;
        this.products[index].show = (this.brinquedo && value);
      }
      if(this.products[index].category === 'medicine') {
        this.products[index].show = (this.medicamento && value);
      }
      this.products[index].price += 1;
      this.products[index].price -= 1;
    }
  },
};
</script>

<style scoped>
  #products-content {
    display: grid;
    grid-template-columns: 1fr 4fr;
    position: relative;
    top: 70px;               
  }

  /* Products */
  /* Media queries for products */
  @media (max-width: 1400px) {
    #products-container {
      grid-template-columns: 1fr 1fr 1fr!important;
    }
  }

  @media (max-width: 1150px) {
    #products-container {
      grid-template-columns: 1fr 1fr!important;
    }
  }
  @media (max-width: 870px) {
    #products-container {
      grid-template-columns: 1fr!important;
    }
  }

  #products-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin-left: 20px;
    border-radius: 20px;
    text-align: center;
  }

  #products-container h1 {
    border-radius: 50px;
    background-color: white;
    height: 100px;
    text-align: center;
  }

  .item {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif ;
    margin: 0px 10px 20px 10px;
    width: 230px;
    max-height: 380px;
    background-color: white;
    text-align: center;
    padding: 15px;
    border: 1px solid rgb(170, 170, 170);
    border-radius: 20px;
    box-shadow: 0px 0px 2px black;
    color:rgb(102, 102, 255);
  }

  .item img {
    height: 100px;
    width: 150px;
  }

  .item h2 {
    margin-top: 10px;
    margin-bottom: 10px;
    height: 55px;
    font-size: 15px;
    font-weight: bold;
  }

  .item h4 {
    text-align: left;
    height: 80px;
    font-size: 10px;
    overflow: hidden;
  }
  
  .item h3 {
    text-align: left;
    margin-bottom:10px;
  }

  #add-Cart {
    height: 40px;
    margin: 5px 0px;
    font-weight: bold;
    padding: 5px 10px 5px 10px;
    border: 1px solid rgb(177, 177, 177);
    background-color:rgb(0, 255, 0);
    border-radius: 10px;
    transition: 0.3s;
  }

  #add-Cart:hover {
    cursor:pointer;
    background-color:rgb(0, 160, 0);
    transform: scale(1.05);
  }

  .item input:focus {
    outline: none;
  }

  .flex-input {
    display: flex;
    margin: 10px 15px;
  }

  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Select quantity */
  #quantity {
    width: 100px;
    height: 35px;
    border:1px solid rgb(170, 170, 170);
    text-align: center;
    transition: 0.5s;
  }

  #quantity:focus {
    outline: none;
    box-shadow: 0px 0px 2px black;
  }

  #confirm {
    padding: 5px;
    border:1px solid rgb(170, 170, 170);
    background-color: rgb(0, 255, 0);
    color: white;
    font-weight: bold;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    transition: 0.3s ease-out;
  }

  #confirm:hover {
    cursor: pointer;
    background-color: rgb(0, 160, 0);
  }

  #confirm:focus {
    outline:none;
  }

  /* Filter menu */
  #filter-menu {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    background-color: white;
    max-height: 500px;
    min-height: 500px;
    min-width: 245px;
    max-width: 250px;
    padding: 5px;
    border: 1px solid rgb(177, 177, 177);
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .filter-parent {
    margin: 10px;
  }

  .filter-parent h2 {
    text-align: center;
    padding: 5px;
    margin: 5px;
    border-bottom: 1px solid rgb(177, 177, 177);
  }

  .filter-child {
    padding: 10px 30px;
    display: flex;
  }

  .filter-child input {
    height: 15px;
    width: 15px;
    background-color: blue;
  }

  .filter-child h3 {
    margin: 0px 10px;
    position:relative;
    top: -4px;
  }

.message {
  text-align: center;
  font-size: 20px;
  margin-bottom: 15px;
  transition: 1s;
}

.error ul {
  list-style-type: none;
}
.error li {
  font-size: 15px;
}

.error {
    color: rgb(255, 122, 122);
}
  
</style>