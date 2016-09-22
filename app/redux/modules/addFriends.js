import { ref } from '~/config/constants'
import { searchUsersByEmail } from '~/api/users'
import { addRequest, removeRequest, addFriend } from '~/api/friends'

const UPDATE_SEARCH_TEXT = 'UPDATE_SEARCH_TEXT'
const UPDATE_USER_FOUND = 'UPDATE_USER_FOUND'
const UPDATE_REQUESTS = 'UPDATE_REQUESTS'
const ADD_LISTENER = 'ADD_LISTENER'

export function updateSearchText (newSearchText) {
  return {
    type: UPDATE_SEARCH_TEXT,
    newSearchText
  }
}

function updateUserFound (user) {
  return {
    type: UPDATE_USER_FOUND,
    user
  }
}

function updateRequests (users) {
  return {
    type: UPDATE_REQUESTS,
    users
  }
}

function addListener () {
  return {
    type: ADD_LISTENER
  }
}

export function findFriend (email) {
  return function (dispatch, getState) {
    const { authentication } = getState()
    if (email !== authentication.user.email) {
      searchUsersByEmail(email)
        .then((userWithId) => {
          dispatch(updateUserFound(userWithId))
        })
    }
  }
}

export function fetchAndSetRequestsListener () {
  return function (dispatch, getState) {
    const { authentication } = getState()
    let listenerSet = false
    ref.child(`requests/${authentication.authedId}`).on('value', (snapshot) => {
      let users = []
      let count = 0
      snapshot.forEach((childSnapshot) => {
        count++
        ref.child(`users/${childSnapshot.key}`).once('value', (snapshot) => {
          users.push(snapshot.val())
          if (users.length === count) {
            dispatch(updateRequests(users))
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

export function sendRequest () {
  return function (dispatch, getState) {
    const { authentication, addFriends } = getState()
    const friendId = Object.keys(addFriends.userFound)[0]
    return addRequest(authentication.authedId, friendId)
      .then(() => dispatch(updateSearchText('')))
  }
}

export function confirmRequest (fuid) {
  return function (dispatch, getState) {
    const { authentication } = getState()
    return Promise.all([
      addFriend(authentication.authedId, fuid),
      addFriend(fuid, authentication.authedId),
      removeRequest(authentication.authedId, fuid)
    ])
  }
}

const initialState = {
  searchText: '',
  userFound: {},
  listenerSet: false,
  requests: []
}

export default function addFriends (state = initialState, action) {
  switch (action.type) {
    case UPDATE_SEARCH_TEXT :
      return {
        ...state,
        searchText: action.newSearchText
      }
    case UPDATE_USER_FOUND :
      return {
        ...state,
        userFound: action.user
      }
    case UPDATE_REQUESTS :
      return {
        ...state,
        requests: action.users
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
