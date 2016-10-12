import { authWithEmailandPassword, signupWithEmailandPassword, logout } from '~/api/auth'
import { updateUser } from '~/api/users'
import { fetchAndSetUserListener } from '~/redux/modules/users'
import { fetchAndSetFriendsListener } from '~/redux/modules/friends'
import { fetchAndSetRequestsListener } from '~/redux/modules/addFriends'
import { fetchAndSetHostingListener } from '~/redux/modules/games'
import { showFlashNotification } from '~/redux/modules/flashNotification'

const AUTHENTICATING = 'AUTHENTICATING'
const NOT_AUTHED = 'NOT_AUTHED'
const IS_AUTHED = 'IS_AUTHED'
export const LOGGING_OUT = 'LOGGING_OUT'

function authenticating () {
  return {
    type: AUTHENTICATING
  }
}

export function notAuthed () {
  return {
    type: NOT_AUTHED
  }
}

function isAuthed (uid) {
  return {
    type: IS_AUTHED,
    uid
  }
}

function loggingOut () {
  return {
    type: LOGGING_OUT
  }
}

export function handleAuthWithFirebase (email, password) {
  return function (dispatch, getState) {
    dispatch(authenticating())
    return authWithEmailandPassword(email, password)
      .catch(() => {
        signupWithEmailandPassword(email, password)
          .catch(error => {
            let message = 'Error authenticating'
            if (error) {
              message = error.message
            }
            dispatch(showFlashNotification({text: message}))
            dispatch(notAuthed())
          })
      })
  }
}

export function onAuthChange ({uid, email, displayName}) {
  return function (dispatch) {
    const user = {uid, email, displayName}
    updateUser(user)
    .then(() => dispatch(isAuthed(uid)))
    .then(() => Promise.all([
      dispatch(fetchAndSetUserListener(uid)),
      dispatch(fetchAndSetHostingListener(uid)),
      dispatch(fetchAndSetFriendsListener(uid)),
      dispatch(fetchAndSetRequestsListener(uid))
    ]))
  }
}

export function handleUnauth () {
  return function (dispatch) {
    logout()
    dispatch(loggingOut())
  }
}

const initialState = {
  isAuthed: false,
  isAuthenticating: true,
  authedId: ''
}

export default function authentication (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATING :
      return {
        ...state,
        isAuthenticating: true
      }
    case NOT_AUTHED :
      return {
        isAuthenticating: false,
        isAuthed: false,
        authedId: ''
      }
    case IS_AUTHED :
      return {
        isAuthed: true,
        isAuthenticating: false,
        authedId: action.uid
      }
    default :
      return state
  }
}
