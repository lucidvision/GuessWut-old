import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native'
import { AppNavbar, Hamburger, Add } from '~/components'

Friends.propTypes = {
  openDrawer: PropTypes.func,
  handleToAddFriend: PropTypes.func.isRequired,
}

export default function Friends (props) {
  return (
    <View>
      <AppNavbar
        title='Friends'
        leftButton={Platform.OS === 'android' ? <Hamburger onPress={props.openDrawer} /> : null}
        rightButton={<Add onPress={props.handleToAddFriend}/>} />
      <Text>
        Friends
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({

})
