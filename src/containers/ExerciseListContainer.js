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
import AppLoader from '../components/AppLoader'

class ExerciseListContainer extends Component {
  constructor () {
    super()
    this.state = {
      exercises: [],
      selectedIndex: 0,
      sort: {
        value: 'popular',
        ascending: true
      },
      isLoading: false
    }
  }

  componentDidMount () {
    this.setState({isLoading: true})
    index()
      .then(res => this.setState({exercises: res.exercises}))
      .catch(console.error)
      .always(() => { this.setState({isLoading: false}) })
  }

  sort = (value) => {
    const exercises = this.state.exercises
    switch (value) {
      case 'popular':
        exercises.sort(Score.sortMostPopular)
        break
      case 'length':
        exercises.sort(Score.sortNewest)
        break
      case 'newest':
        exercises.sort(Score.sortNewest)
        break
      case 'difficulty':
        exercises.sort(Score.sortDifficulty)
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
  onSortChange = (e, child) => {
    const { value } = child.props
    let exercises = this.sort(value)
    let { ascending, value: currentValue } = this.state.sort
    // if the sort option was already selected, change the list to descending
    // and update the value
    if (value === currentValue) {
      ascending = !ascending
    } else {
      ascending = true
    }
    ascending && exercises.reverse()
    this.setState({
      exercises,
      sort: {
        value,
        ascending
      }
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

  insetChild = (item) => {
    return item !== this.state.sort.type
  }
  render () {
    const { isLoading } = this.state
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
            <IconMenu
              value={this.state.sort.value}
              iconButtonElement={<IconButton><Sort hoverColor='gray'/></IconButton>}
              onItemTouchTap={this.onSortChange}>
              <MenuItem value="length" primaryText="Length"/>
              <MenuItem value="difficulty" primaryText="Difficulty" />
              <MenuItem value="new" primaryText="Newest" />
              <MenuItem value="popular" primaryText="Most Popular" />
            </IconMenu>
          </div>
          {exercises}
          </div>
          {isLoading && <AppLoader /> }
    </div>
    )
  }
}

export default ExerciseListContainer
