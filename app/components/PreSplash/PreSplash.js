import React, { PropTypes } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { colors, fontSizes } from '~/styles'

export default function PreSplash (props) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        PreSplash
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: fontSizes.primary
  }
})
