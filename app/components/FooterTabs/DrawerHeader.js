import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

export default function DrawerHeader (props) {
  return (
    <View style={styles.header}>
      <Image style={styles.image} source={require('../../images/CodeLogo.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  image: {
    resizeMode: 'contain',
    height: 90
  }
})
