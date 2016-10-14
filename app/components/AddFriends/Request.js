import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors, fontSizes } from '~/styles'

export default function Request (props) {
  const { displayName } = props.friend
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{displayName}</Text>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => props.onConfirmPressed(props.friend)}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  )
}

Request.propTypes = {
  friend: PropTypes.object.isRequired,
  onConfirmPressed: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.border
  },
  nameText: {
    flex: 1,
    padding: 10,
    fontSize: fontSizes.secondary,
    color: colors.primary
  },
  confirmButton: {
    backgroundColor: colors.blue,
    borderRadius: 25,
    padding: 10,
    marginRight: 10
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: fontSizes.secondary,
    textAlign: 'center'
  }
})
