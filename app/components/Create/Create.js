import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { AppNavbar, Button } from '~/components'
import { colors, fontSizes } from '~/styles'

export default function Create (props) {
  return (
    <View style={styles.container}>
      <AppNavbar
        title='Create Game'
        leftButton={<Button text={'Close'} onPress={props.onBack}/>} />
      <View style={styles.messageContainer}>
        <View>
          <Text style={styles.promptText}>Type in a message</Text>
          <TextInput
            multiline
            autoCapitalize='none'
            autoCorrect={false}
            style={styles.messageInput}
            onChangeText={(text) => props.changeMessage(text)}
            value={props.message} />
        </View>
        <View>
          <Text style={styles.promptText}>Code</Text>
          <Text style={styles.codeText}>{props.code}</Text>
        </View>
        <TouchableOpacity
          style={props.message.length > 0 ? styles.createButton : styles.disabledButton}
          onPress={props.onCreateButtonPressed}>
          <Text style={styles.createButtonText}>Create game</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  messageContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  promptText: {
    padding: 10,
    fontSize: fontSizes.primary,
    color: colors.blue,
    textAlign: 'center'
  },
  messageInput: {
    height: 100,
    borderColor: colors.blue,
    borderWidth: 1,
    margin: 10,
    padding: 10,
    fontSize: fontSizes.secondary
  },
  codeText: {
    color: colors.blue,
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
