import React, { PropTypes, Component } from 'react'
import { ListView } from 'react-native'
import { connect } from 'react-redux'
import { AddFriends } from '~/components'
import { fetchAndSetRequestsListener, updateSearchText, findFriend, sendRequest, confirmRequest } from '~/redux/modules/addFriends'
import Header from '~/components/AddFriends/Header'
import Request from '~/components/AddFriends/Request'
import { showFlashNotification } from '~/redux/modules/flashNotification'
import _ from 'lodash'

class AddFriendsContainer extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    searchText: PropTypes.string.isRequired,
    userFound: PropTypes.object.isRequired,
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
    this.props.dispatch(sendRequest())
      .then(() => this.props.dispatch(showFlashNotification({text: 'Friend Request Sent'})))
      .catch(() => this.props.dispatch(showFlashNotification({text: 'Error with Friend Request'})))
  }
  handleConfirmPressed = (fuid) => {
    this.props.dispatch(confirmRequest(fuid))
      .then(() => this.props.dispatch(showFlashNotification({text: 'Friend Confirmed'})))
      .catch(() => this.props.dispatch(showFlashNotification({text: 'Error Confirming Friend'})))
  }
  renderHeader = () => {
    return <Header text={'Friend Requests'}/>
  }
  renderRow = ({displayName, uid}) => {
    return (
      <Request
        name={displayName}
        fuid={uid}
        onConfirmPressed={this.handleConfirmPressed} />
    )
  }
  render () {
    return (
      <AddFriends
        onBack={this.props.navigator.pop}
        searchText={this.props.searchText}
        userFound={this.props.userFound}
        updateSearchText={this.updateSearchText}
        findFriend={this.findFriend}
        onAddPressed={this.handleAddPressed}
        showRequests={this.props.requests.length > 0}
        dataSource={this.state.dataSource}
        renderHeader={this.renderHeader}
        renderRow={this.renderRow}
        listenerSet={this.props.listenerSet} />
    )
  }
}

function mapStateToProps ({addFriends}) {
  return {
    searchText: addFriends.searchText,
    userFound: addFriends.userFound,
    listenerSet: addFriends.listenerSet,
    requests: addFriends.requests
  }
}

export default connect(mapStateToProps)(AddFriendsContainer)
