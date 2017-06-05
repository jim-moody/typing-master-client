import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NavBar from '../components/NavBar'
import { signOut } from '../utils/auth-api'
import Auth from '../modules/Auth'

class NavBarContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false,
      isLoading: false
    }
  }
  // function to open the drawer
  toggleDrawer = () => this.setState({ open: !this.state.open })

  // when a user signs out, we have to clear their session
  // and call the sign out service
  onHandleSignOut = (e) => {
    const token = Auth.getToken() || ''
    const userId = Auth.getUserId() || ''
    this.setState({
      isLoading: true
    })
    signOut(token, userId)
      .then(this.props.onSignOutSuccess)
      .catch(this.props.onSignOutFailure)
      .always(() => this.setState({isLoading: false}))
  }

  render () {
    return (
      <NavBar
          signOut={this.onHandleSignOut}
          loggedIn={this.props.loggedIn}
          toggleDrawer={this.toggleDrawer}
          open={this.state.open}
          isLoading={this.state.isLoading}
          />
    )
  }
}

NavBarContainer.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  onSignOutSuccess: PropTypes.func,
  onSignOutFailure: PropTypes.func
}
export default NavBarContainer
