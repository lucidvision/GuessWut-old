import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { AppNavbar, Close } from '~/components'
import { colors, fontSizes } from '~/styles'

Settings.propTypes = {
  onBack: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
}

export default function Settings (props) {
  return (
    <View style={styles.container}>
      <AppNavbar
        title='Settings'
        leftButton={<Close onPress={props.onBack}/>} />
      <TouchableOpacity onPress={props.onLogout} style={styles.logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  logout: {
    backgroundColor: colors.blue,
    alignItems: 'stretch',
    borderRadius: 25,
    margin: 25,
    padding: 10,
  },
  logoutText: {
    color: colors.white,
    fontSize: fontSizes.secondary,
    textAlign: 'center',
  },
})
