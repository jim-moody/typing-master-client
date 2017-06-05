import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
// import Paper from 'material-ui/Paper'
// import TextField from 'material-ui/TextField'
// import RaisedButton from 'material-ui/RaisedButton'
import {createExercise} from '../utils/exercise-api'
import EditExercise from '../components/EditExercise'
import '../styles/NewExercise.css'

class NewExerciseContainer extends Component {
  constructor () {
    super()

    this.state = {
      text: '',
      redirect: false,
      path: ''
    }
  }
  onChange = (e) => {
    this.setState({text: e.target.value})
  }
  onSubmit = (e) => {
    e.preventDefault()
    createExercise(this.state.text)
      .then(() => {
        this.setState({
          path: '/exercises',
          redirect: true
        })
      })
      .catch(console.error)
  }
  render () {
    const {path, redirect} = this.state
    return (
      <div>
        {redirect
          ? <Redirect to={path}/>
        : <EditExercise
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            value={this.state.text} />
}
      </div>
    )
  }
}

export default NewExerciseContainer
