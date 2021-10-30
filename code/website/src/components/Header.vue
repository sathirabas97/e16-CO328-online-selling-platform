<template>
  <div id="app-header">
    <header class="main-header">
      <!-- LOGO -->
      <div class="logo">
        <router-link to="/">
          <img src="/static/img/logos/inimal_logo.jpeg" alt="">
        </router-link>
        
      </div>

      <!-- SEARCH box -->
      <div class="search-box">
        <input type="text" placeholder="What are you looking for?" v-model="search"
        @keyup="searchFor">
        <routerLink to="/search" id="search-btn"></routerLink>
      </div>

      <!-- LINKS to other pages -->
      <div class="links">
        <!-- Products -->
        <div class="link">
          <router-link to="/products">Products</router-link>
        </div>

        <!-- Services -->
        <div class="link">
          <router-link to="/services">Services</router-link>
        </div>

        <!-- Login icon when user is not logged -->
        <div class="link" v-if="user.name === undefined">
          <router-link to="/login">Login</router-link>
        </div>

        <!-- User info and link to user page when user is logged -->
        <div class="link user" v-else>
          <div class="user-header">
            <router-link to="/login/user" v-if="user.roles[0] === 'user'">
              <h1>{{user.name}}</h1>
              <h3>{{user.email}}</h3>
            </router-link>
            <router-link to="/login/admin" v-else>
              <h1>{{user.name}}</h1>
              <h3>{{user.email}}</h3>
            </router-link>
            <router-link to="/" id="to-home-page"></router-link>
            <a @click.stop.prevent="logOut()" class="logout">Log Out</a>
          </div>
        </div>

        <!-- CART logo and link -->
        <div class="Cart">
          <router-link to="/Cart">
            <img src="/static/img/icons/carrinho_icon.png" alt="">
          </router-link>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import Bus from './bus'

export default {
  name: 'Header',
  data() {
    return {
      // Variables
      search: '',
      user: {},
    };
  },

  // Hooks
  mounted() {
    Bus.$on('logged', (value) => {
      this.user = value;
    });
  },
  methods: {
    // Search box method
    searchFor(event) {
      // Change to search page pressing ENTER
      let key = event.which || event.keyCode;
      
      if(key === 13) {
        if(this.search) {
          Bus.$emit('search', this.search);
          const btn = document.getElementById('search-btn');
          btn.click();
        }
      } 
    },

    // logout the user
    logOut() {
      // Cleaning user data to share to other pages
      this.user = {};
      this.user.name = undefined;

      Bus.$emit('logged', this.user);
      const homeBtn = document.getElementById('to-home-page').click();
    },
  },
};
</script>

<style scoped>
/* Responsive header */
@media (max-width: 1075px) {
  .main-header {
    grid-template-columns: 1fr!important;
    grid-template-rows: 10vh 10vh 10vh;
    text-align: center;
   }
   .links {
      grid-row-start: 3;
      grid-row-end: 4;
   }
   .search-box {
      grid-row-start: 2;
      grid-row-end: 3;
   }
   .logo {
     grid-column-start: 1;
     grid-column-end: 2;
   }

   .user {
     padding-left: 0px!important;
     padding-right: 0px!important;
     position: relative;
   }
   .user-header {
     padding: 0px!important;
     margin: 0px!important;
   }
}

@media (max-width: 1025px) {
  .user-header h3 {
    display: none;
  }
}

/* Header general config */
#app-header {
  box-sizing: border-box;
  background-color: yellow;
}
.main-header {
  display: grid;
  grid-template-columns: 1fr 2fr 3fr;
}

/* Search box */
.search-box {
  text-align: left;
  box-sizing: border-box;
  padding-top: 10px;
  padding-bottom: 15px;
  padding-left: 20px;
  padding-right: 20px; 
}

.search-box input {
  height: 35px;
  width: 100%;
  padding-left: 15px;
  border-radius: 10px;
  border:none;
  box-shadow: 0px 0px 5px black;
  position: relative;
  top: 15px;
  transition: 0.5s;
}

.search-box input:focus {
  outline: none;
  border: 2px solid rgb(137, 137, 255);
  box-shadow: 0px 0px 10px rgb(137, 137, 255);
}

/* Links to  other pages */
.links {
  display: flex;
}

.link, .Cart {
  padding: 10px;
  margin: 20px 40px 10px 40px;
}

.link a { 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: blue;
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
  transition: 0.2s;
}

.link a:hover {
  color:rgb(138, 138, 255);
  text-decoration: underline;
}

/* Page logo */
.logo {
  margin-top: 10px;
}

.logo  img {
  height: 70px;
  width: 200px;
  margin-left: 15px;
  box-sizing: border-box;
}

/* Cart logo */
.Cart {
  position:relative;
  top: -10px;
  box-sizing: border-box;
}

.Cart img {
  height: 40px;
  width: 40px;
  transition: 0.2s;
}

.Cart img:hover {
  border-bottom: 2px solid blue;
  transform: rotate(-30deg);
  cursor:pointer;
}

#to-home-page {
  position: relative;
  left: 1000px;
}

/* User informations in the header */
.user {
  display: grid;
  margin: 0px;
}
.user-header {
  position: relative;
  text-align: center;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 10px;
  padding-bottom: 10px;
  margin-bottom: 5px;
}
.user-header a {
  font-size: 8px;
  padding: 0;
  margin: 0;
}

.user-header a:hover {
  cursor: pointer;
}

.user-header .logout {
  position:relative;
  top:5px;
  padding-left: 10px;
  font-size: 12px;
  padding-right: 10px;
  border: 1px solid blue;
  border-radius: 10px;
  transition: 0.5s;
}

.user-header .logout:hover {
  background-color: blue;
  color: white;
}

</style>
