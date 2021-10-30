import Vue from "vue";
import App from "./App";
import router from "./router";

// Components
import Header from "./components/Header";
import Products from "./components/Products";
import MainContent from "./components/MainApp";
import Services from "./components/Services";
import Cart from "./components/Cart";
import Search from "./components/Search";
import Login from "./components/login/Login";
import User from "./components/login/User";
import Admin from "./components/login/Admin";

// Components initializer
Vue.component("app-main-content", MainContent);
Vue.component("app-header", Header);
Vue.component("app-products", Products);
// Vue.component('app-services', Services);
Vue.component("app-login", Login);
Vue.component("app-user", User);
Vue.component("app-admin", Admin);
Vue.component("app-cart", Cart);
Vue.component("app-search", Search);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
