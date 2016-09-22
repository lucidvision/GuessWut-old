import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors, fontSizes } from '~/styles'

export default function Friend (props) {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{props.name}</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => props.onRemovePressed(props.fuid)}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  )
}

Friend.propTypes = {
  name: PropTypes.string.isRequired,
  onRemovePressed: PropTypes.func.isRequired
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
    padding: 10,
    fontSize: fontSizes.secondary,
    color: colors.primary
  },
  removeButton: {
    backgroundColor: colors.blue,
    borderRadius: 25,
    padding: 10,
    marginRight: 10
  },
  removeButtonText: {
    color: colors.white,
    fontSize: fontSizes.secondary,
    textAlign: 'center'
  }
})
