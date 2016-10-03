import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { colors, fontSizes } from '~/styles'

export default function DrawerHeader (props) {
  return (
    <View>
      <Text style={styles.headerText}>
        Coder
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerText: {
    padding: 10,
    fontSize: fontSizes.primary,
    color: colors.blue,
    textAlign: 'center'
  }
})
