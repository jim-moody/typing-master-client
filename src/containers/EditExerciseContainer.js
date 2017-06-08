/* eslint react/prop-types: 0 */
import React, {Component} from 'react'
import {show, update} from '../utils/exercise-api'
import UpdateExercise from '../components/UpdateExercise'
import Validator from '../modules/Validator'

class EditExerciseContainer extends Component {
  constructor () {
    super()
    this.state = {
      exercise: {
        name: '',
        text: ''
      },
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
      .catch(console.error)
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
    const { id } = this.props.match.params
    update(id, this.state.exercise)
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
            title='Edit Exercise'
            />
      </div>
    )
  }
}

export default EditExerciseContainer
