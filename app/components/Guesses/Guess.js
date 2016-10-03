import React, { PropTypes } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { colors, fontSizes } from '~/styles'

export default function Guess (props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.nameText}>{props.player.displayName}</Text>
        <Text style={styles.scoreText}>Score: {props.player.score}</Text>
      </View>
      <Text style={styles.guessText}>{props.player.guess}</Text>
    </View>
  )
}

Guess.propTypes = {
  player: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.border
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nameText: {
    flex: 2,
    padding: 10,
    fontSize: fontSizes.primary,
    color: colors.blue
  },
  scoreText: {
    flex: 1,
    padding: 10,
    fontSize: fontSizes.secondary,
    color: colors.primary,
    textAlign: 'right'
  },
  guessText: {
    flex: 1,
    padding: 10,
    fontSize: fontSizes.secondary,
    color: colors.primary
  }
})
