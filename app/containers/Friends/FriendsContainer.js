import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import { Friends } from '~/components'

export default class FriendsContainer extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
  }
  handleToAddFriend = () => {
    this.props.navigator.push({
      addFriends: true
    })
  }
  state = {}
  render () {
    return (
      <Friends
        handleToAddFriend={this.handleToAddFriend}
        openDrawer={this.props.openDrawer} />
    )
  }
}
