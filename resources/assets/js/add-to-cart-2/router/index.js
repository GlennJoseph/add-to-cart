import AddCart from '../components/AddToCartBody.vue'
import Cart from '../components/Cart.vue'

export default[
  {path: '/', name: 'home', component: AddCart},
  {path: '/cart', name: 'cart', component: Cart},
]
