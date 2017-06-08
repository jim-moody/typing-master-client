/* eslint react/prop-types: 0 */
import React, {Component} from 'react'
import {show, update} from '../utils/exercise-api'
import UpdateExercise from '../components/UpdateExercise'
import Validator from '../modules/Validator'
import ErrorParser from '../modules/ErrorParser'
import AppError from '../components/AppError'

class EditExerciseContainer extends Component {
  constructor () {
    super()
    this.state = {
      exercise: {
        name: '',
        text: ''
      },
      error: false,
      errors: {}
    }
  }
  componentDidMount () {
    show(this.props.match.params.id)
      .then(res => {
        const {name, text} = res.exercise
        const exercise = {
          name,
          text
        }
        this.setState({exercise})
      })
      .catch(() => this.setState({error: true}))
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
    errors.description = ''
    this.setState({ errors })
    if (validator.errorExists) {
      return
    }
    const { id } = this.props.match.params
    // trim the text before saving so that all calculations happen correctly since we trim
    // before displaying the exercise to the user
    const exercise = this.state.exercise
    exercise.text = exercise.text.trim()
    update(id, exercise)
      .then(() => this.props.history.replace('/exercises'))
      .catch(res => {
        this.setState({
          errors: {
            description: ErrorParser.customError(res)
          }
        })
      })
  }
  render () {
    const {error} = this.state
    return (
      <div>
        <UpdateExercise
            onChange={this.onChangeExercise}
            onSubmit={this.onSubmit}
            exercise={this.state.exercise}
            errors={this.state.errors}
            title='Edit Exercise'
            />
          <AppError open={error} message='Sorry, something went wrong' />
      </div>
    )
  }
}

export default EditExerciseContainer
