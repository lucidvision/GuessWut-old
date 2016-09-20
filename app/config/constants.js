import firebase from 'firebase'

firebase.initializeApp({
  apiKey: "AIzaSyCbQV0I21CRwkoXRGynGy3MFDfhBRsllLY",
  authDomain: "guesswut-249a5.firebaseapp.com",
  databaseURL: "https://guesswut-249a5.firebaseio.com",
  storageBucket: "guesswut-249a5.appspot.com",
  messagingSenderId: "15728671289"
})

const ref = firebase.database().ref()
const firebaseAuth = firebase.auth()
const facebookProvider = firebase.auth.FacebookAuthProvider

export {
  ref,
  firebaseAuth,
  facebookProvider,
}
