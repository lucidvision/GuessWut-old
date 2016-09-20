import React, { PropTypes } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { LoginButton } from 'react-native-fbsdk'
import { colors, fontSizes } from '~/styles'

Splash.propTypes = {
  onLoginFinished: PropTypes.func.isRequired,
}

export default function Splash (props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GuessWut</Text>
      <View style={styles.loginContainer}>
        <LoginButton
          style={styles.loginButton}
          onLoginFinished={props.onLoginFinished} />
        <Text style={styles.assuranceText}>
          Don't worry. We don't post anything to Facebook.
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 40,
  },
  title: {
    color: colors.blue,
    fontSize: 40,
    margin: 20,
    textAlign: 'center',
  },
  loginContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
  },
  loginButton: {
    height: 30,
    width: 180,
    marginBottom: 15,
  },
  assuranceText: {
    color: colors.secondary,
    fontSize: fontSizes.secondary,
    textAlign: 'center',
  }
})
