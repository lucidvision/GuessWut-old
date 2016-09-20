import React, { PropTypes } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { AppNavbar, Close } from '~/components'
import { colors, fontSizes } from '~/styles'

Create.propTypes = {
  onBack: PropTypes.func.isRequired,
}

export default function Create (props) {
  return (
    <View style={styles.container}>
      <AppNavbar
        title='Create Game'
        leftButton={<Close onPress={props.onBack}/>} />
      <Text>
        Create
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
})
