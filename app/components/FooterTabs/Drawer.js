import React, { PropTypes } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import DrawerHeader from './DrawerHeader'
import DrawerTab from './DrawerTab'

Drawer.propTypes = {
  activeFooterTab: PropTypes.string.isRequired,
  onTabSelect: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
}

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
        iconName='ios-home-outline' />
      <DrawerTab
        title='Hosting'
        selected={props.activeFooterTab === 'hosting'}
        onPress={() => {
          props.onTabSelect('hosting')
          props.close()
        }}
        iconName='ios-trophy-outline' />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
