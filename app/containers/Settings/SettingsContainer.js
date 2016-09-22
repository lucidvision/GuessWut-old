import React, { PropTypes, Component } from 'react'
import { Settings } from '~/components'
import { connect } from 'react-redux'
import { handleUnauth } from '~/redux/modules/authentication'

class SettingsContainer extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  handleLogout = () => {
    this.props.dispatch(handleUnauth())
  }
  render () {
    return (
      <Settings
        onBack={this.props.navigator.pop}
        onLogout={this.handleLogout} />
    )
  }
}

export default connect()(SettingsContainer)
