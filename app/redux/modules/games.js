import { ref } from '~/config/constants'
import { createGame, saveToGamesHosting, saveToGamesPlaying, saveGuessToGames,
  completeGame, removeFromGamesHosting, saveToGamesCompleted, removeFromGamesPlaying } from '~/api/games'
import { sendNotification } from '~/api/server'
import _ from 'lodash'

const UPDATE_CODE_TEXT = 'UPDATE_CODE_TEXT'
const UPDATE_PLAYING = 'UPDATE_PLAYING'
const UPDATE_HOSTING = 'UPDATE_HOSTING'
const SELECT_GAME = 'SELECT_GAME'

export function updateCodeText (message, code) {
  return {
    type: UPDATE_CODE_TEXT,
    message,
    code
  }
}

function updatePlaying (playing) {
  return {
    type: UPDATE_PLAYING,
    playing
  }
}

function updateHosting (hosting) {
  return {
    type: UPDATE_HOSTING,
    hosting
  }
}

export function selectGame (game) {
  const players = _.sortBy(Object.values(game.players || {}), ['score']).reverse()
  return {
    type: SELECT_GAME,
    game,
    players
  }
}

export function fetchAndSetPlayingListener () {
  return function (dispatch, getState) {
    const { authentication } = getState()
    ref.child(`playing/${authentication.authedId}`).on('value', (snapshot) => {
      if (snapshot.exists()) {
        let games = {}
        let count = 0
        snapshot.forEach((childSnapshot) => {
          count++
          ref.child(`games/${childSnapshot.key}`).on('value', (snapshot) => {
            games[snapshot.key] = snapshot.val()
            if (_.size(games) === count) {
              dispatch(updatePlaying(games))
            }
          })
        })
      } else {
        dispatch(updatePlaying([], []))
      }
    })
  }
}

export function fetchAndSetHostingListener () {
  return function (dispatch, getState) {
    const { authentication } = getState()
    ref.child(`hosting/${authentication.authedId}`).on('value', (snapshot) => {
      if (snapshot.exists()) {
        let games = {}
        let count = 0
        snapshot.forEach((childSnapshot) => {
          count++
          ref.child(`games/${childSnapshot.key}`).on('value', (snapshot) => {
            games[snapshot.key] = snapshot.val()
            if (_.size(games) === count) {
              dispatch(updateHosting(games))
            }
          })
        })
      } else {
        dispatch(updateHosting([], []))
      }
    })
  }
}

export function saveGameFanout (puids) {
  return function (dispatch, getState) {
    const store = getState()
    const { users, friends } = store
    const { message, code } = store.games
    const players = _.reduce(friends.friends, (player, friend) => {
      if (_.includes(puids, friend.uid)) {
        friend.guess = ''
        friend.score = 0
        player[friend.uid] = friend
      }
      return player
    }, {})
    const tokens = _.map(Object.values(players), 'token')
    const game = {
      players,
      message,
      code,
      completed: false,
      host: users.user,
      timestamp: Date.now()
    }
    const { gid, gamePromise } = createGame(game)
    const { uid, displayName } = users.user
    return Promise.all([
      gamePromise,
      saveToGamesHosting(gid, uid),
      sendNotification(tokens, 'Game Invite!', `You are playing in ${displayName}'s game!`),
      puids.forEach((puid) => saveToGamesPlaying(gid, puid))
    ])
  }
}

export function saveGuess (gid, guess) {
  return function (dispatch, getState) {
    const { authentication, users, games } = getState()
    const { token } = games.game.host
    const { message } = games.game
    const { displayName } = users.user
    const score = longestCommonSubstring(message.toLowerCase().trim(), guess.toLowerCase().trim())
    return Promise.all([
      saveGuessToGames(gid, authentication.authedId, guess, score),
      sendNotification([token], 'Player Guessed', `${displayName} has made a guess!`)
    ])
  }
}

export function releaseScoreAndCompleteGame (game) {
  return function (dispatch, getState) {
    const { authentication, games } = getState()
    const tokens = _.map(Object.values(games.game.players), 'token')
    const { displayName } = games.game.host
    return Promise.all([
      completeGame(game.gid),
      removeFromGamesHosting(game.gid, authentication.authedId),
      saveToGamesCompleted(game.gid, authentication.authedId),
      sendNotification(tokens, 'Game Results', `${displayName} has released the results!`)
    ])
  }
}

export function completeGamePlaying (game) {
  return function (dispatch, getState) {
    const { authentication } = getState()
    return Promise.all([
      removeFromGamesPlaying(game.gid, authentication.authedId),
      saveToGamesCompleted(game.gid, authentication.authedId)
    ])
  }
}

function longestCommonSubstring (message, guess) {
  let longestCommonSubstring = 0
  let table = []
  for (let row = 0; row <= message.length; row++) {
    table[row] = []
    for (let col = 0; col <= guess.length; col++) {
      table[row][col] = 0
    }
  }
  for (let i = 0; i < message.length; i++) {
    for (let j = 0; j < guess.length; j++) {
      if (message[i] === guess[j]) {
        if (table[i][j] === 0) {
          table[i + 1][j + 1] = 1
        } else {
          table[i + 1][j + 1] = table[i][j] + 1
        }
        if (table[i + 1][j + 1] > longestCommonSubstring) {
          longestCommonSubstring = table[i + 1][j + 1]
        }
      } else {
        table[i + 1][j + 1] = 0
      }
    }
  }
  return longestCommonSubstring
}

const initialState = {
  message: '',
  code: '',
  playing: {},
  hosting: {},
  plistenerSet: false,
  hlistenerSet: false,
  game: {},
  players: {}
}

export default function games (state = initialState, action) {
  switch (action.type) {
    case UPDATE_CODE_TEXT :
      return {
        ...state,
        message: action.message,
        code: action.code
      }
    case UPDATE_PLAYING :
      return {
        ...state,
        playing: action.playing,
        plistenerSet: true
      }
    case UPDATE_HOSTING :
      return {
        ...state,
        hosting: action.hosting,
        hlistenerSet: true
      }
    case SELECT_GAME :
      return {
        ...state,
        game: action.game,
        players: action.players
      }
    default :
      return state
  }
}
