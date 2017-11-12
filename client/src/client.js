/* eslint-disable no-undef */
// API calls

export const test = () => {
  return fetch('/api', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.json()
  })
}
