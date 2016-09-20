import React, { PropTypes } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { AppNavbar, Close } from '~/components'
import { colors, fontSizes } from '~/styles'

AddFriends.propTypes = {
  onBack: PropTypes.func.isRequired,
}

export default function AddFriends (props) {
  return (
    <View style={styles.container}>
      <AppNavbar
        title='Add Friends'
        leftButton={<Close onPress={props.onBack}/>} />
      <Text>
        AddFriends
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
