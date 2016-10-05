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
const facebookProvider = firebase.auth.FacebookAuthProvider

export {
  ref,
  firebaseAuth,
  facebookProvider
}

export const minimumWordLength = 5
export const maximumWordLength = 30
