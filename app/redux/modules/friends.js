import { ref } from '~/config/constants'

const UPDATE_FRIENDS = 'UPDATE_FRIENDS'
const ADD_LISTENER = 'ADD_LISTENER'

function updateFriends (friends) {
  return {
    type: UPDATE_FRIENDS,
    friends
  }
}

function addListener () {
  return {
    type: ADD_LISTENER
  }
}

export function fetchAndSetFriendsListener () {
  return function (dispatch, getState) {
    const { authentication } = getState()
    let listenerSet = false
    ref.child(`friends/${authentication.authedId}`).on('value', (snapshot) => {
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
      if (listenerSet === false) {
        dispatch(addListener())
        listenerSet = true
      }
    })
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
    case ADD_LISTENER :
      return {
        ...state,
        listenerSet: true
      }
    default :
      return state
  }
}
