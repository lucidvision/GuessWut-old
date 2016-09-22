import React, { PropTypes, Component } from 'react'
import { Playing } from '~/components'

export default class PlayingContainer extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
    navigator: PropTypes.object.isRequired
  }
  state = {}
  handleToSettings = () => {
    this.props.navigator.push({
      settings: true
    })
  }
  render () {
    return (
      <Playing
        handleToSettings={this.handleToSettings}
        openDrawer={this.props.openDrawer} />
    )
  }
}
