import React, { PropTypes, Component } from 'react'
import { Create } from '~/components'

export default class CreateContainer extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  }
  state = {}
  render () {
    return (
      <Create onBack={this.props.navigator.pop} />
    )
  }
}
