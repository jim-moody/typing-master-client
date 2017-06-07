/* eslint react/prop-types: 0 */
import React from 'react'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import AppLoader from './AppLoader'

// Displays different items in the drawer depending on if the user is logged in
const styles = {
  title: {
    cursor: 'pointer'
  }
}
const NavBar = ({loggedIn, signOut, open, toggleDrawer, isLoading, onTitleTouchTap}) =>
<div>
<AppBar
  title={<Link to="/"><span style={styles.title}>Typing Master</span></Link>}
  onLeftIconButtonTouchTap={toggleDrawer}
  onTitleTouchTap={onTitleTouchTap}
/>
  <Drawer
    style={{textAlign: 'left'}}
    docked={false}
    width={300}
    onRequestChange={toggleDrawer}
    open={open}
    >
    <AppBar title="Menu"
      showMenuIconButton={false} />

      {
        loggedIn
        ? <div>
          <MenuItem
          onTouchTap={toggleDrawer}
          containerElement={<Link to="/exercises" />}
          primaryText="Exercises" />
          <MenuItem
            onTouchTap={toggleDrawer}
            containerElement={<Link to="/change-password" />}
            primaryText="Change Password" />
          <MenuItem

            onTouchTap={() => {
              signOut()
              toggleDrawer()
            }}
            primaryText="Sign Out" />
          </div>
        : <div>
          <MenuItem
            onTouchTap={toggleDrawer}
            containerElement={<Link to={'/sign-in'} />}
            primaryText="Sign In" />
          <MenuItem
            onTouchTap={toggleDrawer}
            containerElement={<Link to={'/sign-up'} />}
            primaryText='Sign Up' />
          </div>
      }
    </Drawer>
    {isLoading && <AppLoader /> }
    </div>

export default NavBar
