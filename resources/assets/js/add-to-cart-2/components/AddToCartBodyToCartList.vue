<template>
  <div id="to-cart-list">
    <table id="table-to-cart" v-if="sumToCart">
      <thead>
        <tr>
          <th>Products</th>
          <th>Quantity</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        <tr class="striped" v-for="single in added">
          <td>{{single.name}}</td>
          <td id="single"><span v-if="single.quantity">{{single.quantity}}</span></td>
          <td>Php{{ single.sum }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td></td>
          <td>Php{{ sumToCart }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>


<script>

export default {
  data () {
    return {

    }
  },
  methods: {

  },
  computed: {
    added() {
      return this.$store.state.added;
    },
    sumToCart() {
      return this.$store.state.sumToCart;
    },
    products() {
      return this.$store.state.products;
    }
  }
}
</script>


<style scoped>
#table-to-cart {
  width: 57%;
}
th, td {
  padding: 1%;
  margin: 1%;
}
.striped {
  height: 60px;
  border-top: 1px solid #B0B0B0;
}
.striped:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
