import React, { PropTypes } from 'react'
import { View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '~/styles'

export default function Hamburger (props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <View style={{height: 40, width: 40, justifyContent: 'center', alignItems: 'center'}}>
        <Icon
          name='ios-menu-outline'
          size={props.size}
          color={colors.icon} />
      </View>
    </TouchableOpacity>
  )
}

Hamburger.propTypes = {
  size: PropTypes.number.isRequired,
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired
}

Hamburger.defaultProps = {
  size: 30
}
