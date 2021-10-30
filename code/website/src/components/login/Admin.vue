<template>
  <div>
    <main id="user-content">
      <!-- Page not found -->
      <div v-if="!user || user.name === undefined ||
       user.roles[0] !== 'admin'"  id="no-logged">
        <img src="/static/img/icons/error_icon.png" alt="">
        <h1><span>ERROR</span></h1>
        <h3>Page is unavailable, you need to be logged in to access it!</h3>
      </div>

      <!-- User info -->
      <div id="logged" v-else>
        <!-- Data from user -->
        <aside class="user-info" v-if="!configEnable">
          <div class="user-data user-img">
            <img src="/static/img/icons/user_icon.png" alt="">
          </div>
          <div class="information">
          <!-- NAME -->
            <div class="user-data">
              <h2>Name</h2>
              <h3>{{ user.name }}</h3>
            </div>
            <!-- EMAIL -->
            <div class="user-data">
              <h2>Email</h2>
              <h3>{{ user.email }}</h3>
            </div>
            <!-- PHONE -->
            <div class="user-data">
              <h2>Telephone</h2>
              <h3>{{ user.phone }}</h3>
            </div>
            <!-- ADDRESS -->
            <div class="user-data">
              <h2>Address</h2>
              <h3>{{ user.address }}</h3>
            </div>
          </div>
          <!-- CONFIG button -->
          <div class="user-data config"> 
            <a @click.stop.prevent="enableConfig()" class="rotate">
              <img src="/static/img/icons/config_icon.png" alt="">
              settings
            </a>
          </div>
        </aside>
        <!-- User config -->
        <aside class="user-info" v-else>
          <!-- Change image -->
          <div class="user-data user-img config-data">
            <img src="/static/img/icons/user_icon.png" alt="">
            <input id="file-img" type="file" name="file"/>
          </div>
          <!-- User data fields -->
          <div class="information">
            <!-- Change NAME -->
            <div class="user-data config-data">
              <h2>Name</h2>
              <input type="text" placeholder="Enter a new name"
               v-model="updateUserData.name">
            </div>
            <!-- Change EMAIL -->
            <div class="user-data config-data">
              <h2>Email</h2>
              <input type="text" placeholder="Enter a new email"
               v-model="updateUserData.email">
            </div>
            <!-- change PHONE -->
            <div class="user-data config-data">
              <h2>Telephone</h2>
              <input type="text" placeholder="Enter a new phone"
               v-model="updateUserData.phone">
            </div>
            <!-- Change ADDRESS -->
            <div class="user-data config-data">
              <h2>Address</h2>
              <input type="text" placeholder="Enter a new address"
               v-model="updateUserData.address">
            </div>
            <!-- Change PASSWORD -->
              <!-- password -->
            <div class="user-data config-data">
              <h2>Change Password</h2>
              <input type="password" placeholder="Type the password"
              v-model="updateUserData.password">
            </div>
              <!-- confirm password -->
            <div class="user-data config-data">
              <h2>Confirm the Password</h2>
              <input type="password" placeholder="Confirm the Password"
              v-model="confirmPassword">
            </div>
          </div>
          <!-- Display ERROR messages -->
          <div class="error message" v-if="userErrors">
            <ul><li v-for="error in updateUserErrors" :key="error.id">{{ error }}
              </li></ul>
          </div>
          <!-- Display SUCCESS messages -->
          <div class="success message" v-if="updateUserSuccess.length > 0">
            <ul><li>{{updateUserSuccess}}
              </li></ul>
          </div>

          <!-- RETURN button-->
          <div class="user-data config config-data"> 
            <a @click.stop.prevent="enableConfig()">
              <img src="/static/img/icons/return_icon.png" alt="">
              Come back
            </a>
          </div>
          <!-- SAVE button -->
          <div class="user-data config config-data"> 
            <a @click.stop.prevent="updateUser()" class="rotate">
              <img src="/static/img/icons/config_icon.png" alt="">
              Save editions
            </a>
          </div>
        </aside>
        
        <!-- Stock manager -->
        <aside id="stock-manager">
          <!-- make user an admin -->
          <div id="put-admin" class="stock-content"
          v-if="!productManager && !earnScreen && !serviceManager">
            <!-- make ADMIN -->
            <h2>Make a user an administrator</h2>
            <div>
              <input type="text" placeholder="Enter user email"
              v-model="putAdminEmail">
              <h6>If the user is already an admin you will remove his status</h6>
              <div class="message success" v-if="putAdminSuccessFlag">
                <h5>{{ putAdminMsg }}</h5>
              </div>
              <div class="message error" v-if="putAdminErrorFlag">
                <h5>{{ putAdminError }}</h5>
              </div>
              <div class="user-data config config-data"> 
                <a @click.stop.prevent="putAdmin()" class="rotate">
                  <img src="/static/img/icons/config_icon.png" alt="">
                  make administrator
                </a>
              </div>
            </div>
          </div>

          <!-- LINKS to other pages -->
          <div id="links" class="stock-content"
          v-if="!productManager && !earnScreen && !serviceManager">
            <div class="user-data config config-data"> 
              <a @click.stop.prevent="enableProductManager()">
                <img src="/static/img/icons/product_icon.png" alt="">
                  Manage products
              </a>
            </div>
            <div class="user-data config config-data"> 
              <a @click.stop.prevent="enableServiceManager()">
                <img src="/static/img/icons/service_icon.png" alt="">
                  Manage services
              </a>
            </div>
            <div class="user-data config config-data"> 
              <a @click.stop.prevent="enableEarnScreen()">
                <img src="/static/img/icons/earn_icon.png" alt="">
                  Earnings table
              </a>
            </div>
          </div>

          <!-- PRODUCT manager -->
          <div id="product-manager" class="stock-content scroll"
          v-if="productManager && !earnScreen && !serviceManager">
            <!-- page title -->
            <h1>Product Management</h1>

            <!-- Go back link -->
            <div class="user-data config config-data"> 
              <a @click.stop.prevent="enableProductManager()">
                <img src="/static/img/icons/return_icon.png" alt="">
                  Come back
              </a>
            </div>
            
            <!-- ADD product -->
            <div id="add-product">
              <h2 style="margin:10px; text-decoration:underline;">Add Product</h2>
              <input type="file" name="file">
              <div class="manager-item">
                <input type="text" placeholder="Product's name" v-model="postProduct.name">
                <input type="text" placeholder="Product slug (eg: product-name)" v-model="postProduct.slug">
                <input type="text" placeholder="Product description" v-model="postProduct.description">
                <input type="number" placeholder="Product price (eg: 99.99)" v-model="postProduct.price">
                <input type="number" placeholder="Product quantity (eg: 10)" v-model="postProduct.quantity">
                <select v-model="postProduct.animal">
                  <option disabled selected hidden>Select an animal</option>
                  <option>Puppy</option>
                  <option>Cat</option>
                  <option>Bird</option>
                  <option>Rodent</option>
                </select>
                <select v-model="postProduct.category">
                  <option disabled selected hidden>Select a category</option>
                  <option>Portion</option>
                  <option>Accessory</option>
                  <option>Toy</option>
                  <option>Medicine</option>
                </select>
              </div>
              <!-- Display ERROR messages -->
              <div class="error message" v-if="postProductError">
                <ul>
                  <li v-for="error in postProductErrors" :key="error.id">
                    {{ error }}
                  </li>
                </ul>
              </div>
              <!-- Display SUCCESS messages -->
              <div class="success message" v-if="postProductSuccess">
                <ul>
                  <li>
                    {{ postProductMsg }}
                  </li>
                </ul>
              </div>
              <div class="user-data config config-data"> 
                <a @click.stop.prevent="postProductFunc()">
                  <img src="/static/img/icons/add_icon.png" alt=""
                  style="height: 20px;width:20px;">
                  Add
                </a>
              </div>
            </div>

            <!-- UPDATE product -->
            <div id="update-product">
              <h2 style="margin:10px; text-decoration:underline;">Update Product</h2>
              <input type="text" placeholder="ID of the product you would like to change" v-model="putProduct.id">
              <input type="file" name="file" style="margin-top: 10px;">
              <div class="manager-item">
                <input type="text" placeholder="Product's name" v-model="putProduct.name">
                <input type="text" placeholder="Product slug (eg: product-name)" v-model="putProduct.slug">
                <input type="text" placeholder="Product description" v-model="putProduct.description">
                <input type="number" placeholder="Product price (eg: 99.99)" v-model="putProduct.price">
                <input type="number" placeholder="Product quantity (eg: 10)" v-model="putProduct.quantity">
              </div>
              <!-- Display ERROR messages -->
              <div class="error message" v-if="putProductError">
                <ul>
                  <li v-for="error in putProductErrors" :key="error.id">
                    {{ error }}
                  </li>
                </ul>
              </div>
              <!-- Display SUCCESS messages -->
              <div class="success message" v-if="putProductSuccess">
                <ul>
                  <li>
                    {{ putProductMsg }}
                  </li>
                </ul>
              </div>
              <div class="user-data config config-data"> 
                <a @click.stop.prevent="putProductFunc()">
                  <img src="/static/img/icons/update_icon.png" alt=""
                  style="height: 20px;width:20px;">
                  Update
                </a>
              </div>
            </div>

            <!-- DELETE product -->
            <div id="delete-product">
              <h2 style="margin:10px; text-decoration:underline;">Remove Product</h2>
              <input type="text" placeholder="ID of the product you would like to remove" v-model="deleteProduct.id">
              <!-- Display ERROR messages -->
              <div class="error message" v-if="deleteProductError">
                <ul>
                  <li v-for="error in deleteProductErrors" :key="error.id">
                    {{ error }}
                  </li>
                </ul>
              </div>
              <!-- Display SUCCESS messages -->
              <div class="success message" v-if="deleteProductSuccess">
                <ul>
                  <li>
                    {{ deleteProductMsg }}
                  </li>
                </ul>
              </div>
              <div class="user-data config config-data"> 
                <a @click.stop.prevent="deleteProductFunc()" style="color:red;">
                  <img src="/static/img/icons/rmv_icon.png" alt=""
                  style="height: 20px;width:20px;">
                  To remove
                </a>
              </div>
            </div>
          </div>

          <!-- SERVICE manager -->
          <div id="service-manager" class="stock-content scroll"
          v-if="!productManager && !earnScreen && serviceManager">
            <!-- page title -->
            <h2>Service Management</h2>

            <!-- Go back link -->
            <div class="user-data config config-data"> 
              <a @click.stop.prevent="enableServiceManager()">
                <img src="/static/img/icons/return_icon.png" alt="">
                  Come back
              </a>
            </div>

            <!-- ADD product -->
            <div id="add-service">
              <h2 style="margin:10px; text-decoration:underline;">Add Service</h2>
              <input type="file" name="file">
              <div class="manager-item">
                <input type="text" placeholder="Service Name" v-model="postService.name">
                <input type="text" placeholder="Service description" v-model="postService.description">
                <input type="text" placeholder="Responsible for the service" v-model="postService.partner">
                <input type="number" placeholder="Service price (eg: 99.99)" v-model="postService.price">
              </div>
              <!-- Display ERROR messages -->
              <div class="error message" v-if="postServiceError">
                <ul>
                  <li v-for="error in postServiceErrors" :key="error.id">
                    {{ error }}
                  </li>
                </ul>
              </div>
              <!-- Display SUCCESS messages -->
              <div class="success message" v-if="postServiceSuccess">
                <ul>
                  <li>
                    {{ postServiceMsg }}
                  </li>
                </ul>
              </div>
              <div class="user-data config config-data"> 
                <a @click.stop.prevent="postServiceFunc()">
                  <img src="/static/img/icons/add_icon.png" alt=""
                  style="height: 20px;width:20px;">
                  Add
                </a>
              </div>
            </div>

            <!-- UPDATE product -->
            <div id="update-service">
              <h2 style="margin:10px; text-decoration:underline;">Update Service</h2>
              <input type="text" placeholder="ID of the service you would like to change" v-model="putService.id">
              <input type="file" name="file" style="margin-top: 10px;">
              <div class="manager-item">
                <input type="text" placeholder="Service Name" v-model="putService.name">
                <input type="text" placeholder="Service description" v-model="putService.description">
                <input type="text" placeholder="Responsible for the service" v-model="putService.partner">
                <input type="number" placeholder="Service price (eg: 99.99)" v-model="putService.price">
              </div>
              <!-- Display ERROR messages -->
              <div class="error message" v-if="putServiceError">
                <ul>
                  <li v-for="error in putServiceErrors" :key="error.id">
                    {{ error }}
                  </li>
                </ul>
              </div>
              <!-- Display SUCCESS messages -->
              <div class="success message" v-if="putServiceSuccess">
                <ul>
                  <li>
                    {{ putServiceMsg }}
                  </li>
                </ul>
              </div>
              <div class="user-data config config-data"> 
                <a @click.stop.prevent="putServiceFunc()">
                  <img src="/static/img/icons/update_icon.png" alt=""
                  style="height: 20px;width:20px;">
                  Update
                </a>
              </div>
            </div>

            <!-- DELETE product -->
            <div id="delete-service">
              <h2 style="margin:10px; text-decoration:underline;">Remove Service</h2>
              <input type="text" placeholder="ID of the service you would like to remove" v-model="deleteService.id">
              
              <!-- Display ERROR messages -->
              <div class="error message" v-if="deleteServiceError">
                <ul>
                  <li v-for="error in deleteServiceErrors" :key="error.id">
                    {{ error }}
                  </li>
                </ul>
              </div>
              <!-- Display SUCCESS messages -->
              <div class="success message" v-if="deleteServiceSuccess">
                <ul>
                  <li>
                    {{ deleteServiceMsg }}
                  </li>
                </ul>
              </div>
              <div class="user-data config config-data"> 
                <a @click.stop.prevent="deleteServiceFunc()" style="color:red;">
                  <img src="/static/img/icons/rmv_icon.png" alt=""
                  style="height: 20px;width:20px;">
                  To remove
                </a>
              </div>
            </div>
          </div>

          <!-- EARN screen -->
          <div id="earn-screen" class="stock-content scroll"
          v-if="!productManager && earnScreen && !serviceManager">
            <!-- page title -->
            <h2>Earnings table</h2>
            <!-- Go back link -->
            <div class="user-data config config-data"> 
              <a @click.stop.prevent="enableEarnScreen()">
                <img src="/static/img/icons/return_icon.png" alt="">
                  Come back
              </a>
            </div>
            <div id="input-date">
              <h2 style="margin:10px; text-decoration:underline;">Enter the date you would like to view</h2>
              <div class="date-items">
                <!-- Input day -->
                <div class="date-input">
                  <h5>Day</h5>
                  <input type="number" placeholder="Enter the day" v-model="date.day">
                </div>

                <!-- Input month -->
                <div class="date-input">
                  <h5>Month</h5>
                  <input type="number" placeholder="Enter the month" v-model="date.month">
                </div>

                <!-- Input year -->
                <div class="date-input">
                  <h5>Year</h5>
                  <input type="number" placeholder="Enter the year" v-model="date.year">
                </div>

                <!-- Display errors -->
                <div class="error message" v-if="earnScreenError">
                  <ul>
                    <li v-for="error in earnScreenErrors" :key="error.id">
                      {{ error }}
                    </li>
                  </ul>
                </div>

                <!-- Search link -->
                <div class="user-data config config-data" style="margin:10px 0px;"> 
                  <a @click.stop.prevent="searchEarnScreen()">
                    <img src="/static/img/icons/search_icon.png" alt=""
                    style="height: 20px;width:20px;">
                    Search
                  </a>
                </div>

                <!-- Earn table -->
                <div id="earn-table" v-if="showTable === true">
                  <h2>Earnings on : {{date.day}} / {{date.month}} / {{date.year}}</h2>
                  <table>
                    <tr>
                      <th>Client</th>
                      <th>Purchase amount</th>
                      <th>Time of purchase</th>
                      <th>Request number</th>
                    </tr>
                    <tr v-for="order in earnScreenData" :key="order._id">
                      <td>{{order.customer.name}}</td>
                      <td>${{order.totalPrice}},00</td>
                      <td>{{order.hour}}</td>
                      <td>{{order.number}}</td>
                    </tr>
                  </table>
                  <h3 style="margin: 25px;">Total: ${{totalEarned}}</h3>
                </div> 
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script>
'use strict'
import Bus from '../bus';
import User from '../../scripts/user/user-config';
import Admin from '../../scripts/admin/admin-config';

