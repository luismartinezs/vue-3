// Reactivity system uses proxy under the hood to intercept get and set reactive values

let product = { price: 5, qty: 2 }

let proxied = new Proxy(product, {
  get (target, key, receiver) {
    console.log(`Get called with key = ${key}`)
    return Reflect.get(target, key, receiver) // Reflect.get(target, key) is a way to get a val from an object
  },
  set(target, key, value, receiver) {
      console.log(`Set called with ${key} and ${value}`);
      return Reflect.set(target,key, value, receiver)
  }
})

console.log(proxied.qty)

proxied.qty = 3