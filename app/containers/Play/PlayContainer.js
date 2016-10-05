import React, { PropTypes, Component } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { Play } from '~/components'
import { saveGuess } from '~/redux/modules/games'
import { minimumWordLength, maximumWordLength } from '~/config/constants'

class PlayContainer extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    game: PropTypes.object.isRequired,
    playerGuess: PropTypes.string.isRequired
  }
  state = {
    guess: ''
  }
  handleChangeGuess = (guess) => {
    this.setState({guess})
  }
  handleSubmitButtonPressed = () => {
    const wordCount = this.state.guess.split(' ').length
    if (wordCount < minimumWordLength || wordCount > maximumWordLength) {
      Alert.alert(
        'Guess Length',
        `Your guess needs to be between ${minimumWordLength} and ${maximumWordLength} words long.`
      )
    } else {
      this.props.dispatch(saveGuess(this.props.game.gid, this.state.guess))
      this.props.navigator.pop()
    }
  }
  render () {
    return (
      <Play
        guess={this.state.guess}
        changeGuess={this.handleChangeGuess}
        playerGuess={this.props.playerGuess}
        game={this.props.game}
        onSubmitButtonPressed={this.handleSubmitButtonPressed}
        onBack={this.props.navigator.pop} />
    )
  }
}

function mapStateToProps ({authentication, games}) {
  const playerGuess = games.game.players[authentication.authedId].guess
  return {
    playerGuess,
    game: games.game
  }
}

export default connect(mapStateToProps)(PlayContainer)
