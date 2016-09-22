import React, { PropTypes } from 'react'
import { TabBarIOS } from 'react-native'
import { colors } from '~/styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { PlayingContainer, HostingContainer, FriendsContainer } from '~/containers'

export default function FooterTabs (props) {
  return (
    <TabBarIOS tintColor={colors.active}>
      <Icon.TabBarItem
        iconSize={35}
        iconName='ios-home-outline'
        title='Playing'
        selected={props.activeFooterTab === 'playing'}
        onPress={() => props.onTabSelect('playing')}>
          <PlayingContainer navigator={props.navigator}/>
      </Icon.TabBarItem>
      <Icon.TabBarItem
        iconSize={35}
        iconName='ios-trophy-outline'
        title='Hosting'
        selected={props.activeFooterTab === 'hosting'}
        onPress={() => props.onTabSelect('hosting')}>
          <HostingContainer navigator={props.navigator}/>
      </Icon.TabBarItem>
      <Icon.TabBarItem
        iconSize={35}
        iconName='ios-contacts-outline'
        title='Friends'
        selected={props.activeFooterTab === 'friends'}
        onPress={() => props.onTabSelect('friends')}>
          <FriendsContainer navigator={props.navigator}/>
      </Icon.TabBarItem>
    </TabBarIOS>
  )
}

FooterTabs.propTypes = {
  activeFooterTab: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
  onTabSelect: PropTypes.func.isRequired
}
