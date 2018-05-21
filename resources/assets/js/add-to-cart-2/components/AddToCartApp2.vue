<template>
  <div id="cart-app">
    <cart-header></cart-header>
    <router-view class="ml-3 mt-3"></router-view>
  </div>
</template>


<script>
import AddCart from './AddToCartBody.vue';
import Cart from './Cart.vue';
import Header from './CartHeader.vue';

export default {
  components:{
    'add-to-cart-body': AddCart,
    'cart': Cart,
    'cart-header': Header
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>


<style>
</style>
