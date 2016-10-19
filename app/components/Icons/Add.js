import React, { PropTypes } from 'react'
import { View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '~/styles'

export default function Add (props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <View style={{height: 40, width: 40, justifyContent: 'center', alignItems: 'center'}}>
        <Icon
          name='md-add'
          size={props.size}
          color={colors.icon} />
      </View>
    </TouchableOpacity>
  )
}

Add.propTypes = {
  size: PropTypes.number.isRequired,
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired
}

Add.defaultProps = {
  size: 30
}
