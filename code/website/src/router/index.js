import Vue from 'vue';
import Router from 'vue-router';

// Components
import MainContent from '@/components/MainApp';
import Products from '@/components/Products';
import Services from '@/components/Services';
import Cart from '@/components/Cart';
import Search from '@/components/Search';
import Login from '@/components/login/Login';
import User from '@/components/login/User';
import Admin from '@/components/login/Admin';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainContent',
      component: MainContent,
    },
    {
      path: '/products',
      name: 'Products',
      component: Products,
    },
    {
      path: '/services',
      name: 'Services',
      component: Services,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
    },
    {
      path: '/login/user',
      name: 'User',
      component: User,
    },
    {
      path: '/login/admin',
      name: 'Admin',
      component: Admin,
    },
  ],
});
