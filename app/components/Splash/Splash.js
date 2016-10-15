import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity,
  TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import { colors, fontSizes } from '~/styles'

const dismissKeyboard = require('dismissKeyboard')

export default function Splash (props) {
  return (
    <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
      <TouchableWithoutFeedback onPress={ () => { dismissKeyboard() } }>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Code</Text>
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
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    backgroundColor: colors.white
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 40
  },
  title: {
    color: colors.blue,
    fontSize: 40,
    margin: 20,
    textAlign: 'center'
  },
  loginContainer: {
    alignItems: 'center'
  },
  input: {
    height: 40,
    width: 300,
    borderColor: colors.blue,
    borderWidth: 1,
    padding: 10,
    margin: 10
  },
  loginButton: {
    backgroundColor: colors.blue,
    width: 200,
    borderRadius: 25,
    padding: 10,
    margin: 10
  },
  loginText: {
    color: colors.white,
    fontSize: fontSizes.secondary,
    textAlign: 'center'
  },
  fbLoginContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center'
  },
  fbLoginButton: {
    height: 30,
    width: 180,
    marginBottom: 15
  },
  assuranceText: {
    color: colors.secondary,
    fontSize: fontSizes.secondary,
    textAlign: 'center'
  }
})
