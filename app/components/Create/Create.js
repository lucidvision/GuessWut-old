import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity,
  TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import { AppNavbar, Button } from '~/components'
import { colors, fontSizes } from '~/styles'

const dismissKeyboard = require('dismissKeyboard')

export default function Create (props) {
  return (
    <TouchableWithoutFeedback onPress={() => { dismissKeyboard() }}>
      <View style={styles.container}>
        <AppNavbar
          title='Create Game'
          leftButton={<Button text={'Close'} onPress={props.onBack}/>} />
        <KeyboardAvoidingView behavior={'padding'} style={styles.gameContainer}>
          <View style={styles.codeContainer}>
            <Text style={styles.promptText}>Code</Text>
            <Text style={styles.codeText}>{props.code}</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.promptText}>Your Message</Text>
            <TextInput
              autoCapitalize='none'
              autoCorrect={false}
              style={styles.messageInput}
              onChangeText={(text) => props.changeMessage(text)}
              value={props.message}
              placeholder={'Start typing here'} />
          </View>
          <TouchableOpacity
            style={props.message.length > 0 ? styles.createButton : styles.disabledButton}
            disabled={!props.message.length > 0}
            onPress={props.onCreateButtonPressed}>
            <Text style={styles.createButtonText}>Create game</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  )
}

Create.propTypes = {
  message: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  changeMessage: PropTypes.func.isRequired,
  onCreateButtonPressed: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  codeContainer : {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    padding: 10
  },
  promptText: {
    padding: 10,
    fontSize: fontSizes.primary,
    color: colors.primary
  },
  codeText: {
    color: colors.blue,
    margin: 10,
    padding: 10,
    fontSize: fontSizes.secondary
  },
  messageContainer: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    padding: 10
  },
  messageInput: {
    height: 40,
    borderColor: colors.blue,
    borderWidth: 1,
    margin: 10,
    padding: 10,
    fontSize: fontSizes.secondary
  },
  createButton: {
    backgroundColor: colors.blue,
    width: 200,
    height: 100,
    borderRadius: 25,
    padding: 10,
    margin: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  disabledButton: {
    width: 200,
    height: 125
  },
  createButtonText: {
    color: colors.white,
    fontSize: fontSizes.primary
  }
})
