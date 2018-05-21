<template>
  <div id="add-to-cart-body">
    <h2>Product List</h2>
    <product-list></product-list>

    <h3 class="to-cart">To Cart</h3>
    <to-cart-list></to-cart-list>
  </div>
</template>


<script>
import ProductList from './AddToCartBodyProductList.vue'
import ToCartList from './AddToCartBodyToCartList.vue'

export default {
  components:{
    'product-list': ProductList,
    'to-cart-list': ToCartList
  },
  data () {
    return {

    }
  },
  computed: {

  }
}
</script>


<style scoped>
.to-cart {
  margin-top: 2%;
}
</style>
