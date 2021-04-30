// If we have multiple reactive objects that each need to track effects, we use a targetMap
// targetMap is a WeakMap and stores key (object name) value (depsMap)

// Setup

const targetMap = new WeakMap()

function track (target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(effect)
}

function trigger (target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }
  let dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => effect())
  }
}

// In action

let product = { price: 5, qty: 2 }
let total = 0

let effect = () => {
  total = product.price * product.qty
}

track(product, 'qty')
effect()

log(product, total)

product.qty = 3
trigger(product, 'qty')

log(product, total)

function log (...args) {
  console.log(...args)
}
