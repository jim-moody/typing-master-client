/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import { index, destroy } from '../utils/exercise-api'
// Material UI
import RaisedButton from 'material-ui/RaisedButton'
import ExerciseItem from '../components/ExerciseItem'
import '../styles/ExerciseList.css'

class ExerciseListContainer extends Component {
  constructor () {
    super()
    this.state = {
      exercises: [],
      selectedIndex: 0
    }
  }

  componentDidMount () {
    index()
      .then(res => this.setState({exercises: res.exercises}))
      // TODO handle this error
      .catch(console.error)
  }

  onStartExercise = (e) => {
    const id = e.target.getAttribute('data-value')
    this.props.history.push(`/exercises/${id}`)
  }

  onItemTouchTap = (e, c) => {
    const id = c.props.value
    switch (c.props.name) {
      case 'edit': this.props.history.push('/exercises/edit/' + id)
        break
      case 'delete': this.onDelete(id)
        break
    }
  }

  onAdd = () => this.props.history.push('/exercises/new')

  onDelete = (id) => {
    destroy(id)
      .then(() => {
        let exercisesCopy = this.state.exercises.slice()
        const i = exercisesCopy.findIndex(e => e.id === id)
        exercisesCopy.splice(i, 1)
        this.setState({
          exercises: exercisesCopy
        })
      })
      // TODO handle this error
      .catch(console.error)
  }

  render () {
    const exercises = this.state.exercises.map((exercise, i) => {
      return (
        <ExerciseItem key={i}
          onItemTouchTap={this.onItemTouchTap}
          onExerciseClick={this.onStartExercise}
          name={exercise.name}
          id={exercise.id}
          onEdit={this.onEdit}
          onDelete={this.onDelete}
          scores={exercise.scores}
          editable={exercise.editable}
          text={exercise.text} />
      )
    })

    return (
      <div>
        <div>
          <div className='list-header'>
            <h2>Exercises</h2>
            <RaisedButton className='add-action' onClick={this.onAdd} primary label="New Exercise"/>
          </div>
          {exercises}
          </div>
    </div>
    )
  }
}

export default ExerciseListContainer
