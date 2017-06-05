import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import '../styles/AuthForm.css'

// Material Components
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import muiThemeable from 'material-ui/styles/muiThemeable'

const SignIn = ({onSubmit, onChange, errors, user, isLoading, muiTheme}) =>
<Paper className="auth-form" rounded={false} zDepth={2}>
  <form onSubmit={onSubmit}>
    <h2 >Sign In</h2>
    <p className='error-message'>{errors.description}</p>
    <TextField
      className='form-input'
      name="email" type="text"
      onChange={onChange}
      errorText={errors.email}
      floatingLabelText="Email Address"
      value={user.email}/>
    <TextField
      className='form-input'
      name="password"
      onChange={onChange}
      errorText={errors.password}
      type="password"
      floatingLabelText="Password"
      value={user.password}
      autoComplete="new-password"/>

    <div className='action-div'>
      <Link to="/sign-up">
        <span style={{color: muiTheme.palette.primary1Color}}>Create Account</span>
      </Link>
      {isLoading
        ? <CircularProgress className='inline-loader' />
        : <RaisedButton
        className='auth-button'
        type="submit"
        primary label="Log In"/>
        }
    </div>
  </form>
</Paper>

SignIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  muiTheme: PropTypes.object
}
export default muiThemeable()(SignIn)
