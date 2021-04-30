const { reactive, computed } = require('./reactivity.cjs')

// this works the same way as our code in reactive.js

let product = reactive({ price: 5, quantity: 2 })
let salePrice = computed(() => product.price * 0.9)
let total = computed(() => salePrice.value * product.quantity)

log()

product.quantity = 3

log()

product.price = 10

log()

product.name = 'Shoes'

log()

product.name = 'Socks'

log()

function log () {
  console.log(product, salePrice.value, total.value)
}
