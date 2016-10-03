import React, { PropTypes } from 'react'
import { View, Text, StyleSheet, Platform, ActivityIndicator, ListView } from 'react-native'
import { AppNavbar, Hamburger, Gear } from '~/components'
import { colors, fontSizes } from '~/styles'

export default function Playing (props) {
  return (
    <View style={styles.container}>
      <AppNavbar
        title='Playing'
        leftButton={Platform.OS === 'android' ? <Hamburger onPress={props.openDrawer} /> : null}
        rightButton={<Gear onPress={props.handleToSettings}/>} />
      <View style={styles.listContainer}>
        {props.listenerSet === false
          ? <ActivityIndicator size='small' style={styles.activityIndicator} color={colors.secondary} />
          : props.playing.length > 0
            ? <ListView
                enableEmptySections
                automaticallyAdjustContentInsets={false}
                renderRow={props.renderRow}
                dataSource={props.dataSource} />
            : <Text style={styles.noGamesText}>You're not playing any games</Text>}
      </View>
    </View>
  )
}

Playing.propTypes = {
  openDrawer: PropTypes.func,
  handleToSettings: PropTypes.func.isRequired,
  playing: PropTypes.array.isRequired,
  dataSource: PropTypes.object.isRequired,
  renderRow: PropTypes.func.isRequired,
  listenerSet: PropTypes.bool.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  listContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginBottom: 50
  },
  activityIndicator: {
    marginTop: 30
  },
  noGamesText: {
    padding: 10,
    fontSize: fontSizes.primary,
    color: colors.blue,
    textAlign: 'center'
  }
})
