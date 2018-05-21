<template>
  <div id="product-list">
    <table id="table">
      <thead>
        <tr>
          <th>Products</th>
          <th>Description</th>
          <th>Price</th>
          <th>Quantity</th>
          <th id="add-header"></th>
        </tr>
      </thead>
      <!-- EACH INSTANCE OF PRODUCT MUST BE TIED TO EACH ARRAY -->
      <app-products></app-products>
      <!-- NOT FINAL -->
    </table>
  </div>
</template>


<script>
import Products from './AddToCartBodyProducts.vue'

export default {
  components:{
    'app-products': Products
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
#table {
  width: 85%;
}
th {
  margin: 1%;
}
#add-header {
  width: 10%;
}
</style>
