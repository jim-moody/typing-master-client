import React, { Component } from 'react'
// Router
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
// Material UI
import injectTapEventPlugin from 'react-tap-event-plugin'
import {teal500, tealA700} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Snackbar from 'material-ui/Snackbar'
// styles
import './styles/App.css'
// Config
import PrivateRoute from './components/PrivateRoute'
// Modules
import Auth from './modules/Auth'
// Components/Containers
import NavBarContainer from './containers/NavBarContainer'
import Main from './components/Main'
import SignInContainer from './containers/SignInContainer'
import SignUpContainer from './containers/SignUpContainer'
import ChangePasswordContainer from './containers/ChangePasswordContainer'
import NewExercise from './containers/NewExerciseContainer'
import ExerciseListContainer from './containers/ExerciseListContainer'
import ExerciseContainer from './containers/ExerciseContainer'
import EditExerciseContainer from './containers/EditExerciseContainer'

// set the material Theme
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal500,
    accent1Color: teal500
  }
})

class App extends Component {
  constructor () {
    super()

    // set the state based on the Auth module which checks localstorage
    this.state = {
      loggedIn: Auth.isUserAuthenticated(),
      snackbar: {
        open: false,
        message: ''
      },
      isLoading: false
    }
  }
  onUpdateLoader = status => {
    this.setState({
      isLoading: status
    })
  }
  // pass this down to the sign out link
  onSignOutSuccess = (e) => {
    Auth.deauthenticateUser()
    this.triggerAlert('You are now signed out')
    this.setState({
      loggedIn: Auth.isUserAuthenticated(),
      isLoading: false
    })
  }
  onSignedIn = (token, userId) => {
    Auth.authenticateUser(token, userId)
    this.triggerAlert('You are now signed in')
    this.setState({
      loggedIn: Auth.isUserAuthenticated(),
      isLoading: false
    })
  }
  onPasswordChanged = () => {
    this.triggerAlert('Password changed successfully')
    this.setState({
      isLoading: false
    })
  }
  onSignOutFailure = () => {
    this.triggerAlert('Sorry, there was an issue signing you out')
  }
  triggerAlert (message) {
    this.setState(prevState => {
      return {
        snackbar: {
          message,
          open: true
        }
      }
    })
  }
  onHandleRequestClose = () => {
    this.setState({
      snackbar: {
        message: '',
        open: false
      }
    })
  }

  render () {
    // Need this for material components to work
    // eslint-disable-next-line
    try { injectTapEventPlugin() } catch (e) {  }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router>
          <div className="App">
            <NavBarContainer
              loggedIn={this.state.loggedIn}
              onSignOutFailure={this.onSignOutFailure}
              onSignOutSuccess={this.onSignOutSuccess} />
            <Snackbar
              open={this.state.snackbar.open}
              autoHideDuration={4000}
              onRequestClose={this.onHandleRequestClose}
              message={this.state.snackbar.message}/>
          <PrivateRoute exact path="/" component={Main} />
          <Switch>
            <PrivateRoute exact path="/exercises" component={ExerciseListContainer} />
            <PrivateRoute path="/exercises/new" component={NewExercise} />
              <PrivateRoute path="/exercises/edit/:id" component={EditExerciseContainer} />
            <PrivateRoute path="/exercises/:id" component={ExerciseContainer} />
            </Switch>
          <PrivateRoute path="/change-password" component={ChangePasswordContainer} onPasswordChanged={this.onPasswordChanged} />
          <Route path="/sign-in" render={props => <SignInContainer onSignedIn={this.onSignedIn} {...props} /> }/>
          <Route path="/sign-up" render={props => <SignUpContainer onSignedIn={this.onSignedIn} {...props} /> } />
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
