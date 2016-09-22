import { authWithEmailandPassword, signupWithEmailandPassword, getAccessToken, authWithToken, updateUser, logout } from '~/api/auth'

const AUTHENTICATING = 'AUTHENTICATING'
const NOT_AUTHED = 'NOT_AUTHED'
const IS_AUTHED = 'IS_AUTHED'
export const LOGGING_OUT = 'LOGGING_OUT'

function authenticating () {
  return {
    type: AUTHENTICATING
  }
}

function notAuthed () {
  return {
    type: NOT_AUTHED
  }
}

function isAuthed (user) {
  return {
    type: IS_AUTHED,
    user
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
          .catch((error) => console.warn('Error in handleAuthWithFirebase: ', error))
      })
  }
}

export function handleFacebookAuthWithFirebase () {
  return function (dispatch, getState) {
    dispatch(authenticating())
    return getAccessToken()
      .then(({accessToken}) => authWithToken(accessToken))
      .catch((error) => console.warn('Error in handleAuthWithFirebase: ', error))
  }
}

export function onAuthChange (user) {
  return function (dispatch) {
    if (!user) {
      dispatch(notAuthed())
    } else {
      const { uid, email, displayName, photoURL } = user
      updateUser({
        uid,
        email,
        displayName,
        photoURL
      }).then(() => dispatch(isAuthed(user)))
    }
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
        authedId: action.user.uid,
        user: action.user
      }
    default :
      return state
  }
}
