let count = 0

export const getEventCount = () => {
  return new Promise(resolve => {
    count++
    return setTimeout(() => resolve(count), 300)
  })
}

export default { getEventCount }
