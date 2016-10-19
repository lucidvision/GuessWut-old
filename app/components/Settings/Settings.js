import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity,
  TouchableWithoutFeedback } from 'react-native'
import { AppNavbar, Button } from '~/components'
import { colors, fontSizes } from '~/styles'

const dismissKeyboard = require('dismissKeyboard')

export default function Settings (props) {
  return (
    <TouchableWithoutFeedback onPress={ () => { dismissKeyboard() } }>
      <View style={styles.container}>
        <AppNavbar
          title='Settings'
          leftButton={<Button text={'Close'} onPress={props.onBack}/>}
          rightButton={<Button text={'Save'} onPress={props.onSave}/>} />
        <View style={styles.nameContainer}>
          <Text style={styles.nameHeader}>Your Name</Text>
          <TextInput
            style={styles.nameInput}
            maxLength={30}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={(text) => props.changeName(text)}
            value={props.name}
            placeholder='Name' />
        </View>
        <TouchableOpacity onPress={props.onLogout} style={styles.logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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
  nameContainer: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    padding: 10
  },
  nameHeader: {
    color: colors.primary,
    fontSize: fontSizes.primary,
    padding: 10
  },
  nameInput: {
    height: 40,
    borderColor: colors.blue,
    borderWidth: 1,
    padding: 10,
    margin: 10
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
  }
})
