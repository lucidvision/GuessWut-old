import React, { PropTypes } from 'react'
import { View, Text, StyleSheet, Platform, ActivityIndicator, ListView } from 'react-native'
import { AppNavbar, Hamburger, Add } from '~/components'
import { colors, fontSizes } from '~/styles'

export default function Friends (props) {
  return (
    <View style={styles.container}>
      <AppNavbar
        title='Friends'
        leftButton={Platform.OS === 'android' ? <Hamburger onPress={props.openDrawer} /> : null}
        rightButton={<Add onPress={props.handleToAddFriend}/>} />
      <View style={styles.listContainer}>
        {props.listenerSet === false
          ? <ActivityIndicator size='small' style={styles.activityIndicator} color={colors.secondary} />
          : props.friends.length > 0
            ? <ListView
                enableEmptySections
                automaticallyAdjustContentInsets={false}
                renderRow={props.renderRow}
                dataSource={props.dataSource} />
            : <Text style={styles.noFriendsText}>You don't have any friends yet</Text>}
      </View>
    </View>
  )
}

Friends.propTypes = {
  openDrawer: PropTypes.func,
  handleToAddFriend: PropTypes.func.isRequired,
  friends: PropTypes.array.isRequired,
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
  noFriendsText: {
    padding: 10,
    fontSize: fontSizes.primary,
    color: colors.blue,
    marginTop: 100,
    textAlign: 'center'
  }
})
