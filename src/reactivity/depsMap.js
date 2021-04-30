// for reactive objects, we store deps for each value in a map

// Reactivity engine setup

const depsMap = new Map()

function track (key) {
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }

  dep.add(effect)
}

function trigger (key) {
  let dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => effect())
  }
}

//  In action

let product = { price: 5, qty: 2 }
let total = 0

let effect = () => {
  total = product.price * product.qty
}

track('qty')
effect()

log(product, total)

product.qty = 3
trigger('qty')

log(product, total)

function log (...args) {
  console.log(...args)
}
