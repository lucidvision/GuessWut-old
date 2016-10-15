import React, { PropTypes, Component } from 'react'
import { View, Alert, TouchableWithoutFeedback } from 'react-native'
import FCM from 'react-native-fcm'
import { connect } from 'react-redux'
import { AppNavigator } from '~/containers'
import { PreSplash, FlashNotification, InputModal } from '~/components'
import { firebaseAuth } from '~/config/constants'
import { fetchUser } from '~/api/users'
import { notAuthed, onAuthChange } from '~/redux/modules/authentication'
import { hideFlashNotification } from '~/redux/modules/flashNotification'
import _ from 'lodash'

const dismissKeyboard = require('dismissKeyboard')

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
    let token
    FCM.requestPermissions()
    FCM.getFCMToken().then(ntoken => {
      token = ntoken
    })
    this.notificationUnsubscribe = FCM.on('notification', notif => {
      const {title, body} = notif.notification
      if (notif) {
        Alert.alert(title, body)
      }
    })
    this.refreshUnsubscribe = FCM.on('refreshToken', ntoken => {
      token = ntoken
    })
    firebaseAuth.onAuthStateChanged((user) => {
      if (!user) {
        this.props.dispatch(notAuthed())
      } else {
        const {uid, email} = user
        fetchUser(uid).then((userInfo) => {
          if (_.isEmpty(userInfo)) {
            this.setState({
              user: {uid, email, token},
              showModal: true
            })
          } else {
            this.props.dispatch(onAuthChange({token, ...userInfo}))
          }
        })
      }
    })
  }
  componentWillUnmount () {
    this.refreshUnsubscribe()
    this.notificationUnsubscribe()
  }
  handleHideNotification = () => {
    this.props.dispatch(hideFlashNotification())
  }
  handleModalButtonPressed = (type) => {
    if (type === 'Enter') {
      const user = this.state.user
      user.displayName = this.state.name
      this.props.dispatch(onAuthChange(user))
    } else {
      this.props.dispatch(notAuthed())
    }
    this.setState({
      name: '',
      user: {},
      showModal: false
    })
  }
  render () {
    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
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
      </TouchableWithoutFeedback>
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
