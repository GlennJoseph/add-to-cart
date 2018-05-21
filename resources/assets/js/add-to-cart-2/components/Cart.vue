<template>
  <div id="cart">
    <h2>Cart</h2>
    <cart-list></cart-list>

  </div>
</template>


<script>
import CartList from './CartList.vue'

export default {
  components: {
    'cart-list': CartList
  },
  data () {
    return {

    }
  },
  computed: {
    isShowed() {
      this.$store.state.isShowed;
    }
  }
}
</script>


<style scoped>
</style>
