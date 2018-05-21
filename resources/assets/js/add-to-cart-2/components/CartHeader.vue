<template>
  <div class="mb-3">
    <nav>
      <ul>
        <li><router-link to="/" exact>Add</router-link></li>
        <li><router-link to="/cart" exact>Checkout <span v-if="newItems.sum" class="new-items">({{ newItems.sum }})</span></router-link></li>
      </ul>
      <!-- <router-link to="/" exact><button class="header-button mr-3">Add</button></router-link>
      <router-link to="/cart" exact><button class="header-button">Checkout</button></router-link> -->
    </nav>
  </div>
</template>


<script>

export default {
  components:{

  },
  data () {
    return {

    }
  },
  methods: {

  },
  computed: {
    newItems() {
      return this.$store.state.newItems;
    }
  }
}
</script>


<style scoped>
div {
  background: #2340FF;
}
li {
  display: inline-block;
  text-decoration: none;
  margin: 1%;
}
a {
  display: block;
  width: 120px;
  padding: 7%;
  background-color: white;
  color: black;
  border-radius: 4px;
  transition-duration: 0.4s;
  text-align: center;
}
a:hover {
  background-color: #2340FF;
  color: white;
  text-decoration: none;
}
.router-link-active {
  background-color: #2340FF;
  color: white;
}
.new-items {
  color: #D51B1B;
}
.new-items:hover {
  color: white;
}
</style>
