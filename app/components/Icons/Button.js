import React, { PropTypes } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { colors } from '~/styles'

export default function Button (props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Text style={{color: colors.blue}}>{props.text}</Text>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}
