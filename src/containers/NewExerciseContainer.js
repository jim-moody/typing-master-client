import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import {createExercise} from '../utils/exercise-api'
import UpdateExercise from '../components/UpdateExercise'
import Validator from '../modules/Validator'
import '../styles/NewExercise.css'

class EditExerciseContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      exercise: {
        name: '',
        text: ''
      },
      errors: {},
      redirect: false
    }
  }

  onChangeExercise = (event) => {
    const field = event.target.name
    const newValue = event.target.value

    this.setState(prevState => {
      const { exercise } = prevState
      exercise[field] = newValue

      return {
        exercise
      }
    })
  }
  onSubmit = (e) => {
    e.preventDefault()
    let validator = new Validator(this.state.exercise, this.state.errors)
    let errors = validator.formErrors
    this.setState({ errors })

    if (validator.errorExists) {
      return
    }
    createExercise(this.state.exercise)
      .then(() => {
        this.setState({
          path: '/exercises',
          redirect: true
        })
      })
      .catch(console.error)
  }
  render () {
    const {redirect} = this.state
    return (
      <div>
        {redirect
          ? <Redirect to="/exercises"/>
        : <UpdateExercise
            onChange={this.onChangeExercise}
            onSubmit={this.onSubmit}
            exercise={this.state.exercise}
            errors={this.state.errors}
            title='New Exercise'
            />
}
      </div>
    )
  }
}

EditExerciseContainer.propTypes = {
  match: PropTypes.object
}

export default EditExerciseContainer
