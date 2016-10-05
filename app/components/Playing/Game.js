import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors, fontSizes } from '~/styles'

export default function Game (props) {
  return (
    <TouchableOpacity onPress={() => props.onGameSelected(props.game)}>
      <View style={styles.container}>
        <Text style={styles.codeText}>{props.game.code}</Text>
        {props.game.completed
          ? <Icon
              name='ios-alert-outline'
              size={40}
              color={colors.blue} />
          : props.guessed
            ? <Icon
                name='ios-checkmark-circle-outline'
                size={40}
                color={colors.blue} />
            : null}
      </View>
    </TouchableOpacity>
  )
}

Game.propTypes = {
  game: PropTypes.object.isRequired,
  guessed: PropTypes.bool.isRequired,
  onGameSelected: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.border
  },
  codeText: {
    padding: 10,
    fontSize: fontSizes.secondary,
    color: colors.primary
  }
})
