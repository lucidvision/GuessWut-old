import React, { PropTypes } from 'react'
import { View, Text, StyleSheet, ActivityIndicator,
  ListView, TouchableOpacity } from 'react-native'
import { AppNavbar, Back } from '~/components'
import { colors, fontSizes } from '~/styles'

export default function Players (props) {
  return (
    <View style={styles.container}>
      <AppNavbar
        title='Select Players'
        leftButton={<Back onPress={props.onBack}/>} />
      <View style={styles.listContainer}>
        {props.listenerSet === false
          ? <ActivityIndicator
              size='small'
              style={styles.activityIndicator}
              color={colors.secondary} />
          : props.friends.length > 0
            ? <ListView
                enableEmptySections
                renderRow={props.renderRow}
                dataSource={props.dataSource} />
            : <Text style={styles.noFriendsText}>No Friends</Text>}
      </View>
      {props.showSendButton
        ? <TouchableOpacity
            style={styles.sendButton}
            onPress={props.onSendButtonPressed}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        : null
      }
    </View>
  )
}

Players.propTypes = {
  friends: PropTypes.array.isRequired,
  dataSource: PropTypes.object.isRequired,
  renderRow: PropTypes.func.isRequired,
  listenerSet: PropTypes.bool.isRequired,
  showSendButton: PropTypes.bool.isRequired,
  onSendButtonPressed: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.white
  },
  listContainer: {
    flex: 1,
    backgroundColor: colors.white
  },
  activityIndicator: {
    marginTop: 30
  },
  noFriendsText: {
    padding: 10,
    fontSize: fontSizes.primary,
    color: colors.blue,
    textAlign: 'center'
  },
  sendButton: {
    backgroundColor: colors.blue,
    width: 200,
    height: 100,
    borderRadius: 25,
    padding: 10,
    margin: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendButtonText: {
    color: colors.white,
    fontSize: fontSizes.primary
  }
})
