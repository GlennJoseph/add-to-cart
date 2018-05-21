<template>
  <div id="cart-list">
    <table id="table-cart" v-if="sumCart">
      <thead>
        <tr>
          <th>Products</th>
          <th>Quantity</th>
          <th>Total Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr class="striped" v-for="single in addedCart">
          <td>{{ single.name }}</td>
          <td>{{ single.quantity }}</td>
          <td>Php {{ single.sum }}</td>
          <td id="button"><button class="remove" id="remove" v-on:click="removeOne(single)">Remove</button></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td></td>
          <td>Php {{ sumCart }}</td>
          <td id="button"><button class="remove" id="removeAll" v-on:click="removeAll()" v-if="isShowed">Remove All</button></td>
        </tr>
      </tfoot>
    </table>
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
  notifications: {
    showDeleteOne: {
      type: 'success',
      message: 'Succesfully removed!'
    },
    showDeleteAll: {
      type: 'success',
      message: 'Succesfully removed all!'
    },
    showNewItems: {
      type: 'info',
      title: 'No new items',
      message: ''
    }
  },
  methods: {
    removeOne(single) {
      if (confirm('Are you sure?')){
        this.$store.dispatch('removeOne', single);
        this.showDeleteOne();
      };
    },
    removeAll() {
      if (confirm('Are you sure?')){
        this.$store.commit('removeAll');
        this.showDeleteAll();
      };
    }
  },
  computed: {
    addedCart() {
      return this.$store.state.addedCart;
    },
    sumCart() {
      return this.$store.state.sumCart;
    },
    isShowed() {
      return this.$store.state.isShowed;
    },
    newItems() {
      return this.$store.state.newItems;
    }
  },
  mounted() {
    if (this.newItems.sum === 0){
      this.showNewItems();
    } else if (this.newItems.sum === 1){
      this.showNewItems({title: 'New Item!', message: this.newItems.sum + ' new ' + this.newItems.items[0].name});
    } else {
      for (let i = 0; i < this.newItems.items.length; i++){
        this.showNewItems({title: 'New Items!', message: this.newItems.items[i].quantity + ' new ' + this.newItems.items[i].name + '!'})
      }
    }
    this.$store.commit('cartMounted');
  }
}
</script>


<style scoped>
#table-cart {
  width: 80%;
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
.remove {
  width: 50%;
  padding: 4%;
  background-color: white;
  color: black;
  border: 1px solid #FF2323;
  border-radius: 4px;
  transition-duration: 0.4s;
}
.remove:hover {
  color: white;
  background-color: #FF2323;
}
.remove:active {
  background-color: #A11919;
  box-shadow: 0 5px #666;
  transform: translateY(2px);
}
#button {
  border-style: none;
  text-align: left;
}
</style>
