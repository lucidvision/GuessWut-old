import { firebaseAuth, facebookProvider, ref } from '~/config/constants'
import { AccessToken, LoginManager } from 'react-native-fbsdk'

export function authWithEmailandPassword (email, password) {
  return firebaseAuth.signInWithEmailAndPassword(email, password)
}

export function signupWithEmailandPassword (email, password) {
  return firebaseAuth.createUserWithEmailAndPassword(email, password)
}

export function getAccessToken () {
  return AccessToken.getCurrentAccessToken()
}

export function authWithToken (accessToken) {
  return firebaseAuth.signInWithCredential(facebookProvider.credential(accessToken))
}

export function logout () {
  LoginManager.logOut()
  firebaseAuth.signOut()
  ref.off()
}