export default {
  name: 'User',
  props: {
    user: { type: Object }
  },
  data() {
    return {
      // Flags
      configEnable: false,
      
      // Update user data
      confirmPassword: '',
      updateUserData: {},
      updateUserErrors: [],
      updateUserSuccess: [],
      userErrors: false,

      // Admin(make an user an admin)
      putAdminEmail: '',
      removeAdminEmail: '',
      putAdminMsg: '',
      putAdminSuccessFlag: false,
      putAdminErrorFlag: false,
      putAdminError: '',

      // Flags
      productManager: false,
      serviceManager: false,
      earnScreen: false,
      
      // PRODUCT
      // Post product;
      postProduct: {
        category: 'Selecione uma categoria',
        animal: 'Selecione um animal'
      },
      postProductMsg: '',
      postProductErrors: [],
      postProductSuccess: false,
      postProductError: false,

      // Put product;
      putProduct: {},
      putProductMsg: '',
      putProductErrors: [],
      putProductSuccess: false,
      putProductError: false,

      // Delete product
      deleteProduct: {},
      deleteProductMsg: '',
      deleteProductErrors: [],
      deleteProductSuccess: false,
      deleteProductError: false,

      // SERVICE 
      // Post service;
      postService: {},
      postServiceMsg: '',
      postServiceErrors: [],
      postServiceSuccess: false,
      postServiceError: false,

      // Put service;
      putService: {},
      putServiceMsg: '',
      putServiceErrors: [],
      putServiceSuccess: false,
      putServiceError: false,

      // Delete service;
      deleteService: {},
      deleteServiceMsg: '',
      deleteServiceErrors: [],
      deleteServiceSuccess: false,
      deleteServiceError: false,

      // Earn Screen
      date: {},
      earnScreenErrors: [],
      earnScreenError: false,
      earnScreenData: {},
      showTable: false,
      totalEarned: 0,

    }
  },
  methods: {
    // Change screens methods
    enableConfig() {
      this.configEnable = !this.configEnable;
      this.updateUserErrors =  [];
      this.updateUserSuccess = [];
      this.userErrors = false;
    },
    cleanProductManagerVariables() {
      // Cleaning product field
      this.postProductSuccess = false;
      this.postProductError = false;
      this.postProduct = {
        category: 'Select a category',
        animal: 'Select an animal'
      };

      this.putProductSuccess = false;
      this.putProductError = false;
      this.putProduct = {};

      this.deleteProductSuccess = false;
      this.deleteProductError = false;
      this.deleteProduct = {};
    },
    cleanServiceManagerVariables() {
      // Cleaning service field
      this.postServiceSuccess = false;
      this.postServiceError = false;
      this.postService = {};

      this.putServiceSuccess = false;
      this.putServiceError = false;
      this.putService = {};

      this.deleteServiceSuccess = false;
      this.deleteServiceError = false;
      this.deleteService = {};
    },
    cleanEarnScreenVariables() {
      this.earnScreenErrors = [];
      this.earnScreenData = [],
      this.earnScreenError = false;
      this.showTable = false;
      this.date = {};
    },
    cleanManagerVariables() {
      this.cleanProductManagerVariables();
      this.cleanServiceManagerVariables();
      this.cleanEarnScreenVariables();
    },
    enableProductManager() {
      this.productManager = !this.productManager;
      this.cleanManagerVariables();
    },
    enableServiceManager() {
      this.serviceManager = !this.serviceManager;
      this.cleanManagerVariables();
    },
    enableEarnScreen() {
      this.earnScreen = !this.earnScreen;
      this.cleanManagerVariables();
    },

    // User methods
    async updateUser() {
      // Cleaning variables
      const user = new User();
      user.clear();
      this.updateUserErrors =  [];
      this.updateUserSuccess = [];
      this.userErrors = false;

      // Checking if the passwords are equal
      if(this.updateUserData.password) {
        if(this.updateUserData.password != this.confirmPassword) {
          this.updateUserErrors[0] = 'The passwords are different!';
          this.userErrors = true;
          return;
        }
      }

      try {
        // Update user data('res' keeps the new user information)
        const res = await user.updateUserData(this.updateUserData, 
                                        this.user._id, this.user.token);
        // If there is any error in the data 
        if(res.status === 1) {
          for(let i = 0; i < res.data.length; i++) {
            this.updateUserErrors[i] = res.data[i].message;
            this.userErrors = true;
          }
        } else {  // No error
          this.updateUserSuccess = res.data.message;
          this.user = res.user;
          
          // Clean the interface fields and emit the new user data to other components
          this.cleanUserVariables();
          Bus.$emit('logged', this.user);
        }
      } catch(err) {
        console.log(err);
      }
    },
    cleanUserVariables() {
      // Clean every user fields in the interfece by reativity
      this.updateUserData.name = '';
      this.updateUserData.phone = '';
      this.updateUserData.email = '';
      this.updateUserData.address = '';
      this.updateUserData.password = '';
      this.confirmPassword = '';
    },

    // Make an user an admin
    async putAdmin() {
      const admin = new Admin();

      if(!this.putAdminEmail) {
        this.putAdminErrorFlag = true;
        this.putAdminSuccessFlag = false;
        this.putAdminError = 'The email field is blank.';
        return;
      }

      try {
        const res = await admin.putAdmin(this.putAdminEmail, this.user.token);
        if(res != null) {
          if(res.data.message === 'User not found') {
            this.putAdminErrorFlag = true;
            this.putAdminSuccessFlag = false;
            this.putAdminError = res.data.message;
          } else {
            this.putAdminSuccessFlag = true;
            this.putAdminErrorFlag = false;
            this.putAdminMsg = res.data.message;
            this.putAdminEmail = '';
          }
        }
      } catch(err) {
        console.log(err);
      }
    }, 

    // Stock Manager
    // Product
      // POST product
    async postProductFunc() {
      const admin = new Admin();
      this.postProductError = false;
      this.postProductSuccess = false;
      try {
        // Parse number variables
        this.postProduct.price = parseInt(this.postProduct.price, 10);
        this.postProduct.quantity = parseInt(this.postProduct.quantity, 10);

        // Make the post
        const res = await admin.postProduct(this.postProduct, this.user.token);
        if(res.status === 0) {
          this.postProductMsg = res.data;
          this.postProductError = false;
          this.postProductSuccess = true;
        } else {
          this.postProductErrors = res.data;
          this.postProductError = true;
          this.postProductSuccess = false;
        }
      } catch(err) {
        console.log(err); 
      }
    },
      // PUT product
    async putProductFunc() {
      const admin = new Admin();

      this.putProductError = false;
      this.putProductSuccess = false;

      if(!this.putProduct.id) {
        this.putProductErrors[0] = 'No ID was entered';
        this.putProductError = true;
        this.putProductSuccess = false;
        return;
      }

      try {
        // Parse number variables
        this.putProduct.price = parseInt(this.putProduct.price, 10);
        this.putProduct.quantity = parseInt(this.putProduct.quantity, 10);

        // Make the post
        const res = await admin.putProduct(this.putProduct, this.user.token);
        if(res.status === 0) {
          this.putProductMsg = res.data;
          this.putProductError = false;
          this.putProductSuccess = true;
        } else {
          this.putProductErrors = res.data;
          this.putProductError = true;
          this.putProductSuccess = false;
        }
      } catch(err) {
        console.log(err); 
      }
    },
      // DELETE product
    async deleteProductFunc() {
      const admin = new Admin();

      this.deleteProductError = false;
      this.deleteProductSuccess = false;

      if(!this.deleteProduct.id) {
        this.deleteProductErrors[0] = 'No ID was entered';
        this.deleteProductError = true;
        this.deleteProductSuccess = false;
        return;
      }

      try {
        // Make the post
        const res = await admin.deleteProduct(this.deleteProduct, this.user.token);
        if(res.status === 0) {
          this.deleteProductMsg = res.data;
          this.deleteProductError = false;
          this.deleteProductSuccess = true;
        } else {
          this.deleteProductErrors = res.data;
          this.deleteProductError = true;
          this.deleteProductSuccess = false;
        }
      } catch(err) {
        console.log(err); 
      }
    },

    // Service
      // POST service
    async postServiceFunc() {
      const admin = new Admin();

      this.postServiceError = false;
      this.postServiceSuccess = false;
          
      try {
        // Parse number variables
        this.postService.price = parseInt(this.postService.price, 10);

        // Make the post
        const res = await admin.postService(this.postService, this.user.token);
        if(res.status === 0) {
          this.postServiceMsg = res.data;
          this.postServiceError = false;
          this.postServiceSuccess = true;
        } else {
          this.postServiceErrors = res.data;
          this.postServiceError = true;
          this.postServiceSuccess = false;
        }
      } catch(err) {
        console.log(err); 
      }
    },
      // PUT service
    async putServiceFunc() {
      const admin = new Admin();

      this.putServiceError = false;
      this.putServiceSuccess = false;

      if(!this.putService.id) {
        this.putServiceErrors[0] = 'No ID was entered';
        this.putServiceError = true;
        this.putServiceSuccess = false;
        return;
      }

      try {
        // Parse number variables
        this.putService.price = parseInt(this.putService.price, 10);

        // Make the post
        const res = await admin.putService(this.putService, this.user.token);
        if(res.status === 0) {
          this.putServiceMsg = res.data;
          this.putServiceError = false;
          this.putServiceSuccess = true;
        } else {
          this.putServiceErrors = res.data;
          this.putServiceError = true;
          this.putServiceSuccess = false;
        }
      } catch(err) {
        console.log(err); 
      }
    },
      // DELETE service
    async deleteServiceFunc() {
      const admin = new Admin();

      this.deleteServiceError = false;
      this.deleteServiceSuccess = false;

      if(!this.deleteService.id) {
        this.deleteServiceErrors[0] = 'No ID was entered';
        this.deleteServiceError = true;
        this.deleteServiceSuccess = false;
        return;
      }

      try {
        // Make the delete
        const res = await admin.deleteService(this.deleteService, this.user.token);
        if(res.status === 0) {
          this.deleteServiceMsg = res.data;
          this.deleteServiceError = false;
          this.deleteServiceSuccess = true;
        } else {
          this.deleteServiceErrors = res.data;
          this.deleteServiceError = true;
          this.deleteServiceSuccess = false;
        }
      } catch(err) {
        console.log(err); 
      }
    },

    // Earn Screen
    async searchEarnScreen() {
      const date = this.date;
      if(!date.day || !date.month || !date.year) {
        this.earnScreenError = true;
        this.showTable = false;
        this.earnScreenErrors = ["The DAY, MONTH and YEAR fields must be filled in!"];
        return;
      }

      try {
        const admin = new Admin();
        const res = await admin.getEarnScreen(date, this.user.token);
        if(res.status === 1) {
          this.earnScreenError = true;
          this.earnScreenErrors[0] = res.data;
          this.showTable = false;
        } else {
          this.earnScreenError = false;
          this.earnScreenData = res.data;
          this.showTable = true;

          this.totalEarned = 0;
          for(let i = 0; i < this.earnScreenData.length; i++) {
            this.totalEarned += this.earnScreenData[i].totalPrice;
          }
        }
      } catch(err){
        console.log(err);
      }

    }
  }
}
</script>

