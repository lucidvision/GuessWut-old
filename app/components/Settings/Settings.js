import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { AppNavbar, Button } from '~/components'
import { colors, fontSizes } from '~/styles'

export default function Settings (props) {
  return (
    <View style={styles.container}>
      <AppNavbar
        title='Settings'
        leftButton={<Button text={'Close'} onPress={props.onBack}/>}
        rightButton={<Button text={'Save'} onPress={props.onSave}/>} />
      <TextInput
        style={styles.nameInput}
        maxLength={30}
        autoCapitalize={'none'}
        autoCorrect={false}
        onChangeText={(text) => props.changeName(text)}
        value={props.name}
        placeholder='Name' />
      <TouchableOpacity onPress={props.onLogout} style={styles.logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

Settings.propTypes = {
  name: PropTypes.string.isRequired,
  changeName: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  logout: {
    backgroundColor: colors.blue,
    alignItems: 'stretch',
    borderRadius: 25,
    margin: 25,
    padding: 10
  },
  logoutText: {
    color: colors.white,
    fontSize: fontSizes.secondary,
    textAlign: 'center'
  },
  nameInput: {
    height: 40,
    borderColor: colors.blue,
    borderWidth: 1,
    padding: 10,
    margin: 10
  }
})
