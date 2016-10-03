import { ref } from '~/config/constants'

export function addRequest (uid, fuid) {
  return ref.child(`requests/${fuid}`).update({[uid]: true})
}

export function removeRequest (uid, fuid) {
  return ref.child(`requests/${uid}/${fuid}`).remove()
}

export function addFriend (uid, fuid) {
  return ref.child(`friends/${uid}`).update({[fuid]: true})
}

export function removeFriend (uid, fuid) {
  return ref.child(`friends/${uid}/${fuid}`).remove()
}
