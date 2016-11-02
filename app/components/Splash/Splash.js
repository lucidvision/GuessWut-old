import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity,
  TouchableWithoutFeedback } from 'react-native'
import { colors, fontSizes } from '~/styles'

const dismissKeyboard = require('dismissKeyboard')

export default function Splash (props) {
  return (
      <TouchableWithoutFeedback onPress={ () => { dismissKeyboard() } }>
        <View style={styles.container}>
          <Image style={styles.image} source={require('../../images/CodeLogoWhite.png')} />
          <View style={styles.loginContainer}>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              autoCorrect={false}
              maxLength={140}
              keyboardType='email-address'
              returnKeyType='next'
              onSubmitEditing={() => this.password.focus()}
              value={props.email}
              onChangeText={(text) => props.changeEmail(text)}
              placeholder={'Email Address'} />
            <TextInput
              style={styles.input}
              ref={(el) => this.password = el}
              autoCapitalize='none'
              autoCorrect={false}
              maxLength={140}
              secureTextEntry
              returnKeyType='next'
              value={props.password}
              onChangeText={(text) => props.changePassword(text)}
              placeholder={'Password'} />
            <TouchableOpacity
              style={styles.loginButton}
              onPress={props.onLoginPressed}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.promptText}>
            If you don't have an account, one will be created for you.
          </Text>
        </View>
      </TouchableWithoutFeedback>
  )
}

Splash.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeEmail: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  onLoginPressed: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.base
  },
  image: {
    resizeMode: 'contain',
    marginBottom: 60
  },
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 40,
    width: 280,
    borderColor: colors.white,
    backgroundColor: colors.white,
    borderWidth: 1,
    padding: 10,
    margin: 10
  },
  loginButton: {
    backgroundColor: colors.white,
    width: 200,
    borderRadius: 25,
    padding: 10,
    margin: 10
  },
  loginText: {
    color: colors.black,
    fontSize: fontSizes.secondary,
    textAlign: 'center'
  },
  promptText: {
    color: colors.white,
    fontSize: fontSizes.secondary,
    textAlign: 'center',
    margin: 40
  }
})
