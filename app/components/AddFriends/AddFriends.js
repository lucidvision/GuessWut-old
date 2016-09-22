import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ListView, ActivityIndicator } from 'react-native'
import { AppNavbar, Close } from '~/components'
import { colors, fontSizes } from '~/styles'
import _ from 'lodash'

export default function AddFriends (props) {
  function onUpdateSearchText (text) {
    props.updateSearchText(text)
    props.findFriend(text)
  }
  return (
    <View style={styles.container}>
      <AppNavbar
        title='Add Friends'
        leftButton={<Close onPress={props.onBack}/>} />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchText}
          maxLength={30}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={(text) => onUpdateSearchText(text)}
          value={props.searchText}
          placeholder='Search by email' />
      </View>
      {props.searchText.length > 0
        ? <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{!_.isEmpty(props.userFound) ? 'User Found!' : 'User not found.'}</Text>
            {!_.isEmpty(props.userFound)
              ? <TouchableOpacity
                  style={styles.addButton}
                  onPress={props.onAddPressed}>
                  <Text style={styles.addButtonText}>Add+</Text>
                </TouchableOpacity>
              : null}
          </View>
        : null}
      <View style={styles.listContainer}>
        {props.listenerSet === false
          ? <ActivityIndicator size='small' style={styles.activityIndicator} color={colors.secondary} />
          : props.showRequests
            ? <ListView
                renderHeader={props.renderHeader}
                renderRow={props.renderRow}
                dataSource={props.dataSource} />
            : <Text style={styles.noRequestsText}>No Friend Requests</Text>}
      </View>
    </View>
  )
}

AddFriends.propTypes = {
  onBack: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  userFound: PropTypes.object.isRequired,
  findFriend: PropTypes.func.isRequired,
  onAddPressed: PropTypes.func.isRequired,
  showRequests: PropTypes.bool.isRequired,
  dataSource: PropTypes.object.isRequired,
  renderHeader: PropTypes.func.isRequired,
  renderRow: PropTypes.func.isRequired,
  listenerSet: PropTypes.bool.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  searchContainer: {
    marginTop: 30,
    padding: 10
  },
  searchText: {
    height: 40,
    borderColor: colors.blue,
    borderWidth: 1,
    paddingLeft: 10
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  resultText: {
    padding: 10,
    color: colors.blue,
    fontSize: fontSizes.secondary
  },
  addButton: {
    backgroundColor: colors.blue,
    borderRadius: 25,
    padding: 10,
    marginRight: 10
  },
  addButtonText: {
    color: colors.white,
    fontSize: fontSizes.secondary,
    textAlign: 'center'
  },
  listContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginBottom: 50
  },
  activityIndicator: {
    marginTop: 30
  },
  noRequestsText: {
    padding: 10,
    fontSize: fontSizes.primary,
    color: colors.blue,
    textAlign: 'center'
  }
})
