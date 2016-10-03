import React, { PropTypes } from 'react'
import { View, StyleSheet } from 'react-native'
import DrawerHeader from './DrawerHeader'
import DrawerTab from './DrawerTab'

export default function Drawer (props) {
  return (
    <View style={styles.container}>
      <DrawerHeader />
      <DrawerTab
        title='Playing'
        selected={props.activeFooterTab === 'playing'}
        onPress={() => {
          props.onTabSelect('playing')
          props.close()
        }}
        iconName='ios-trophy-outline' />
      <DrawerTab
        title='Hosting'
        selected={props.activeFooterTab === 'hosting'}
        onPress={() => {
          props.onTabSelect('hosting')
          props.close()
        }}
        iconName='ios-home-outline' />
      <DrawerTab
        title='Friends'
        selected={props.activeFooterTab === 'friends'}
        onPress={() => {
          props.onTabSelect('friends')
          props.close()
        }}
        iconName='ios-contacts-outline' />
    </View>
  )
}

Drawer.propTypes = {
  activeFooterTab: PropTypes.string.isRequired,
  onTabSelect: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
