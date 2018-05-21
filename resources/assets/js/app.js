
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'// https://github.com/se-panfilov/mini-toastr

miniToastr.init()

function toast ({title, message, type, timeout, cb}) {
  return miniToastr[type](message, title, timeout, cb)
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}
Vue.use(VueNotifications, options)

import VueRouter from 'vue-router';
Vue.use(VueRouter);
// import Routes from './routes'
import Routes from './add-to-cart-2/router/index'

import { store } from './add-to-cart-2/store/index'

Vue.component('cart-header', require('./add-to-cart-2/components/CartHeader.vue'))
Vue.component('cart-add-body', require('./add-to-cart-2/components/AddToCartBody.vue'));
Vue.component('cart-app', require('./add-to-cart-2/components/AddToCartApp2.vue'));

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

const app = new Vue({
    el: '#app',
    router: router,
    store: store
});
