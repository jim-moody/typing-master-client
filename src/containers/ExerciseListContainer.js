import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { index, destroy } from '../utils/exercise-api'
// Material UI
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import ExerciseItem from '../components/ExerciseItem'
import '../styles/ExerciseList.css'

class ExerciseListContainer extends Component {
  constructor () {
    super()
    this.state = {
      exercises: [],
      selectedIndex: 0,
      redirect: false
    }
  }
  componentDidMount () {
    index()
      .then(res => this.setState({exercises: res.exercises}))
      // TODO handle this error
      .catch(console.error)
  }
  handleRequestChange = (event, index) => {
    this.setState({
      selectedIndex: index,
      redirect: true
    })
  }
  onExerciseClick = (e) => {
    this.setState({
      path: `/exercises/${e.target.getAttribute('data-value')}`,
      redirect: true
    })
  }
  onItemTouchTap = (e, c) => {
    const id = c.props.value
    switch (c.props.name) {
      case 'edit': this.onEdit(id)
        break
      case 'delete': this.onDelete(id)
        break
    }
  }
  onEdit = (id) => {
    this.setState({
      path: '/exercises/edit/' + id,
      redirect: true
    })
  }

  onAdd = () => {
    this.setState({
      path: '/exercises/new',
      redirect: true
    })
  }
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
          onExerciseClick={this.onExerciseClick}
          name={exercise.name}
          id={exercise.id}
          onEdit={this.onEdit}
          onDelete={this.onDelete}
          scores={exercise.scores}
          editable={exercise.editable} />
      )
    })
    const { path, redirect } = this.state
    return (
      <div>
      { redirect ? <Redirect push to={path} />
      : <div>
          <div className="list-header">
            <h2>Exercises</h2>
            <FloatingActionButton onTouchTap={this.onAdd} mini>
              <ContentAdd />
            </FloatingActionButton>
          </div>
          {exercises}
          </div>
    }
    </div>
    )
  }
}

export default ExerciseListContainer
