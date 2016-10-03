import React, { PropTypes } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { colors } from '~/styles'

export default function Score (props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Text style={{color: colors.blue}}>Score</Text>
    </TouchableOpacity>
  )
}

Score.propTypes = {
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired
}
