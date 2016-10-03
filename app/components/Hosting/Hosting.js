import React, { PropTypes } from 'react'
import { View, Text, StyleSheet, Platform, ActivityIndicator, ListView } from 'react-native'
import { AppNavbar, Hamburger, Add } from '~/components'
import { colors, fontSizes } from '~/styles'

export default function Hosting (props) {
  return (
    <View style={styles.container}>
      <AppNavbar
        title='Hosting'
        leftButton={Platform.OS === 'android' ? <Hamburger onPress={props.openDrawer} /> : null}
        rightButton={<Add onPress={props.handleToCreate}/>}/>
      <View style={styles.listContainer}>
        {props.listenerSet === false
          ? <ActivityIndicator size='small' style={styles.activityIndicator} color={colors.secondary} />
          : props.hosting.length > 0
            ? <ListView
                enableEmptySections
                automaticallyAdjustContentInsets={false}
                renderRow={props.renderRow}
                dataSource={props.dataSource} />
            : <Text style={styles.noGamesText}>You're not hosting any games</Text>}
      </View>
    </View>
  )
}

Hosting.propTypes = {
  openDrawer: PropTypes.func,
  handleToCreate: PropTypes.func.isRequired,
  hosting: PropTypes.array.isRequired,
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
