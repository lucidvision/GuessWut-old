import { ref } from '~/config/constants'

const UPDATE_USER = 'UPDATE_USER'

function updateUser (user) {
  return {
    type: UPDATE_USER,
    user
  }
}

export function fetchAndSetUserListener (uid) {
  return function (dispatch) {
    ref.child(`users/${uid}`).on('value', (snapshot) => {
      dispatch(updateUser(snapshot.val() || {}))
    })
  }
}

const initialState = {
  user: {},
  listenerSet: false
}

export default function users (state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER :
      return {
        user: action.user,
        listenerSet: true
      }
    default :
      return state
  }
}
