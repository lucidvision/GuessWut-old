import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors, fontSizes } from '~/styles'
import _ from 'lodash'

export default function Game (props) {
  const guessedCount = _.size(props.game.guessed)
  const playersCount = _.size(props.game.players)
  return (
    <TouchableOpacity onPress={() => props.onGameSelected(props.game)}>
      <View style={styles.container}>
        <Text style={styles.codeText}>{props.game.code}</Text>
        {guessedCount === playersCount
          ? props.game.completed
            ? <Icon
                style={styles.icon}
                name='ios-alert-outline'
                size={35}
                color={colors.blue} />
            : <Icon
                style={styles.icon}
                name='ios-checkmark-circle-outline'
                size={35}
                color={colors.blue} />
          : <Text style={styles.countText}>{`${guessedCount} / ${playersCount}`}</Text>}
      </View>
    </TouchableOpacity>
  )
}

Game.propTypes = {
  game: PropTypes.object.isRequired,
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
    flex: 8,
    padding: 10,
    fontSize: fontSizes.secondary,
    color: colors.primary
  },
  countText: {
    flex: 2,
    padding: 10,
    fontSize: fontSizes.secondary,
    color: colors.blue,
    textAlign: 'right'
  },
  icon: {
    flex: 0.8
  }
})
