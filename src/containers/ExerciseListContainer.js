import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { index, destroy } from '../utils/exercise-api'

// Material UI
import Paper from 'material-ui/Paper'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

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
        exercisesCopy = exercisesCopy.map((exercise, index) =>{
          exercise.name = 'Exercise ' + (index + 1)
          return exercise
        })
        this.setState({
          exercises: exercisesCopy
        })
      })
      .catch(console.error)
  }
  render () {
    const itemStyle = {
      margin: '20px auto',
      maxWidth: '500px'
    }

    const exercises = this.state.exercises.map((exercise, i) => {
      return (
        <Paper key={i} style={itemStyle}>
          <div className='paper-list-item'>
            <div data-value={exercise.id} onClick={this.onExerciseClick} className='paper-list-main'>
            {exercise.name}
          </div>
            <IconMenu value={exercise.id} onItemTouchTap={this.onItemTouchTap}
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
        <MenuItem name='edit' value={exercise.id} primaryText="Edit" />
        <MenuItem name='delete' value={exercise.id} primaryText="Delete" />
        </IconMenu>
          </div>
        </Paper>
      )
    })
    const { path, redirect } = this.state
    return (
      <div>
      { redirect
        ? <Redirect push to={path} />
      : <div>
      <div className="list-header">
        <h3>Exercises
        </h3>
        <FloatingActionButton onTouchTap={this.onAdd} mini >
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
// anchorOrigin={{horizontal: 'left', vertical: 'top'}}
// targetOrigin={{horizontal: 'left', vertical: 'top'}} >

export default ExerciseListContainer
