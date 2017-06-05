import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import SignUp from '../components/SignUp'
import { signUp, signIn } from '../utils/auth-api'
import Validator from '../modules/Validator'
import ErrorParser from '../modules/ErrorParser'
import Auth from '../modules/Auth'

class SignUpContainer extends Component {
  constructor () {
    super()

    this.state = {
      errors: {},
      user: {
        email: '',
        password: '',
        passwordConfirmation: ''
      },
      redirectToReferrer: false,
      isLoading: false
    }
  }

  componentWillMount () {
    // if the user is logged in, take them back to the referrer
    // they should have to be logged OUT to see sign-up and sign-in
    this.setState({
      redirectToReferrer: Auth.isUserAuthenticated()
    })
  }

  changeUser = (event) => {
    const field = event.target.name
    const newValue = event.target.value

    this.setState(prevState => {
      // get and update user object
      const user = prevState.user
      user[field] = newValue

      // get and update errors object
      let errors = prevState.errors
      let validator = new Validator(user, errors)
      errors = validator.fieldErrors(field, newValue)

      return {
        user,
        errors
      }
    })
  }

  processForm = (e) => {
    e.preventDefault()
    let validator = new Validator(this.state.user, this.state.errors)
    let errors = validator.formErrors
    errors.description = ''
    errors = validator.updatedPasswordConfirmError

    this.setState({
      errors
    })
    if (validator.errorExists) {
      return
    }
    this.setState({
      isLoading: true
    })
    signUp(this.state.user)
      // after sign up, sign the user in
      .then(() => signIn(this.state.user))

      // if sign in is a success, store the user data for use down the line
      .then(res => this.props.onSignedIn(res.user.token, res.user.id))

      // redirect user to where they came from
      .then(() => this.setState({ redirectToReferrer: true }))

      // set an error message in the container and clear the loader
      .catch(res => {
        const error = ErrorParser.errorMessage(res)
        this.setState({
          errors: { description: error },
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
          : <SignUp
                onSubmit={this.processForm}
                onChange={this.changeUser}
                user={this.state.user}
                errors={this.state.errors}
                isLoading={this.state.isLoading}
                />
        }
      </div>
    )
  }
}

SignUpContainer.propTypes = {
  location: PropTypes.object,
  onSignedIn: PropTypes.func.isRequired
}

export default SignUpContainer
