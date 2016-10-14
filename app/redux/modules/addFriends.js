import { ref } from '~/config/constants'
import { searchUsersByEmail } from '~/api/users'
import { addRequest, removeRequest, addFriend } from '~/api/friends'
import { sendNotification } from '~/api/server'

const UPDATE_SEARCH_TEXT = 'UPDATE_SEARCH_TEXT'
const UPDATE_USER_FOUND = 'UPDATE_USER_FOUND'
const UPDATE_REQUESTS = 'UPDATE_REQUESTS'

export function updateSearchText (newSearchText) {
  return {
    type: UPDATE_SEARCH_TEXT,
    newSearchText
  }
}

export function updateUserFound (user) {
  return {
    type: UPDATE_USER_FOUND,
    user
  }
}

function updateRequests (ruids, users) {
  return {
    type: UPDATE_REQUESTS,
    ruids,
    users
  }
}

export function findFriend (email) {
  return function (dispatch, getState) {
    const { users } = getState()
    if (email !== users.user.email) {
      searchUsersByEmail(email)
        .then((userWithId) => {
          dispatch(updateUserFound(userWithId))
        })
    }
  }
}

export function fetchAndSetRequestsListener (uid) {
  return function (dispatch) {
    ref.child(`requests/${uid}`).on('value', (snapshot) => {
      if (snapshot.exists()) {
        let uids = Object.keys(snapshot.val())
        let users = []
        let count = 0
        snapshot.forEach((childSnapshot) => {
          count++
          ref.child(`users/${childSnapshot.key}`).once('value', (snapshot) => {
            users.push(snapshot.val())
            if (users.length === count) {
              dispatch(updateRequests(uids, users))
            }
          })
        })
      } else {
        dispatch(updateRequests([], []))
      }
    })
  }
}

export function sendRequest () {
  return function (dispatch, getState) {
    const { authentication, addFriends } = getState()
    const fuid = Object.keys(addFriends.userFound)[0]
    const token = addFriends.userFound[fuid].token
    return addRequest(authentication.authedId, fuid)
      .then(() => {
        sendNotification([token], 'Friend Request Received', 'You have received a Friend Request!')
          .then(response => {
            dispatch(updateSearchText(''))
            dispatch(updateUserFound({}))
          })
      })
  }
}

export function confirmRequest (fuid, token) {
  return function (dispatch, getState) {
    const { authentication } = getState()
    return Promise.all([
      sendNotification([token], 'Friend Confirmed', 'Your friend confirmed your request!'),
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
  ruids: [],
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
        ruids: action.ruids,
        requests: action.users,
        listenerSet: true
      }
    default :
      return state
  }
}
