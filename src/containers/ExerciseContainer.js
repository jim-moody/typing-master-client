import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { show } from '../utils/exercise-api'
import TypingArea from './TypingArea'
import Paper from 'material-ui/Paper'
import TopScores from '../components/TopScores'
import {Tabs, Tab} from 'material-ui/Tabs'
import Toggle from 'material-ui/Toggle';
import {teal700} from 'material-ui/styles/colors'
import '../styles/Exercise.css'

class ExerciseContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      scores: [],
      assistantToggled: false,
      scoreToggled: false,
      tabValue: 1,
      exercise: {
        name: ''
      },
      refreshScores: false
    }
  }
  onActive = (e) => {
    this.selectTab(e.props.value)
    if (e.props.value === 2) {
      this.setState({refreshScores: true})
    }
  }


  componentDidMount () {
    show(this.props.match.params.id)
      .then(res => {
        this.setState({
          exercise: res.exercise
        })
      })
      .catch(console.error)
  }
  selectTab = (value) => {
    this.setState({value})
  }
  onAssistantToggle = () => {
    this.setState({assistantToggled: !this.state.assistantToggled})
  }
  onScoreToggle = () => {
    this.setState({scoreToggled: !this.state.scoreToggled})
  }
  render () {
    return (
      <div className="Exercise">
      <Tabs value={this.state.value} tabItemContainerStyle={{backgroundColor: teal700}}>
        <Tab onActive={this.onActive} value={1} label='Exercise'>
        <div className='TypingArea' style={{display: 'flex', flexDirection: 'column', maxWidth: '700px', margin: '0 auto'}}>
          <div className='header'>
            <div className='title'>
              <h2 style={{textAlign: 'center'}}>{this.state.exercise.name}</h2>
            </div>
            <div className='toggle'>
          <Toggle
            onToggle={this.onAssistantToggle}
            toggled={this.state.assistantToggled}
            labelPosition="right"
            label="Assistant" />
            <Toggle
              onToggle={this.onScoreToggle}
              toggled={this.state.scoreToggled}
              labelPosition="right"
              label="Score" />
          </div>
          </div>
        <TypingArea
          onSubmitScore={this.selectTab}
          exerciseId={this.props.match.params.id}
          assistant={this.state.assistantToggled}
          scorecard={this.state.scoreToggled} />
        </div>
          </Tab>
          <Tab onActive={this.onActive} value={2} label='Leaderboard'>
          <h2 style={{textAlign: 'center'}}>Leaderboard</h2>
        <Paper style={{maxWidth: '700px', margin: '20px auto', overflow: 'hidden'}}>
        <TopScores
          refreshScores={this.state.refreshScores}
          exerciseId={this.props.match.params.id}
          />
        </Paper>
        </Tab>
      </Tabs>
    </div>
    )
  }
}

ExerciseContainer.propTypes = {
  match: PropTypes.object.isRequired
}

export default ExerciseContainer
