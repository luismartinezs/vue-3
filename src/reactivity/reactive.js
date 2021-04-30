const targetMap = new WeakMap() // targetMap stores the effects that each object should re-run when it's updated
let activeEffect = null // The active effect running

function track (target, key) {
  if (activeEffect) {
    // <------ Check to see if we have an activeEffect
    // We need to make sure this effect is being tracked.
    let depsMap = targetMap.get(target) // Get the current depsMap for this target
    if (!depsMap) {
      // There is no map.
      targetMap.set(target, (depsMap = new Map())) // Create one
    }
    let dep = depsMap.get(key) // Get the current dependencies (effects) that need to be run when this is set
    if (!dep) {
      // There is no dependencies (effects)
      depsMap.set(key, (dep = new Set())) // Create a new Set
    }
    dep.add(activeEffect) // Add effect to dependency map
  }
}

function trigger (target, key) {
  const depsMap = targetMap.get(target) // Does this object have any properties that have dependencies (effects)
  if (!depsMap) {
    return
  }
  let dep = depsMap.get(key) // If there are dependencies (effects) associated with this
  if (dep) {
    dep.forEach(eff => {
      // run them all
      eff()
    })
  }
}

function reactive (target) {
  const handler = {
    get (target, key, receiver) {
      let result = Reflect.get(target, key, receiver)
      track(target, key) // If this reactive property (target) is GET inside then track the effect to rerun on SET
      return result
    },
    set (target, key, value, receiver) {
      let oldValue = target[key]
      let result = Reflect.set(target, key, value, receiver)
      if (result && oldValue != value) {
        trigger(target, key) // If this reactive property (target) has effects to rerun on SET, trigger them.
      }
      return result
    }
  }
  return new Proxy(target, handler)
}

function ref (raw) {
  const r = {
    get value () {
      track(r, 'value')
      return raw
    },
    set value (newVal) {
      raw = newVal
      trigger(r, 'value')
    }
  }
  return r
}

function effect (eff) {
  activeEffect = eff
  activeEffect()
  activeEffect = null
}

function computed (getter) {
  let result = ref()
  effect(() => (result.value = getter()))
  return result
}

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
