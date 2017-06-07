/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import { index, destroy } from '../utils/exercise-api'
// Material UI
import RaisedButton from 'material-ui/RaisedButton'
import ExerciseItem from '../components/ExerciseItem'
import '../styles/ExerciseList.css'
import Sort from 'material-ui/svg-icons/content/sort'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import Score from '../modules/Score'

class ExerciseListContainer extends Component {
  constructor () {
    super()
    this.state = {
      exercises: [],
      selectedIndex: 0,
      sort: 'popular'
    }
  }

  componentDidMount () {
    index()
      .then(res => this.setState({exercises: res.exercises}))
      // TODO handle this error
      .catch(console.error)
  }
  sortLength = (a, b) => {
    return a.text.length > b.length.text
  }
  sortDifficulty = (a, b) => {
    return Score.difficulty(a.scores) > Score.difficulty(b.scores)
  }
  sortNewest = (a, b) => {
    return a.createdAt > b.createdAt
  }
  sortMostPopular = (a, b) => {
    return a.scores.length > b.scores.length
  }
  sort = (type) => {
    const exercises = this.state.exercises
    switch (type) {
      case 'popular':
        exercises.sort(this.sortMostPopular)
        break
      case 'length':
        exercises.sort(this.sortNewest)
        break
      case 'newest':
        exercises.sort(this.sortNewest)
        break
      case 'difficulty':
        exercises.sort(this.sortDifficulty)
        break
    }
    return exercises
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
  onSortChange = (e, sortValue) => {
    let exercises = this.sort(sortValue)
    if (sortValue === this.state.sort) {
      exercises.reverse()
    }
    this.setState({
      exercises,
      sort: sortValue
    })
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
            <RaisedButton className='add-action' onClick={this.onAdd} primary label="Add Exercise"/>
            <h2>Exercises</h2>
            Sort
            <IconMenu

              iconButtonElement={<IconButton><Sort /></IconButton>}
              onChange={this.onSortChange}>
              <MenuItem value="length" primaryText="Length" />
              <MenuItem value="difficulty" primaryText="Difficulty" />
              <MenuItem value="new" primaryText="Newest" />
              <MenuItem value="popular" primaryText="Most Popular" />
            </IconMenu>
          </div>
          {exercises}
          </div>
    </div>
    )
  }
}

export default ExerciseListContainer
