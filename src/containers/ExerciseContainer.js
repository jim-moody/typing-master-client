import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { show } from '../utils/exercise-api'
import TypingArea from './TypingArea'
import Paper from 'material-ui/Paper'

class ExerciseContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      id: ''
    }
  }

  componentDidMount () {
    show(this.props.match.params.id)
      .then(res => this.setState({text: res.exercise.text}))
      .catch(console.error)
  }
  render () {
    const style = {
      // textAlign: 'center',
      display: 'inline-block',
      // padding: 0,
      // margin: 0
      marginTop: '50px'
    }

    return (
      <Paper style={style}>
        <TypingArea text={this.state.text} />
      </Paper>
    )
  }
}

ExerciseContainer.propTypes = {
  match: PropTypes.object.isRequired
}

export default ExerciseContainer
