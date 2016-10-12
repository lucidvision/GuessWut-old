import { firebaseAuth, ref } from '~/config/constants'

export function authWithEmailandPassword (email, password) {
  return firebaseAuth.signInWithEmailAndPassword(email, password)
}

export function signupWithEmailandPassword (email, password) {
  return firebaseAuth.createUserWithEmailAndPassword(email, password)
}

export function logout () {
  firebaseAuth.signOut()
  ref.off()
}
