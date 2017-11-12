/* eslint-disable no-undef */
// API calls

export const getApiVersion = () => {
  return fetch('/api', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.json()
  })
}

export const getInterfaces = () => {
  return fetch('/api/interfaces', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.json()
  })
}
