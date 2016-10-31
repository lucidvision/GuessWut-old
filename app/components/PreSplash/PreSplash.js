import React from 'react'
import { View, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native'
import { colors } from '~/styles'
const { height } = Dimensions.get('window')

export default function PreSplash (props) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../images/CodeLogo.png')} />
      <ActivityIndicator size='large' color={colors.secondary} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  image: {
    resizeMode: 'contain'
  }
})
