/* eslint-disable no-unreachable */
let count = 0

function mockPromise (val, ttl = 300) {
  return new Promise(resolve => {
    return setTimeout(() => resolve(val), ttl)
  })
}

export const getEventCount = () => {
  count++
  return mockPromise(count)
}

export const getEvent = () => {
  const event = {
    title: 'Puppy dance',
    description: 'See lots of cute puppies dancing'
  }
  return mockPromise(event, 500)
}

export default { getEventCount, getEvent }
