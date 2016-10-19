import React, { PropTypes } from 'react'
import { Platform } from 'react-native'
import NavigationBar from 'react-native-navbar'
import { colors } from '~/styles'

export default function AppNavbar (props) {
  let optionalAttrs = {}
  props.leftButton && (optionalAttrs.leftButton = React.cloneElement(props.leftButton, {
    style: {justifyContent: 'center'}
  }))
  props.rightButton && (optionalAttrs.rightButton = React.cloneElement(props.rightButton, {
    style: {justifyContent: 'center'}
  }))
  return (
    <NavigationBar
      {...optionalAttrs}
      style={Platform.OS === 'android' ? {marginTop: 8, marginBottom: 8} : null}
      tintColor={colors.navbar}
      title={{title: props.title, tintColor: colors.white}}/>
  )
}

AppNavbar.propTypes = {
  title: PropTypes.string.isRequired,
  rightButton: PropTypes.element,
  leftButton: PropTypes.element
}
