import React, { PropTypes, Component } from 'react'
import { Settings } from '~/components'
import { connect } from 'react-redux'
import { handleUnauth } from '~/redux/modules/authentication'
import { showFlashNotification } from '~/redux/modules/flashNotification'
import { updateUser } from '~/api/users'

class SettingsContainer extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    authedId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }
  state = {
    name: this.props.name
  }
  handleOnSave = () => {
    const userInfo = {
      uid: this.props.authedId,
      displayName: this.state.name
    }
    updateUser(userInfo).then(() => {
      this.props.dispatch(showFlashNotification({text: 'User Saved!'}))
    })
  }
  handleLogout = () => {
    this.props.dispatch(handleUnauth())
  }
  render () {
    return (
      <Settings
        name={this.state.name}
        changeName={name => this.setState({name})}
        onBack={this.props.navigator.pop}
        onSave={this.handleOnSave}
        onLogout={this.handleLogout} />
    )
  }
}

function mapStateToProps ({authentication, users}) {
  return {
    authedId: authentication.authedId,
    name: users.user.displayName
  }
}

export default connect(mapStateToProps)(SettingsContainer)