<style scoped>
/* Media queries */
@media (max-width: 1050px) {
  #logged {
    display: grid;
    grid-template-columns: 4fr!important;
  }
  .change-password {
    display: grid;
    grid-template-columns: 1fr 1fr!important;
  }

  .config {
    text-align: center;
  }

  .information {
    display:grid;
    grid-template-columns: 1fr 1fr; 
  }
  
  .user-info {
    border-right: none!important;
    border-bottom: 2px solid rgb(179, 179, 179);
    padding: 20px 40px!important;
    margin: 0px 20px;
  }

  .user-data {
    margin:  0px 10px!important;
    padding: 0px 20px;
  }
}

@media (max-width: 710px) {
  .config a {
    font-size: 15px!important;
    margin: 10px!important;
  }
}

/* General config */
#user-content {
  background-color: white;
  margin: 30px 100px 20px 100px;
  border: 1px solid rgb(179, 179, 179);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 10px;
}
  /* error msg */
#no-logged {
  color: red;
  text-align: center;
  height: 80vh;
}

span {
  font-size: 50px;
}
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* User display condig */
#logged {
  display: grid;
  grid-template-columns: 2fr 4fr;
}

.user-info {
  display: grid;
  border-right: 1px solid rgb(179, 179, 179);
  padding: 30px;
  min-width: 280px;
}

