/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Character from './Character'
import Paper from 'material-ui/Paper'
import { create } from '../utils/score-api'
import classNames from 'classnames'
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import Scorecard from '../components/Scorecard'
import Score from '../modules/Score'
import TypingAssistant from './TypingAssistant'
import Popover from 'material-ui/Popover'
import RaisedButton from 'material-ui/RaisedButton'
import '../styles/TypingArea.css'
import Timer from '../modules/Timer'

class TypingArea extends Component {
  constructor (props) {
    super(props)

    this.state = this.getInitialState()
  }
  getInitialState = () => {
    const characters = this.formatCharacters(this.props.text)
    return {
      score: {
        mistakes: 0,
        time: 0
      },
      focused: false,
      characters,
      target: 0,
      intervalId: 0,
      complete: false,
      correctlyTypedCharacters: 0
    }
  }

  // if the user leaves halfway through a lesson, make sure to turn the timer off
  componentWillUnmount () {
    this.stopTimer(this.state.intervalId)
  }
  componentWillReceiveProps (props) {
    const characters = this.formatCharacters(props.text)
    this.setState({
      characters
    })
  }
  // turn the text blob into an array of character objects
  formatCharacters = text =>
    text.trim().split('').map(char => {
      return {
        character: char,
        highlight: false,
        cursor: false
      }
    })

  // checks if what the user entered is = the target character
  validate = (userInput) => {
    const { character } = this.state.characters[this.state.target]
    if (character === userInput) {
      return true
    }

    return false
  }

  getCharacterEntered = (keypress) => {
    if (keypress === 13) {
      return '\n'
    }
    return String.fromCharCode(keypress)
  }

  // return the new target position
  autoTab = () => {
    const remainingText = this.state.characters.slice(this.state.target + 1)
    const newTarget = this.state.target + this.newPositionOnTab(remainingText)
    return newTarget
  }
  // figure out where the next non-space character is
  newPositionOnTab = (characterArray) => {
    // non space character
    return characterArray.findIndex(character => character.character !== ' ')
  }
  // create a timer to track how long the user is typing for
  startTimer = () => {
    let intervalId = Timer.startTimer()
    this.setState({
      intervalId
    })
  }
  onFocus = () => {
    if (!this.state.complete) {
      this.setState(prevState => {
        prevState.characters[prevState.target].cursor = true
        return {
          characters: prevState.characters,
          focused: true
        }
      })
    }
  }
  onBlur = () => {
    if (!this.state.complete) {
      this.setState(prevState => {
        prevState.characters[prevState.target].cursor = false
        return {
          characters: prevState.characters
        }
      })
    }
  }
  onCharacterEntered = (e) => {
    // prevent spacebar from scrolling down the page
    e.preventDefault()
    const isComplete = this.state.complete
    if (!isComplete) {
      // start the timer up because the user is now typing (dont worry we
      // check to make sure the timer isnt already started first)
      if (!this.state.intervalId) this.startTimer()

      const characterEntered = this.getCharacterEntered(e.which)
      const isCorrect = this.validate(characterEntered)

      //  if the value is correct, start updating the state
      if (isCorrect) {
        return this.setState(prevState => {
          let characters = prevState.characters
          let target = prevState.target
          let complete = prevState.complete
          characters[target].cursor = false

          // if user hits Enter, change the target to the next non space character
          if (characterEntered === '\n') {
            target = this.autoTab()
          }
          // as long as its not the last character, move the cursor right one position
          if (characters.length > prevState.target + 1) {
            characters[target + 1].cursor = true
          }
          // update the target now that the cursor has been reset
          target++

          // use is complete if the target is = to the length of the text blob
          if (characters.length === target) {
            complete = true
            Timer.stopTimer(this.state.intervalId)
          }
          // if the user autotabbed, update all the characters up until the current
          // position to be highlighted
          if (characterEntered === '\n') {
            characters.forEach((char, i) => {
              if (i < target) {
                char.highlight = true
              }
            })
            // if the user DID NOT autotab, only update the previous character
            // the reason for the 'else' is because I was seeing performance issues
            // when i mapped a new array on every single character entered
          } else {
            characters[target - 1].highlight = true
          }

          return {
            characters,
            target,
            complete,
            correctlyTypedCharacters: prevState.correctlyTypedCharacters + 1
          }
        })
      } else {
        // if the value was not correct, update the mistakes by 1
        this.setState(prevState => {
          const { score } = prevState
          score.mistakes = score.mistakes + 1
          return {
            score
          }
        })
      }
    }
  }

  stopTimer = () => {
    Timer.stopTimer(this.state.intervalId)
  }
  characters = () => {
    return this.state.characters.map((char, i) =>
      <Character highlight={char.highlight} key={i} cursor={char.cursor} character={char.character} />
    )
  }

  onSubmitScore = () => {
    const { exerciseId } = this.props
    const { score } = this.state
    score.time = Timer.getTime()
    create(exerciseId, score)
      .then(() => this.setState(this.getInitialState()))
      // TODO handle this error
      .catch(console.error)
  }
  render () {
    const { mistakes } = this.state.score
    const { focused, complete, correctlyTypedCharacters: total } = this.state
    const style = {
      display: 'inline-block',
      marginTop: '10px'
    }
    const helpClass = classNames(
      {hidden: focused},
      {'div-overlay': true}
    )
    const char = this.state.focused ? this.state.characters[this.state.target] || '' : ''
    const showScorecard = complete || this.props.scorecard
    return (
      <div>
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          { showScorecard &&
            <Scorecard
              complete={complete}
              mistakes={mistakes}
              time={Score.formatTime(Timer.getTime())}
              wpm={Score.wpm(total, Timer.getTime())}
              accuracy={Score.accuracy(total, mistakes)}
              onSubmit={this.onSubmitScore}/>
          }
        </CSSTransitionGroup>
        <Paper style={style}>
        <div className="typing-wrapper"
          onBlur={this.onBlur}
          tabIndex="1"
          onKeyPress={this.onCharacterEntered}
          onFocus={this.onFocus}>
          { !complete &&
            <div className={helpClass}>
              Click here to start
            </div>
          }
          <pre className='code'>
            {this.characters()}
          </pre>
        </div>
      </Paper>
      <Popover />
      { this.props.assistant && <TypingAssistant character={char} /> }
      </div>
    )
  }
}

export default TypingArea
