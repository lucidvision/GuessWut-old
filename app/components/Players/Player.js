import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors, fontSizes } from '~/styles'

export default function Player (props) {
  return (
    <TouchableOpacity onPress={() => props.onPlayerSelected(props.uid)}>
      <View style={props.selected ? styles.containerSelected : styles.container}>
        <Text style={styles.nameText}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onPlayerSelected: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.border
  },
  containerSelected: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.blue
  },
  nameText: {
    flex: 1,
    padding: 10,
    fontSize: fontSizes.secondary,
    color: colors.primary
  }
})