.user-data h3, input[type=text],
 input[type=password], select, input[type=number] {
  padding: 5px 0px 5px 20px;
  border: 1px solid blue;
  border-radius: 10px;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 10px;
  transition: 0.5s;
}

.user-data h2 {
  font-size: 15px;
}

input[type=text], input[type=password],
 select, input[type=number] {
  height: 30px;
  width: 100%;
  margin: 5px 0px 5px 0px;
}

input[type=text]:focus, input[type=password]:focus,
 select:focus, input[type=number]:focus {
  outline: none;
  box-shadow: 0px 0px 5px rgb(115, 115, 255);
}

.user-img {
  text-align: center;
}
.user-img img {
  text-align: center;
  height: 150px;
  width: 150px;
  padding: 10px;
  background-color: white;
  border: 1px solid  blue;
  border-radius: 50%;
}


/* User configuration display */
.config {
  margin-top: 20px;
  text-align: center;
}

.config img {
  height: 25px;
  width: 25px;
  margin-right: 5px;
  position: relative;
  top:5px;
  transition: 3s;
}

.config a {
  font-size: 15px;
  text-decoration: none;
  color: rgb(107, 107, 206);
  transition: 0.5s;
  margin: 0px 30px;
}

.config a:hover {
  text-decoration: underline;
  cursor: pointer;
}

