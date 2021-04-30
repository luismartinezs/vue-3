function reactive (target) {
  const handler = {
    get (target, key, receiver) {
      let result = Reflect.get(target, key, receiver)
      track(target, key)
      return result
    },
    set (target, key, value, receiver) {
      let oldValue = target[key]
      let result = Reflect.set(target, key, value, receiver)
      if (result && oldValue != value) {
        trigger(target, key)
      }
      return result
    }
  }
  return new Proxy(target, handler)
}

const targetMap = new WeakMap()
let activeEffect = null

function track (target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }
    dep.add(activeEffect)
  }
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

function effect (eff) {
  activeEffect = eff
  activeEffect()
  activeEffect = null
}

//  In action

let product = reactive({ price: 5, qty: 2 })
let salePrice = 0
let total = 0

effect(() => {
  total = product.price * product.qty
})

effect(() => {
  salePrice = product.price * 0.9
})

log(product, total, salePrice)

product.qty = 4

log(product, total, salePrice)

product.price = 10

log(product, total, salePrice)

function log (...args) {
  console.log(...args)
}
