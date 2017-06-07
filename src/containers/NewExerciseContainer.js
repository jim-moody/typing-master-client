/* eslint react/prop-types: 0 */
import React, {Component} from 'react'
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
      errors: {}
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
      .then(() => this.props.history.push('/exercises'))
      .catch(console.error)
  }
  render () {
    return (
      <div>
        <UpdateExercise
            onChange={this.onChangeExercise}
            onSubmit={this.onSubmit}
            exercise={this.state.exercise}
            errors={this.state.errors}
            title='New Exercise'
            />
      </div>
    )
  }
}

export default EditExerciseContainer
