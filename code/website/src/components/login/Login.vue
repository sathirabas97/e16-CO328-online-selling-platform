<template>
  <div id="login">
    <div id="login-content">
      <!-- Login -->
      <div class="login-page login">
        <h1>Login</h1>
        <!-- Email -->
        <div class="login-field"> 
            <h2>Email</h2>
            <input type="text" placeholder="Type your email" v-model="loginFields.email">
        </div>
        <!-- Password -->
        <div class="login-field"> 
            <h2>Password</h2>
            <input type="password" placeholder="Type your password" v-model="loginFields.password"
            @keyup="sendLoginWithEnter">
        </div>
        <div class="login-field error" v-show="loginErrors && errorDisplay">
            <h3>{{ loginErrors }}</h3>
        </div>
        <router-link to="/login/user" id="login-user"></router-link>
        <router-link to="/login/admin" id="login-admin"></router-link>
        <div class="login-submit"> 
            <input type="button" value="To Enter" @click.stop.prevent="authenticate()" id="login-btn">
        </div>
      </div>
      <!-- Register -->
      <div class="login-page">
        <h1>Registration</h1>
        <div class="cadastro">
          <div class="login-field"> 
              <h2>Name</h2>
              <input type="text" placeholder="Type your name" v-model="registerFields.name">
          </div>
          <div class="login-field"> 
              <h2>Email</h2>
              <input type="text" placeholder="Type your email" v-model="registerFields.email">
          </div>
          <div class="login-field"> 
              <h2>Address</h2>
              <input type="text" placeholder="Type your address" v-model="registerFields.address">
          </div>
          <div class="login-field"> 
              <h2>Telephone</h2>
              <input type="text" placeholder="Type your telephone (+94) xx-xxxxxxx" v-model="registerFields.phone">
          </div>
          <div class="login-field senha"> 
              <h2>Password</h2>
              <input type="password" placeholder="Type your password" v-model="registerFields.password">
          </div>
          <div class="login-field senha"> 
              <h2>Confirm your password</h2>
              <input type="password" placeholder="Confirm your password" v-model="confirmPassword" @keyup="sendRegisterWithEnter">
          </div>
        </div>
        <div class="login-field error" v-show="registerErrors">
            <ul>
              <li v-for="error in registerErrors" :key="error">-> {{ error }}</li>
            </ul>
        </div>
        <div class="login-field success" v-show="registerSuccess.length">
            <h3>{{ registerSuccess }}</h3>
        </div>
        <div class="login-submit"> 
              <input type="button" value="Register" @click="register" id="register-btn" >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Bus from '../bus';

export default {
name: 'Login',
  data() {
    return {
      // Variaveis aqui
      loginFields: {
        email: "",
        password: ""
      },
      registerFields: {
        name: "",
        email: "",
        address: "",
        phone: "",
        password: "",
      },
      confirmPassword: '',
      loginErrors: '',
      registerErrors: [],
      registerSuccess: "",
      user: {},
      logged: false,
      errorDisplay: false,
    };
  },
  methods: {
    // Check the variables to make the login
    async authenticate(event) {
      this.loginErrors = [];
      this.errorDisplay = false;

      // Empty fields
      if(!this.loginFields.email || !this.loginFields.password) {
        this.loginErrors = 'Email or password fields need to be filled in!';
        this.errorDisplay = true;
        return;
      }

      // Get request to AUTHENTICATE the user
      try {
        await axios.get(`http://localhost:8081/customers/authenticate/${this.loginFields.email}/${this.loginFields.password}`)
        .then(response => {
          if(response.data.message) {
            this.loginErrors = response.data.message;
            this.errorDisplay = true;
          } else {
            this.user = response.data.data;
            this.user.token = response.data.token;

            if(this.user) {
              Bus.$emit('logged', this.user);
            }

            // Redirect to user page or admin page
            if(this.user.roles[0] === 'admin') {
              const loginAdmin = document.getElementById('login-admin').click();
            } else {
              const loginUser = document.getElementById('login-user').click();
            }
          }
        });
      } catch(err) {
        console.log(err);
      }     
    },

    // Register a new user
    async register() {
        this.registerErrors = [];
        const data = this.registerFields;
        
        if(data.password != this.confirmPassword) {
          this.registerErrors.push("Confirmed password is different from password");
          return;
        }

        try {
          const url = "http://localhost:8081/customers/";
          const data = this.registerFields;
          const headers = {};
          await axios.post(url, data, headers)
          .then(response => {
            if(response.data.message) {
              this.registerSuccess = response.data.message;
            } else if(response.data[0].message) {
              for(let i = 0; i < response.data.length;i++) { 
                this.registerErrors.push(response.data[i].message);
              }
            }
          });
      } catch(err) {
        console.log(err);
      } 
    },

    sendLoginWithEnter(event) {
      // Change to search page pressing ENTER
      let key = event.which || event.keyCode;
      
      if(key === 13) {
        const btn = document.getElementById('login-btn');
        btn.click(); 
      } 
    },
    sendRegisterWithEnter(event) {
      // Change to search page pressing ENTER
      let key = event.which || event.keyCode;
      
      if(key === 13) {
        const btn = document.getElementById('register-btn');
        btn.click(); 
      } 
    }
  }
}
</script>

<style scoped>
/* Media queries */
  @media (max-width: 1250px) {
    #login-content {
      grid-template-columns: 1fr!important;
    }

    .login-page {
      text-align: center;
    }
  }

  /* Login page content */
  #login-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    padding: 20px;
    background-color: white;
    padding: 30px;
    margin: 50px;
    border: 1px solid rgb(223, 223, 223);
    border-radius: 20px;
  }

  .login-page {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 30px;
    padding: 20px;
    border: 1px solid rgb(192, 192, 192);
    border-radius: 20px;
  }
  .login-page h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  .login-page h2 {
    margin-bottom: 5px;
  }

  .login-page input[type=text], input[type=password] {
    margin-bottom: 20px;
    margin-left: 10px;
    margin-right: 10px;
    min-width: 300px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid rgb(170, 170, 170);
    box-sizing: border-box;
    transition: 0.4s;
  }

  .login-page input[type=text]:focus, input[type=password]:focus {
    outline: none;
    border: 1.5px solid rgb(131, 131, 255);
    box-shadow: 0px 0px 3px rgb(131, 131, 255);
  }

  .login-submit {
    text-align: center;
  }
  .login-page input[type=button] {
    padding: 10px;
    width: 100px;
    border: 1px solid rgb(180, 180, 180);
    background-color: rgb(108, 172, 255);
    border-radius: 10px;
    transition: 0.5s;
    font-weight: bold;
  }

  .login-page input[type=button]:hover {
    cursor: pointer;
    background-color: rgb(65, 145, 250);
    border: 1px solid rgb(0, 0, 0);
    color: white;
  }
  .login-page input[type=button]:focus {
    outline: none;
  }

  /* Register fields */
  .cadastro {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .error {
    text-align: center;
    color: rgb(255, 122, 122);
    font-size: 15px;
    margin-bottom: 15px;
    transition: 1s;
  }

  .success {
    text-align: center;
    color: rgb(80, 255, 138);
    font-size: 15px;
    margin-bottom: 15px;
    transition: 1s;
  }

  ul {
    list-style-type: none;
  }


</style>