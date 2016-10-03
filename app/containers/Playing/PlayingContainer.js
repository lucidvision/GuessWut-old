import React, { PropTypes, Component } from 'react'
import { ListView } from 'react-native'
import { connect } from 'react-redux'
import { Playing } from '~/components'
import Game from '~/components/Playing/Game'
import { fetchAndSetPlayingListener, selectGame } from '~/redux/modules/games'
import _ from 'lodash'

class PlayingContainer extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    playing: PropTypes.array.isRequired,
    authedId: PropTypes.string.isRequired,
    listenerSet: PropTypes.bool.isRequired
  }
  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: this.ds.cloneWithRows(props.playing)
    }
  }
  componentDidMount () {
    if (this.props.listenerSet === false) {
      this.props.dispatch(fetchAndSetPlayingListener())
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.playing !== this.props.playing) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.playing)
      })
    }
  }
  handleToSettings = () => {
    this.props.navigator.push({settings: true})
  }
  handleGameSelected = (game) => {
    this.props.dispatch(selectGame(game))
    if (game.completed) {
      this.props.navigator.push({host: true})
    } else {
      this.props.navigator.push({play: true})
    }
  }
  renderRow = (game) => {
    const guessed = _.includes(Object.keys(game.guessed || {}), this.props.authedId)
    return (
      <Game
        game={game}
        guessed={guessed}
        onGameSelected={this.handleGameSelected} />
    )
  }
  render () {
    return (
      <Playing
        handleToSettings={this.handleToSettings}
        openDrawer={this.props.openDrawer}
        playing={this.props.playing}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        listenerSet={this.props.listenerSet} />
    )
  }
}

function mapStateToProps ({authentication, games}) {
  const playing = _.sortBy(Object.values(games.playing), ['timestamp'])
  return {
    playing,
    authedId: authentication.authedId,
    listenerSet: games.plistenerSet
  }
}

export default connect(mapStateToProps)(PlayingContainer)
