import Vue from 'vue';
import Vuex from 'vuex';
import localforage from 'localforage';

Vue.use(Vuex);

const STORAGE_KEY = 'storage';
const NEW_ITEMS = 'new-items';

localforage.config({
  driver: localforage.LOCALSTORAGE
})


export const store = new Vuex.Store({
  state: {
    products: [],
    added: [
      {name: '', id: '', price: 0, quantity: 0, sum: 0}
    ],
    quantity: [0, 0, 0, 0],
    addedCart: [],
    sumToCart: 0,
    sumCart: 0,
    isShowed: false,
    newItems: {
      sum: 0,
      items: []
    }
  },
  mutations: {
    // products //
    thisMounted: state => {
      axios.get("https://add-to-cart-7f071.firebaseio.com/posts/-L8GgFwLiz1-53q3DMNH.json").then(function(response){
        state.products = response.data;
        localforage.getItem(NEW_ITEMS).then(function(value){
          state.newItems.sum = value.sum;
        });
        if (state.sumCart == 0){
          state.addedCart = [];
        }
      })
    },
    // products //
    addToCart (state, { id }) {
      const record = state.added.find(p => p.id === id) // checks the to-cart list if they have the existing id
      const rec = state.addedCart.find(p => p.id === id) // checks the cart list if they have the existing id
      let i = state.added.indexOf(record)
      let index = state.added.indexOf(record)

      if (!rec){ // runs this block if there is no record of the item on cart list yet
        if (!record){ // runs this block if there is no record of the item on to-cart list yet

        } else {
          // if there is no rec yet on the cart list but there is a record in the to-cart list
          state.newItems.sum += record.quantity;
          state.newItems.items.push(record);
          localforage.setItem(NEW_ITEMS, state.newItems);
          // push that record in the cart list and post it to local storage
          state.addedCart.push(record);
          localforage.setItem(STORAGE_KEY, state.addedCart);
          // if there is already a value for sumcart, just add the value of the record's sum
          if (state.sumCart != 0){
            state.sumCart += (record.sum);
          }
          // if there isn't a value for sumcart, set the value as the record's sum
          if (state.sumCart == 0){
            state.sumCart = (record.sum);
          }
          // remove the corresponding sum for that record
          // also remove that record so there will be no abuse of adding items
          // (removing sum came first because if the item on added is removed, the index will be updated)
          state.added.splice(state.added.indexOf(record), 1);
          // updating the sum on to-cart
          state.sumToCart -= (record.price) * (record.quantity);
        }
      } else { // runs this block if there is already a record of the item on to-cart and cart list
        state.newItems.sum += record.quantity;
        state.newItems.items.push(record);
        localforage.setItem(NEW_ITEMS, state.newItems);
        // update the quantity and sum on the cart list
        rec.quantity += record.quantity;
        state.sumCart += state.sumToCart;
        // update each sum property of the cart list's items
        state.addedCart[index].sum += record.sum;
        // post to local storage
        localforage.setItem(STORAGE_KEY, state.addedCart);
        // remove the record on to-cart list and update the sum on to-cart list
        state.added.splice(state.added.indexOf(record), 1);
        state.sumToCart -= (record.price) * (record.quantity);
      }
    },
    // products //
    decre (state, { id }) {
	    const record = state.added.find(p => p.id === id) // checks the to-cart list if they have the existing id
      const rec = state.products.find(p => p.id === id) // checks the product list if they have the existing id
      let index = state.products.indexOf(rec)
      let i = state.added.indexOf(record)

      if (record.quantity != 0){ // runs this block if there is a quantity already in a record
        // decrements the quantity of a record
        record.quantity--;
        state.quantity[index] = record.quantity;
        // diminishes the value of sum
        state.added[i].sum -= record.price;
        state.sumToCart -= record.price;
      }
    },
    // products //
    incre (state, { id, name, price }) {
	    const record = state.added.find(p => p.id === id) // checks the to-cart list if they have the existing id
      const rec = state.products.find(p => p.id === id) // checks the product list if they have the existing id
      let index = state.products.indexOf(rec)
      let i = state.added.indexOf(record)

	    if (!record) { // runs this block if there is no record of the item on to-cart list yet
	      state.added.push({ // adds the following properties on the to-cart array
          name,
          id,
          price,
	        quantity: 1,
          sum: rec.price // sets the sum as the price of the product record (since only one would be pushed)
	      })
        state.quantity[index] = 1;
        // increases the to-cart's total sum
        state.sumToCart += rec.price;
        // removes the first item on the to-cart array which is the one initialized
        if (state.added[0].name == ''){
          state.added.shift();
        }
	    } else { // runs this block if there is a record of the item already on the to-cart list
        // increments the quantity of a record
	      record.quantity++
        state.quantity[index] = record.quantity;
        // increases the value of sum
        state.added[i].sum = (record.quantity * record.price);
        state.sumToCart = state.sumToCart + record.price;
	    }

	  },
    // cart //
    cartMounted: state => {
      // grabs the items on local storage
      localforage.getItem(STORAGE_KEY).then(function(value){
        return value;
      }).then(function(value){
        state.addedCart = value; // set the items to an array (cart list)
        // to avoid incrementing the value of sum, each time the cart is created/loaded
        state.sumCart = 0;
        // increase the value of the cart list's sum
        for (let counter = 0; counter < state.addedCart.length; counter++){
          state.sumCart += (state.addedCart[counter].price) * (state.addedCart[counter].quantity);
        }
        if (state.sumCart > 0){ // runs this block to show the removeAll button if there is a sum
          state.isShowed = true;
        }
      })
      state.newItems.sum = 0;
      state.newItems.items = [];
      localforage.setItem(NEW_ITEMS, state.newItems);
    },
    // cart //
    removeOne (state, payload) {
      state.addedCart.splice(state.addedCart.indexOf(payload), 1); // remove the item on the cart list
      localforage.setItem(STORAGE_KEY, state.addedCart); // set the updated item list on local storage
      state.sumCart -= payload.sum; // decrease the value of the sum by getting the payload's sum
      if (state.sumCart == 0){ // runs this block to hide the removeAll button if there is no sum
        state.isShowed = false;
      }
    },
    // cart //
    removeAll: state => {
      state.addedCart = []; // empties the cart list array
      state.sumCart = 0; // sets the cart list's sum to 0
      localforage.removeItem(STORAGE_KEY); // removes the whole item storage on local storage
      state.isShowed = false; // hides the removeAll button
    }
  },
  actions: {
    // cart //
    removeOne: ({commit}, data) => {
      commit('removeOne', data);
    }
  }
})
