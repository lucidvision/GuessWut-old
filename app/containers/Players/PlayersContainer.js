import React, { PropTypes, Component } from 'react'
import { ListView } from 'react-native'
import { connect } from 'react-redux'
import { Players, Player } from '~/components'
import { fetchAndSetFriendsListener } from '~/redux/modules/friends'
import { saveGameFanout } from '~/redux/modules/games'
import { showFlashNotification } from '~/redux/modules/flashNotification'
import _ from 'lodash'

class PlayersContainer extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    friends: PropTypes.array.isRequired,
    listenerSet: PropTypes.bool.isRequired
  }
  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: this.ds.cloneWithRows(props.friends),
      friends: props.friends,
      selected: []
    }
  }
  componentDidMount () {
    if (this.props.listenerSet === false) {
      this.props.dispatch(fetchAndSetFriendsListener())
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.friends !== this.props.friends) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.friends)
      })
    }
  }
  handlePlayerSelected = (uid) => {
    let selected
    if (_.includes(this.state.selected, uid)) {
      selected = _.without(this.state.selected, uid)
    } else {
      selected = _.concat(this.state.selected, uid)
    }
    const friends = _.map(_.cloneDeep(this.state.friends), (friend) => {
      if (friend.uid === uid) {
        friend.selected = !friend.selected
      }
      return friend
    })
    this.setState({
      dataSource: this.ds.cloneWithRows(friends),
      friends,
      selected
    })
  }
  handleSendButtonPressed = () => {
    this.props.dispatch(saveGameFanout(this.state.selected))
      .then(() => {
        this.props.navigator.popToTop()
        this.props.dispatch(showFlashNotification({text: 'Game sent!'}))
      })
  }
  renderRow = ({displayName, selected, uid}) => {
    return (
      <Player
        uid={uid}
        selected={selected || false}
        name={displayName}
        onPlayerSelected={this.handlePlayerSelected} />
    )
  }
  render () {
    return (
      <Players
        friends={this.props.friends}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        listenerSet={this.props.listenerSet}
        showSendButton={this.state.selected.length > 0}
        onSendButtonPressed={this.handleSendButtonPressed}
        onBack={this.props.navigator.pop} />
    )
  }
}

function mapStateToProps ({friends}) {
  return {
    friends: friends.friends,
    listenerSet: friends.listenerSet
  }
}

export default connect(mapStateToProps)(PlayersContainer)
