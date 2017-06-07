import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { show } from '../utils/exercise-api'
import TypingArea from './TypingArea'
import Paper from 'material-ui/Paper'
import TopScores from '../components/TopScores'
import {Tabs, Tab} from 'material-ui/Tabs'
import {teal700} from 'material-ui/styles/colors'

class ExerciseContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      id: '',
      scores: []
    }
  }

  componentDidMount () {
    show(this.props.match.params.id)
      .then(res => this.setState({text: res.exercise.text, scores: res.exercise.scores}))
      .catch(console.error)
  }
  render () {
    const props = this.props

    return (
      <Tabs tabItemContainerStyle={{backgroundColor: teal700}}  >
        <Tab label='Exercise'>
        <TypingArea text={this.state.text} exerciseId={this.props.match.params.id} {...props} />
          </Tab>
          <Tab label='Leaderboard'>
          <h2 style={{textAlign: 'center'}}>Leaderboard</h2>
        <Paper style={{maxWidth: '700px', margin: '20px auto', overflow: 'hidden'}}>
        <TopScores scores={this.state.scores}/>
        </Paper>
        </Tab>
      </Tabs>
    )
  }
}

ExerciseContainer.propTypes = {
  match: PropTypes.object.isRequired
}

export default ExerciseContainer
