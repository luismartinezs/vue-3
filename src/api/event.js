// dumb mock api
export const getEventCount = value => {
  return Promise.resolve(JSON.stringify(value.length))
}

export default { getEventCount }
