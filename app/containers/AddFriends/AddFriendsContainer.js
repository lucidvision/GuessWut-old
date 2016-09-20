import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import { AddFriends } from '~/components'

export default class AddFriendsContainer extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }
  state = {}
  render () {
    return (
      <AddFriends onBack={this.props.navigator.pop} />
    )
  }
}
