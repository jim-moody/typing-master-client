import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import {show, update} from '../utils/exercise-api'
import EditExercise from '../components/EditExercise'
import '../styles/NewExercise.css'

class EditExerciseContainer extends Component {
  constructor () {
    super()

    this.state = {
      exercise: {
        text: ''
      },
      redirect: false
    }
  }
  componentDidMount () {
    show(this.props.match.params.id)
      .then(res => {
        this.setState({exercise: {text: res.exercise.text}})
      })
      .catch(console.error)
  }
  onChange = (e) => {
    this.setState({exercise: {text: e.target.value}})
  }
  onSubmit = (e) => {
    e.preventDefault()
    const { id } = this.props.match.params
    update(id, this.state.exercise)
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
        : <EditExercise
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            value={this.state.exercise.text} />
}
      </div>
    )
  }
}

EditExerciseContainer.propTypes = {
  match: PropTypes.object
}

export default EditExerciseContainer
