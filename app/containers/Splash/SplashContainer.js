import React, { PropTypes, Component } from 'react'
import { Splash } from '~/components'
import { connect } from 'react-redux'
import { handleAuthWithFirebase } from '~/redux/modules/authentication'

class SplashContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }
  state = {
    email: '',
    password: ''
  }
  handleLoginPressed = () => {
    const { email, password } = this.state
    this.props.dispatch(handleAuthWithFirebase(email, password))
  }
  render () {
    return (
      <Splash
        email={this.state.email}
        password={this.state.password}
        changeEmail={email => this.setState({email})}
        changePassword={password => this.setState({password})}
        onLoginPressed={this.handleLoginPressed} />
    )
  }
}

export default connect()(SplashContainer)
