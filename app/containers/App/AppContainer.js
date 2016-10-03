import React, { PropTypes, Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { AppNavigator } from '~/containers'
import { PreSplash, FlashNotification, InputModal } from '~/components'
import { firebaseAuth } from '~/config/constants'
import { fetchUser } from '~/api/users'
import { notAuthed, onAuthChange } from '~/redux/modules/authentication'
import { hideFlashNotification } from '~/redux/modules/flashNotification'
import _ from 'lodash'

class AppContainer extends Component {
  static propTypes = {
    isAuthenticating: PropTypes.bool.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    flashNotificationIsPermanent: PropTypes.bool.isRequired,
    flashNotificationLocation: PropTypes.string.isRequired,
    flashNotificationText: PropTypes.string.isRequired,
    showFlashNotification: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  state = {
    name: '',
    user: {},
    showModal: false
  }
  componentDidMount () {
    firebaseAuth.onAuthStateChanged((user) => {
      if (!user) {
        this.props.dispatch(notAuthed())
      } else {
        fetchUser(user.uid).then((userInfo) => {
          if (_.isEmpty(userInfo)) {
            if (_.isEmpty(user.displayName)) {
              const {uid, email} = user
              this.setState({
                user: {uid, email},
                showModal: true
              })
            } else {
              this.props.dispatch(onAuthChange(user))
            }
          } else {
            this.props.dispatch(onAuthChange(userInfo))
          }
        })
      }
    })
  }
  handleHideNotification = () => {
    this.props.dispatch(hideFlashNotification())
  }
  handleModalButtonPressed = (type) => {
    if (type === 'Enter') {
      const user = this.state.user
      user.displayName = this.state.name
      this.props.dispatch(onAuthChange(user))
      this.setState({
        name: '',
        user: {},
        showModal: false
      })
    }
  }
  render () {
    return (
      <View style={{flex: 1}}>
        <InputModal
          prompt={'Please enter your name'}
          placeholder={'Your Name'}
          value={this.state.name}
          changeText={name => this.setState({name})}
          onButtonPressed={this.handleModalButtonPressed}
          modalVisible={this.state.showModal} />
        {this.props.isAuthenticating === true
          ? <PreSplash />
          : <AppNavigator isAuthed={this.props.isAuthed} />}
        {this.props.showFlashNotification === true
          ? <FlashNotification
              permanent={this.props.flashNotificationIsPermanent}
              location={this.props.flashNotificationLocation}
              text={this.props.flashNotificationText}
              onHideNotification={this.handleHideNotification}/>
          : null}
      </View>
    )
  }
}

function mapStateToProps ({authentication, flashNotification}) {
  return {
    isAuthenticating: authentication.isAuthenticating,
    isAuthed: authentication.isAuthed,
    flashNotificationIsPermanent: flashNotification.permanent,
    flashNotificationLocation: flashNotification.location,
    flashNotificationText: flashNotification.text,
    showFlashNotification: flashNotification.showFlashNotification
  }
}

export default connect(mapStateToProps)(AppContainer)
