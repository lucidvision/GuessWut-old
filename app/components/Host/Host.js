import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, ListView } from 'react-native'
import { AppNavbar, Button } from '~/components'
import { colors, fontSizes } from '~/styles'

export default function Host (props) {
  return (
    <View style={styles.container}>
      <AppNavbar
        title='Host Game'
        leftButton={<Button text={'Close'} onPress={props.onBack}/>}
        rightButton={props.authedId === props.game.host.uid
                      ? <Button text={'Send'} onPress={props.onScorePressed} />
                      : null} />
      <View style={styles.gameContainer}>
        <View>
          <Text style={styles.promptText}>Your Message</Text>
          <Text style={styles.codeText}>{props.game.message}</Text>
        </View>
        <View>
          <Text style={styles.promptText}>Code</Text>
          <Text style={styles.codeText}>{props.game.code}</Text>
        </View>
        <ListView
          enableEmptySections
          renderHeader={props.renderHeader}
          renderRow={props.renderRow}
          dataSource={props.dataSource} />
      </View>
    </View>
  )
}

Host.propTypes = {
  authedId: PropTypes.string.isRequired,
  game: PropTypes.object.isRequired,
  dataSource: PropTypes.object.isRequired,
  renderHeader: PropTypes.func.isRequired,
  renderRow: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onScorePressed: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  promptText: {
    padding: 10,
    fontSize: fontSizes.primary,
    color: colors.blue,
    textAlign: 'center'
  },
  codeText: {
    flex: 1,
    color: colors.primary,
    margin: 10,
    padding: 10,
    fontSize: fontSizes.secondary
  }
})
