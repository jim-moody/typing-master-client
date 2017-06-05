import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChangePassword from '../components/ChangePassword'
import Validator from '../modules/Validator'
import { changePassword } from '../utils/auth-api'
import Auth from '../modules/Auth'
import ErrorParser from '../modules/ErrorParser'
import { Redirect } from 'react-router-dom'

class ChangePasswordContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      errors: {},
      passwords: {
        old: '',
        new: ''
      },
      redirectToReferrer: false,
      isLoading: false
    }
  }

  changePasswords = (event) => {
    const field = event.target.name
    const newValue = event.target.value

    this.setState(prevState => {
      // get and update password object
      const passwords = prevState.passwords
      passwords[field] = newValue

      // get and update errors object
      let errors = prevState.errors
      let validator = new Validator(passwords, errors)
      errors = validator.fieldErrors(field, newValue)

      // set the new state
      return {
        passwords,
        errors
      }
    })
  }

  processForm = (e) => {
    e.preventDefault()
    // need th token and user id for the change password API call
    const token = Auth.getToken()
    const userId = Auth.getUserId()

    // update any of the errors so we dont submit an invalid form
    let validator = new Validator(this.state.passwords, this.state.errors)
    let errors = validator.formErrors
    errors.description = ''
    this.setState({
      errors
    })
    if (validator.errorExists) {
      return
    }

    // trigger loader
    this.setState({isLoading: true})

    // submit to the api and then redirect to wherever you came from
    changePassword(this.state.passwords, token, userId)
      .then(res => { this.props.onPasswordChanged() })
      .then(() => this.setState({ redirectToReferrer: true }))

      // if theres an error, display the error message and clear the loader
      .catch(res => {
        const errorMessage = ErrorParser.errorMessage(res)
        this.setState({
          errors: { description: errorMessage },
          isLoading: false
        })
      })
  }

  render () {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    return (
      <div>
        {
          redirectToReferrer
        ? <Redirect to={from}/>
        : <ChangePassword
          errors={this.state.errors}
          passwords={this.state.passwords}
          onChange={this.changePasswords}
          onSubmit={this.processForm}
          isLoading={this.state.isLoading}
          />
      }
      </div>
    )
  }
}

ChangePasswordContainer.propTypes = {
  location: PropTypes.object,
  onPasswordChanged: PropTypes.func
}
export default ChangePasswordContainer
