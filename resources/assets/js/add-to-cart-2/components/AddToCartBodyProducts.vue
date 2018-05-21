<template>
    <tbody>
      <!-- this component must repeat (4 components because 4 products) -->
      <tr v-for="product in products" id="products">
        <td>{{ product.name }}</td>
        <td class="description">{{ product.description }}</td>
        <td>{{ product.price }}</td>
        <td><button class="quantity mr-1" id="decre" v-on:click="decre(product)"><b>-</b></button><button class="quantity" id="incre" v-on:click="incre(product)"><b>+</b></button></td>
        <td class="add"><button id="add" v-on:click="addToCart(product)">Add to Cart</button></td>
      </tr>
    </tbody>
</template>


<script>

export default {
  components:{

  },
  data () {
    return {

    }
  },
  notifications: {
    showSuccessMsg: {
      type: 'success',
      message: 'Succesfully added!',
      timeout: 1000
    },
    showNullMsg: {
      type: 'warn',
      message: 'Null!'
    }
  },
  methods: {
    decre(product) {
      this.$store.commit('decre', product);
    },
    incre(product) {
      this.$store.commit('incre', product);
    },
    addToCart(product) {
      const record = this.added.find(p => p.id === product.id)
      if (!record){
        this.showNullMsg();
      }
      else {
        this.showSuccessMsg();
      }
      this.$store.commit('addToCart', product);
    }
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    added() {
      return this.$store.state.added;
    }
  },
  mounted() {
    this.$store.commit('thisMounted');
  }
}
</script>


<style scoped>
tbody {
  border-style: none;
  padding: 1%;
  margin: 1%;
}
tr {
  height: 60px;
  border-top: 1px solid #B0B0B0;
}
tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
.description {
  width: 50%;
}
.add {
  border-style: none;
}
#add {
  width: 100%;
  padding: 6%;
  border: 1px solid #2340FF;
  border-radius: 4px;
}
.quantity {
  width: 45%;
  border: 1px solid black;
  border-radius: 2px;
}
.quantity, #add {
  background-color: white;
  color: black;
  transition-duration: 0.4s;
}
.quantity:hover {
  color: white;
}
#add:hover {
  background-color: #2340FF;
  color: white;
}
#add:active {
  background-color: #1A2B9B;
  box-shadow: 0 5px #666;
  transform: translateY(2px);
}
#decre:hover {
  background-color: #D51B1B;
}
#decre:active {
  background-color: #841515;
  box-shadow: 0 5px #666;
  transform: translateY(2px);
}
#incre:hover {
  background-color: #48E813;
}
#incre:active {
  background-color: #2B7B10;
  box-shadow: 0 5px #666;
  transform: translateY(2px);
}
</style>
