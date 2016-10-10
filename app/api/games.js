import { ref } from '~/config/constants'

export function createGame (game) {
  const gid = ref.child('games').push().key
  const gameData = {...game, gid}
  const gamePromise = ref.child(`games/${gid}`).set(gameData)
  return {
    gid,
    gamePromise
  }
}

export function saveToGamesHosting (gid, huid) {
  return ref.child(`hosting/${huid}`).update({[gid]: true})
}

export function saveToGamesPlaying (gid, puid) {
  return ref.child(`playing/${puid}`).update({[gid]: true})
}

export function saveToGamesCompleted (gid, uid) {
  return ref.child(`completed/${uid}`).update({[gid]: true})
}

export function saveGuessToGames (gid, puid, guess, score) {
  let updates = {}
  updates[`games/${gid}/guessed/${puid}`] = true
  updates[`games/${gid}/players/${puid}/guess`] = guess
  updates[`games/${gid}/players/${puid}/score`] = score
  return ref.update(updates)
}

export function completeGame (gid) {
  return ref.child(`games/${gid}`).update({completed: true})
}

export function removeFromGamesHosting (gid, huid) {
  return ref.child(`hosting/${huid}/${gid}`).remove()
}

export function removeFromGamesPlaying (gid, puid) {
  return ref.child(`playing/${puid}/${gid}`).remove()
}
