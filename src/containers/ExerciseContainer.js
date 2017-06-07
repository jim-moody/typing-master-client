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
      exercise: {
        text: '',
        name: '',
        id: '',
        scores: []
      },
      tabValue: 1
    }
  }
  onActive = (e) => {
    this.selectTab(e.props.value)
    if (e.props.value === 2) {
      this.refreshScores()
    }
  }

  refreshScores () {
    show(this.props.match.params.id)
      .then(res => this.setState({exercise: res.exercise}))
      .catch(console.error)
  }
  componentDidMount () {
    this.refreshScores()
  }
  selectTab = (value) => {
    this.setState({value})
  }
  render () {
    const props = this.props
    const { exercise } = this.state
    return (
      <Tabs  value={this.state.value} tabItemContainerStyle={{backgroundColor: teal700}}>
        <Tab onActive={this.onActive} value={1} label='Exercise'>
        <TypingArea onSubmitScore={this.selectTab} name={exercise.name} text={exercise.text} exerciseId={exercise.id} {...props} />
          </Tab>
          <Tab onActive={this.onActive} value={2} label='Leaderboard'>
          <h2 style={{textAlign: 'center'}}>Leaderboard</h2>
        <Paper style={{maxWidth: '700px', margin: '20px auto', overflow: 'hidden'}}>
        <TopScores scores={exercise.scores}/>
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
