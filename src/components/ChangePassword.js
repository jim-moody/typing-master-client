/* eslint react/prop-types: 0 */

import React from 'react'
// Material UI
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
// Styles
import '../styles/AuthForm.css'

const ChangePassword = ({onSubmit, onChange, passwords, errors, isLoading}) =>
<Paper className="auth-form" rounded={false} zDepth={2}>
  <form onSubmit={onSubmit}>
    <h2 >Change Password</h2>
    <p className='error-message'>{errors.description}</p>
    <TextField
      className='form-input'
      name="old"
      type="password"
      onChange={onChange}
      errorText={errors.old}
      floatingLabelText="Old Password"
      value={passwords.old} />
    <TextField
      className='form-input'
      name="new"
      onChange={onChange}
      errorText={errors.new}
      type="password"
      floatingLabelText="New Password"
      value={passwords.new}
      autoComplete="new-password"
      />

    <div className='action-div'>
      <span></span>
        {isLoading
          ? <CircularProgress className='inline-loader' />
          : <RaisedButton
              className='auth-button'
              type="submit"
              primary label="Submit"/>
          }
        </div>
  </form>
</Paper>

export default ChangePassword
