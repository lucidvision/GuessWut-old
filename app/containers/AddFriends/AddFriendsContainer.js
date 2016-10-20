import React, { PropTypes, Component } from 'react'
import { ListView } from 'react-native'
import { connect } from 'react-redux'
import { AddFriends } from '~/components'
import { fetchAndSetRequestsListener, updateSearchText, updateUserFound,
  findFriend, sendRequest, confirmRequest } from '~/redux/modules/addFriends'
import Header from '~/components/AddFriends/Header'
import Request from '~/components/AddFriends/Request'
import { showFlashNotification } from '~/redux/modules/flashNotification'
import _ from 'lodash'

const dismissKeyboard = require('dismissKeyboard')

class AddFriendsContainer extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    searchText: PropTypes.string.isRequired,
    userFound: PropTypes.object.isRequired,
    ruids: PropTypes.array.isRequired,
    fuids: PropTypes.array.isRequired,
    requests: PropTypes.array.isRequired,
    listenerSet: PropTypes.bool.isRequired
  }
  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: this.ds.cloneWithRows(props.requests)
    }
  }
  componentDidMount () {
    if (this.props.listenerSet === false) {
      this.props.dispatch(fetchAndSetRequestsListener())
    }
  }
  componentWillMount () {
    this.findFriend = _.debounce(this.findFriend, 1000)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.requests !== this.props.requests) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.requests)
      })
    }
  }
  updateSearchText = (text) => {
    this.props.dispatch(updateSearchText(text))
  }
  findFriend = (text) => {
    this.props.dispatch(findFriend(text))
  }
  handleAddPressed = () => {
    dismissKeyboard()
    this.props.dispatch(sendRequest())
      .then(() => this.props.dispatch(showFlashNotification({text: 'Friend request sent!'})))
      .catch(() => this.props.dispatch(showFlashNotification({text: 'Error with friend request!'})))
  }
  handleConfirmPressed = ({uid, token}) => {
    dismissKeyboard()
    this.props.dispatch(confirmRequest(uid, token))
      .then(() => {
        this.props.dispatch(showFlashNotification({text: 'Friend confirmed!'}))
        this.props.dispatch(updateSearchText(''))
        this.props.dispatch(updateUserFound({}))
      })
      .catch(() => this.props.dispatch(showFlashNotification({text: 'Error confirming friend!'})))
  }
  renderHeader = () => {
    return <Header text={'Friend Requests'}/>
  }
  renderRow = (friend) => {
    return (
      <Request
        friend={friend}
        onConfirmPressed={this.handleConfirmPressed} />
    )
  }
  render () {
    const { uid, displayName } = this.props.userFound
    const isAlreadyFriend = _.includes(this.props.fuids, uid)
    const isAlreadyRequested = _.includes(this.props.ruids, uid)
    const friendFound = !_.isEmpty(this.props.userFound)
    let resultText
    if (isAlreadyFriend) {
      resultText = `${displayName} is already your friend.`
    } else if (isAlreadyRequested) {
      resultText = `${displayName} is waiting for your confirmation.`
    } else if (friendFound) {
      resultText = `${displayName} found!`
    } else {
      resultText = 'User not found.'
    }
    return (
      <AddFriends
        onBack={this.props.navigator.pop}
        searchText={this.props.searchText}
        requests={this.props.requests}
        resultText={resultText}
        showResult={!isAlreadyFriend && !isAlreadyRequested && friendFound}
        updateSearchText={this.updateSearchText}
        findFriend={this.findFriend}
        onAddPressed={this.handleAddPressed}
        dataSource={this.state.dataSource}
        renderHeader={this.renderHeader}
        renderRow={this.renderRow}
        listenerSet={this.props.listenerSet} />
    )
  }
}

function mapStateToProps ({addFriends, friends}) {
  return {
    searchText: addFriends.searchText,
    userFound: addFriends.userFound,
    requests: addFriends.requests,
    ruids: addFriends.ruids,
    fuids: friends.fuids,
    listenerSet: addFriends.listenerSet
  }
}

export default connect(mapStateToProps)(AddFriendsContainer)
