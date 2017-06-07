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
import '../styles/TypingArea.css'

class TypingArea extends Component {
  constructor (props) {
    super(props)
    // console.log(props.history)

    const characters = this.formatCharacters(props.text)
    this.state = {
      score: {
        mistakes: 0,
        time: 0
      },
      focused: false,
      characters,
      target: 0,
      intervalId: 0,
      complete: false,
      correctlyTypedCharacters: 0,
      isBlocking: true
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
    if (!this.state.intervalId) {
      let t = 0
      const intervalId = setInterval(() => {
        t = parseFloat(t) + 0.1
        t = t.toFixed(1)
        this.setState(prevState => {
          const { score } = prevState
          score.time = t
          return {
            score
          }
        })
      }, 100)
      this.setState({intervalId})
    }
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
    // start the timer up because the user is now typing (dont worry we
    // check to make sure the timer isnt already started first)
    this.startTimer()
    const characterEntered = this.getCharacterEntered(e.which)
    const isCorrect = !this.state.complete && this.validate(characterEntered)

    //  if the value is correct, start updating the state
    if (isCorrect) {
      return this.setState(prevState => {
        let characters = prevState.characters
        let target = prevState.target
        let complete = false
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
          this.stopTimer(this.state.intervalId)
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
    }
    // if the value was not correct, update the mistakes by 1
    this.setState(prevState => {
      const { score } = prevState
      score.mistakes = score.mistakes + 1
      return {
        score
      }
    })
  }

  stopTimer = () => {
    clearInterval(this.state.intervalId)
  }
  characters = () => {
    return this.state.characters.map((char, i) =>
      <Character highlight={char.highlight} key={i} cursor={char.cursor} character={char.character} />
    )
  }
  onSubmitScore = () => {
    const { exerciseId } = this.props
    const { score } = this.state
    create(exerciseId, score)
      .then(() => {
        this.props.history.push('/exercises')
      })
      // TODO handle this error
      .catch(console.error)
  }
  render () {
    const { time, mistakes } = this.state.score
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
    return (
      <div style={{display: 'flex', flexDirection: 'column', maxWidth: '700px', margin: '0 auto'}}>
        <h2 style={{textAlign: 'center'}}>Typing Area</h2>
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          { complete &&
            <Scorecard
              mistakes={mistakes}
              time={Score.formatTime(time)}
              wpm={Score.wpm(total, time)}
              accuracy={Score.accuracy(total, mistakes)}
              onSubmit={this.onSubmitScore}/>
          }
        </CSSTransitionGroup>
        <Paper style={style}>
        <div className="typing-wrapper"
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          tabIndex="1"
          onKeyPress={this.onCharacterEntered}>
          <pre className='code'>
            {this.characters()}
          </pre>
        </div>
      </Paper>
      <Popover />
      <TypingAssistant character={char} />
      </div>
    )
  }
}
// { !complete && <div className={helpClass} > Click here to start</div> }
TypingArea.propTypes = {
  text: PropTypes.string.isRequired,
  exerciseId: PropTypes.string.isRequired
}
export default TypingArea
