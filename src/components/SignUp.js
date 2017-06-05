import React from 'react'
import PropTypes from 'prop-types'
import '../styles/AuthForm.css'

// Material Components
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'

const SignUp = ({onSubmit, onChange, user, errors, isLoading}) =>
    <Paper className="auth-form" rounded={false} zDepth={2}>
        <form onSubmit={onSubmit}>
          <h2 >Sign Up</h2>
            <p className='error-message'>{errors.description}</p>

          <TextField
            className='form-input'
            name="email"
            onChange={onChange}
            errorText={errors.email}
            floatingLabelText="Email Address"
            />
          <TextField
            className='form-input'
            name="password"
            onChange={onChange}
            type="password"
            errorText={errors.password}
            floatingLabelText="Password"
            />
          <TextField
            className='form-input'
            onChange={onChange}
            name="passwordConfirmation"
            type="password"
            errorText={errors.passwordConfirmation}
            floatingLabelText="Password Confirmation"
            />
          <div className='action-div'>
            <span></span>
              {isLoading
                ? <CircularProgress className='inline-loader' />
                : <RaisedButton
                className='auth-button'
                type="submit"
                primary label="Sign Up"/>
                }
          </div>
        </form>
      </Paper>

SignUp.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  isLoading: PropTypes.bool
}

export default SignUp
