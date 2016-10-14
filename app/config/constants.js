import firebase from 'firebase'

firebase.initializeApp({
  apiKey: 'AIzaSyCiHq076GgJh3J_QyAjOvRaWmBIe8QXqMw',
  authDomain: 'guesswut-324e8.firebaseapp.com',
  databaseURL: 'https://guesswut-324e8.firebaseio.com',
  storageBucket: '',
  messagingSenderId: '243699582400'
})

const ref = firebase.database().ref()
const firebaseAuth = firebase.auth()

export {
  ref,
  firebaseAuth
}

export const serverURL = 'http://192.168.0.11:3000/'
// export const serverURL = 'http://heroku.com'

export const minimumWordLength = 5
export const maximumWordLength = 30