.rotate:hover img{
  transform: rotate(360deg);
}

.config-data {
  font-size: 10px;
  margin: 0px 10px 0px 0px;
}

.change-password {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/* Stock information display */
input[type="file"] {
  margin-bottom: 10px;
  overflow: hidden;
  width: 120px;
}

/* Pet grid display */
/* Scroll bar css */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgb(177, 177, 177);
  border-radius: 5px;
}


/* Messages from the server */
.message {
  text-align: center;
  font-size: 20px;
  margin-bottom: 15px;
  transition: 1s;
}

.error ul, .success ul {
  list-style-type: none;
}
.error li, .succes li {
  font-size: 15px;
}

.error {
    color: rgb(255, 122, 122);
}
.success {
    color: rgb(80, 255, 138);
}

/* Stock config */
.stock-content {
  text-align: center;
  padding: 20px 30px;
}

.stock-content h1 {
  padding-bottom: 10px;
}

.stock-content h2 {
  font-size: 15px;
  padding-top: 10px;
  border-top: 1px solid rgb(179, 179, 179);
}

#put-admin {
  border-bottom: 1px solid rgb(179, 179, 179);
}

#put-admin h2{
  margin: 0px 0px 10px 0px;
}

#put-admin input {
  margin: 5px 100px;
  width: 300px;
  padding: 0px;
  text-align: center;
}
#put-admin h6 {
  font-size: 10px;
  font-weight: 150;
  color:rgb(179, 179, 179);
}


.manager-item {
  padding:5px;
  margin: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

input, select {
  overflow: hidden;
}
.manager-item input, select {
  min-width: 250px;
}


#links {
  margin: 100px 0px;
}

#links a {
  font-size: 20px;
}

.scroll {
  max-height: 530px;
  overflow-y: scroll;
}

.date-items {
  display: grid;
}


.date-input h5 {
  text-align: center;
}

.date-input input {
  max-width: 200px;
}

#earn-table {
  margin: 10px;
  text-align: center;
}

#earn-table h2 {
  margin: 10px;
}

/* table */
#earn-table table { 
  border: 1px solid rgb(165, 165, 165);
  border-radius: 10px;
  table-layout: auto;
  min-width: 510px;
}
#earn-table table tr th, td {
  padding: 5px;
  width: 200px;
  overflow: hidden;
}
#earn-table table tr th:hover {
  background-color: white;
}
/* table  headers */
#earn-table table tr:hover {
  background-color: rgb(231, 231, 231);
}

</style>