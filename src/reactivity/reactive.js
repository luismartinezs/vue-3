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

//  In action

let product = reactive({ price: 5, qty: 2 })
let total = 0

let effect = () => {
  total = product.price * product.qty
}

effect()

log(product, total)

product.qty = 4

log(product, total)

function log (...args) {
  console.log(...args)
}
