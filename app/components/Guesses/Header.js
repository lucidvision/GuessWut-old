import React, { PropTypes } from 'react'
import { StyleSheet, Text } from 'react-native'
import { colors, fontSizes } from '~/styles'

export default function Request (props) {
  return (
    <Text style={styles.headerText}>{props.text}</Text>
  )
}

Request.propTypes = {
  text: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  headerText: {
    padding: 20,
    fontSize: fontSizes.primary,
    color: colors.primary
  }
})
