import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { colors } from '~/styles'

export default function PreSplash (props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={colors.white} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
