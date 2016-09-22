import React, { PropTypes, Component } from 'react'
import { Hosting } from '~/components'

export default class HostingContainer extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
    navigator: PropTypes.object.isRequired
  }
  handleToCreate = () => {
    this.props.navigator.push({
      create: true
    })
  }
  render () {
    return (
      <Hosting
        handleToCreate={this.handleToCreate}
        openDrawer={this.props.openDrawer} />
    )
  }
}
