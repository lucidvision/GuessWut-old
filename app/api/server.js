import { serverURL } from '~/config/constants'

export function sendNotification (tokens, title, body) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  const data = JSON.stringify({tokens, title, body})
  const request = {
    method: 'POST',
    headers,
    body: data
  }
  return fetch(serverURL + 'sendNotification', request)
}
