import { ref } from '~/config/constants'

export function addRequest (uid, fuid) {
  return ref.child(`requests/${fuid}`).set({[uid]: true})
}

export function removeRequest (uid, fuid) {
  return ref.child(`requests/${uid}/${fuid}`).remove()
}

export function addFriend (uid, fuid) {
  return ref.child(`friends/${uid}`).set({[fuid]: true})
}
