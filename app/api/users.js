import { ref } from '~/config/constants'

export function searchUsersByEmail (email) {
  return ref.child('users').orderByChild('email').equalTo(email).once('value')
  .then((snapshot) => snapshot.val() || {})
}
