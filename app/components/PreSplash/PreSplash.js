import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { colors, fontSizes } from '~/styles'

export default function PreSplash (props) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Loading...
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    width: 300,
    padding: 10,
    fontSize: fontSizes.primary,
    color: colors.blue,
    textAlign: 'center'
  }
})
