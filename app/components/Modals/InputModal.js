import React, { PropTypes } from 'react'
import { View, Modal, Text, TextInput,
  TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')
import { colors, fontSizes } from '~/styles'

export default function InputModal (props) {
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => props.onButtonPressed('Cancel')}>
      <View style={styles.modalContainer}>
        <Text style={styles.promptText}>{props.prompt}</Text>
        <TextInput
          style={styles.nameInput}
          maxLength={30}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={text => props.changeText(text)}
          value={props.value}
          placeholder={props.placeholder} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.onButtonPressed('Cancel')}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.onButtonPressed('Enter')}>
            <Text style={styles.buttonText}>Enter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

InputModal.propTypes = {
  prompt: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  changeText: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool.isRequired
}

const styles = StyleSheet.create({
  modalContainer: {
    height: 200,
    width: width - 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.blue,
    backgroundColor: colors.white,
    marginTop: 100,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  promptText: {
    padding: 10,
    fontSize: fontSizes.primary,
    color: colors.blue,
    textAlign: 'center'
  },
  nameInput: {
    height: 40,
    width: 300,
    borderColor: colors.blue,
    borderWidth: 1,
    padding: 10,
    margin: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: colors.blue,
    borderRadius: 25,
    padding: 10,
    margin: 10
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSizes.secondary,
    textAlign: 'center'
  }
})
