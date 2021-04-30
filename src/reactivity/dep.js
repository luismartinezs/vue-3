// Reactivity engine from scratch

// setup

let dep = new Set() // store effects to run when values change

function track () {
  dep.add(effect)
}

function trigger () {
  dep.forEach(effect => effect())
}

// in action

let price = 5
let qty = 2
let total = 0

let effect = function () {
  total = price * qty
}

track()
trigger()

log(price, qty, total)

price = 10
trigger()

log(price, qty, total)

function log (...args) {
  console.log(...args)
}
