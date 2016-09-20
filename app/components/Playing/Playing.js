import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native'
import { AppNavbar, Gear, Hamburger } from '~/components'

Playing.propTypes = {
  openDrawer: PropTypes.func,
  handleToSettings: PropTypes.func.isRequired,
}

export default function Playing (props) {
  return (
    <View>
    <AppNavbar
      title='Playing'
      leftButton={Platform.OS === 'android' ? <Hamburger onPress={props.openDrawer} /> : null}
      rightButton={<Gear onPress={props.handleToSettings}/>} />
      <Text>
        Playing
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({

})
