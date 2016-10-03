import { ref } from '~/config/constants'
import { removeFriend } from '~/api/friends'

const UPDATE_FRIENDS = 'UPDATE_FRIENDS'

function updateFriends (fuids, friends) {
  return {
    type: UPDATE_FRIENDS,
    fuids,
    friends
  }
}

export function fetchAndSetFriendsListener (uid) {
  return function (dispatch) {
    ref.child(`friends/${uid}`).on('value', (snapshot) => {
      if (snapshot.exists()) {
        let uids = Object.keys(snapshot.val())
        let users = []
        let count = 0
        snapshot.forEach((childSnapshot) => {
          count++
          ref.child(`users/${childSnapshot.key}`).once('value', (snapshot) => {
            users.push(snapshot.val())
            if (users.length === count) {
              dispatch(updateFriends(uids, users))
            }
          })
        })
      } else {
        dispatch(updateFriends([], []))
      }
    })
  }
}

export function endFriendship (fuid) {
  return function (dispatch, getState) {
    const { authentication } = getState()
    return Promise.all([
      removeFriend(authentication.authedId, fuid),
      removeFriend(fuid, authentication.authedId)
    ])
  }
}

const initialState = {
  fuids: [],
  friends: [],
  listenerSet: false
}

export default function friends (state = initialState, action) {
  switch (action.type) {
    case UPDATE_FRIENDS :
      return {
        fuids: action.fuids,
        friends: action.friends,
        listenerSet: true
      }
    default :
      return state
  }
}
