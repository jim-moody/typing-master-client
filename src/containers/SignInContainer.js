import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { signIn } from '../utils/auth-api'
import Auth from '../modules/Auth'
import Validator from '../modules/Validator'
import ErrorParser from '../modules/ErrorParser'
import SignIn from '../components/SignIn'

class SignInContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
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

      // set the new state
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
    this.setState({ errors })
    // break out of function if theres an error
    if (validator.errorExists) {
      return
    }
    this.setState({ isLoading: true })
    signIn(this.state.user)
      .then(({user}) => this.props.onSignedIn(user.token, user.id))
      .then(() => this.setState({redirectToReferrer: true}))

      // if theres an error, show the error and hide the loader
      .catch(res => {
        const error = ErrorParser.errorMessage(res)
        this.setState({
          errors: {description: error},
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
            : <SignIn
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

SignInContainer.propTypes = {
  location: PropTypes.object,
  onSignedIn: PropTypes.func.isRequired,
  updateLoader: PropTypes.func
}

export default SignInContainer
