import React, { PropTypes, Component } from 'react'
import { ListView, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Hosting } from '~/components'
import Game from '~/components/Hosting/Game'
import { fetchAndSetHostingListener, selectGame } from '~/redux/modules/games'
import _ from 'lodash'

class HostingContainer extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    hosting: PropTypes.array.isRequired,
    friendsCount: PropTypes.number.isRequired,
    listenerSet: PropTypes.bool.isRequired
  }
  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: this.ds.cloneWithRows(props.hosting)
    }
  }
  componentDidMount () {
    if (this.props.listenerSet === false) {
      this.props.dispatch(fetchAndSetHostingListener())
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.hosting !== this.props.hosting) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.hosting)
      })
    }
  }
  handleToCreate = () => {
    if (this.props.friendsCount < 1) {
      Alert.alert(
        'Not enough friends',
        'You need to add friends before you can create a game'
      )
    } else {
      this.props.navigator.push({create: true})
    }
  }
  handleGameSelected = (game) => {
    this.props.dispatch(selectGame(game))
    this.props.navigator.push({host: true})
  }
  renderRow = (game) => {
    return (
      <Game
        game={game}
        onGameSelected={this.handleGameSelected} />
    )
  }
  render () {
    return (
      <Hosting
        handleToCreate={this.handleToCreate}
        openDrawer={this.props.openDrawer}
        hosting={this.props.hosting}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        listenerSet={this.props.listenerSet} />
    )
  }
}

function mapStateToProps ({games, friends}) {
  const hosting = _.sortBy(Object.values(games.hosting), ['timestamp'])
  const friendsCount = friends.friends.length
  return {
    hosting,
    friendsCount,
    listenerSet: games.hlistenerSet
  }
}

export default connect(mapStateToProps)(HostingContainer)
