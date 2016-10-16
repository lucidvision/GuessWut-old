import React, { PropTypes } from 'react'
import { View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '~/styles'

export default function Back (props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <View style={{height: 40, width: 40, justifyContent: 'center', alignItems: 'center'}}>
        <Icon
          name='ios-arrow-back'
          size={props.size}
          color={colors.blue} />
      </View>
    </TouchableOpacity>
  )
}

Back.propTypes = {
  size: PropTypes.number.isRequired,
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired
}

Back.defaultProps = {
  size: 30
}
