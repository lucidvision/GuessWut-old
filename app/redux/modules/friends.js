import { ref } from '~/config/constants'
import { removeFriend } from '~/api/friends'

const UPDATE_FRIENDS = 'UPDATE_FRIENDS'
const ADD_FRIENDS_LISTENER = 'ADD_FRIENDS_LISTENER'

function updateFriends (friends) {
  return {
    type: UPDATE_FRIENDS,
    friends
  }
}

function addFriendsListener () {
  return {
    type: ADD_FRIENDS_LISTENER
  }
}

export function fetchAndSetFriendsListener () {
  return function (dispatch, getState) {
    const { authentication } = getState()
    let listenerSet = false
    ref.child(`friends/${authentication.authedId}`).on('value', (snapshot) => {
      if (snapshot.exists()) {
        let users = []
        let count = 0
        snapshot.forEach((childSnapshot) => {
          count++
          ref.child(`users/${childSnapshot.key}`).once('value', (snapshot) => {
            users.push(snapshot.val())
            if (users.length === count) {
              dispatch(updateFriends(users))
            }
          })
        })
      } else {
        dispatch(updateFriends([]))
      }
      if (listenerSet === false) {
        dispatch(addFriendsListener())
        listenerSet = true
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
  friends: [],
  listenerSet: false
}

export default function friends (state = initialState, action) {
  switch (action.type) {
    case UPDATE_FRIENDS :
      return {
        ...state,
        friends: action.friends
      }
    case ADD_FRIENDS_LISTENER :
      return {
        ...state,
        listenerSet: true
      }
    default :
      return state
  }
}
