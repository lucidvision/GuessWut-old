import React, { PropTypes, Component } from 'react'
import { Splash } from '~/components'
import { connect } from 'react-redux'
import { handleAuthWithFirebase, handleFacebookAuthWithFirebase } from '~/redux/modules/authentication'

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
  handleLoginFinished = (error, result) => {
    if (error) {
      console.warn('Error in handleLoginFinished: ', error)
    } else if (result.isCancelled === true) {
      console.log('Auth Cancelled')
    } else {
      this.props.dispatch(handleFacebookAuthWithFirebase())
    }
  }
  render () {
    return (
      <Splash
        email={this.state.email}
        password={this.state.password}
        changeEmail={email => this.setState({email})}
        changePassword={password => this.setState({password})}
        onLoginPressed={this.handleLoginPressed}
        onLoginFinished={this.handleLoginFinished} />
    )
  }
}

export default connect()(SplashContainer)
