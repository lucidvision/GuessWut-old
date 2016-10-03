import { ref } from '~/config/constants'

export function fetchUser (uid) {
  return ref.child(`users/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function updateUser (user) {
  return ref.child(`users/${user.uid}`).update(user)
}

export function searchUsersByEmail (email) {
  return ref.child('users').orderByChild('email').equalTo(email).once('value')
    .then((snapshot) => snapshot.val() || {})
}
