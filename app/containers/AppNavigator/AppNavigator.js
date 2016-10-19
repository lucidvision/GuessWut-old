import React, { PropTypes, Component } from 'react'
import { Navigator, Platform } from 'react-native'
import { SplashContainer, FooterTabsContainer, SettingsContainer, CreateContainer,
  PlayersContainer, AddFriendsContainer, PlayContainer, HostContainer } from '~/containers'

export default class AppNavigator extends Component {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired
  }
  renderScene = (route, navigator) => {
    if (this.props.isAuthed === false) {
      return <SplashContainer navigator={navigator} />
    } else if (route.settings === true) {
      return <SettingsContainer navigator={navigator} />
    } else if (route.create === true) {
      return <CreateContainer navigator={navigator} />
    } else if (route.players === true) {
      return <PlayersContainer navigator={navigator} />
    } else if (route.addFriends === true) {
      return <AddFriendsContainer navigator={navigator} />
    } else if (route.play === true) {
      return <PlayContainer navigator={navigator} />
    } else if (route.host === true) {
      return <HostContainer navigator={navigator} />
    }
    return <FooterTabsContainer navigator={navigator} />
  }
  configureScene = (route) => {
    if (Platform.OS === 'android') {
      return Navigator.SceneConfigs.FloatFromBottomAndroid
    }
    if (route.settings === true || route.create === true || route.addFriends === true || route.home === true) {
      return Navigator.SceneConfigs.FloatFromBottom
    }
    return Navigator.SceneConfigs.FloatFromRight
  }
  render () {
    return (
      <Navigator
        initialRoute={{}}
        renderScene={this.renderScene}
        configureScene={this.configureScene} />
    )
  }
}
