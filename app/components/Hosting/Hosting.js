import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native'
import { AppNavbar, Hamburger, Add } from '~/components'

Hosting.propTypes = {
  openDrawer: PropTypes.func,
  handleToCreate: PropTypes.func.isRequired,
}

export default function Hosting (props) {
  return (
    <View>
      <AppNavbar
        title='Hosting'
        leftButton={Platform.OS === 'android' ? <Hamburger onPress={props.openDrawer} /> : null}
        rightButton={<Add onPress={props.handleToCreate}/>}/>
      <Text>
        Hosting
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({

})
