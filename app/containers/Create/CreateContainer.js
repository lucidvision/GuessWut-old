import React, { PropTypes, Component } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { Create } from '~/components'
import { updateCodeText } from '~/redux/modules/games'
import { minimumWordLength, maximumWordLength } from '~/config/constants'

class CreateContainer extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  state = {
    message: '',
    code: ''
  }
  handleChangeMessage = (message) => {
    const code = this.shuffle(message).trim()
    this.setState({message, code})
  }
  shuffle = (text) => {
    let shuffled = text.split(' ')
    for (let i = 0; i < shuffled.length; i++) {
      let j = Math.floor(Math.random() * (i + 1))
      let tmp = shuffled[i]
      shuffled[i] = shuffled[j]
      shuffled[j] = tmp
    }
    return shuffled.join(' ')
  }
  handleCreateButtonPressed = () => {
    if (this.state.message.length < minimumWordLength || this.state.message.length > maximumWordLength) {
      Alert.alert(
        'Message Length',
        `Your message needs to be between ${minimumWordLength} and ${maximumWordLength} words long.`
      )
    } else {
      this.props.dispatch(updateCodeText(this.state.message, this.state.code))
      this.props.navigator.push({players: true})
    }
  }
  render () {
    return (
      <Create
        message={this.state.message}
        code={this.state.code}
        changeMessage={this.handleChangeMessage}
        onCreateButtonPressed={this.handleCreateButtonPressed}
        onBack={this.props.navigator.pop} />
    )
  }
}

export default connect()(CreateContainer)
