import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Character from './Character'
import Divider from 'material-ui/Divider'
import '../styles/TypingArea.css'

const preStyle = {
  padding: 100,
  margin: 0
}

class TypingArea extends Component {
  constructor (props) {
    super(props)

    const characters = this.formatCharacters(props.text)
    this.state = {
      characters,
      mistakes: 0,
      target: 0,
      intervalId: 0,
      complete: false,
      seconds: 0,
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
    if (!this.state.intervalId) {
      const intervalId = setInterval(() => {
        this.setState({
          seconds: this.state.seconds + 1
        })
      }, 1000)
      this.setState({intervalId})
    }
  }
  onFocus = () => {
    if (!this.state.complete) {
      this.setState(prevState => {
        prevState.characters[prevState.target].cursor = true
        return {
          characters: prevState.characters
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
    this.setState({ mistakes: this.state.mistakes + 1 })
  }

  stopTimer = () => {
    clearInterval(this.state.intervalId)
  }
  wpm = () => {
    return Math.round((this.state.correctlyTypedCharacters / 5) / (this.state.seconds / 60))
  }

  characters = () => {
    return this.state.characters.map((char, i) =>
      <Character highlight={char.highlight} key={i} cursor={char.cursor} character={char.character} />
    )
  }
  render () {
    return (
      <div>
        <ul>
          <li>Mistakes: {this.state.mistakes}</li>
          <li>Time(seconds) {this.state.seconds}</li>
          <li>Words Per Minute: {this.wpm()}</li>
        </ul>

        <Divider />
        <div className="typing-wrapper" onBlur={this.onBlur} onFocus={this.onFocus} tabIndex="1" onKeyPress={this.onCharacterEntered}>
          <pre style={preStyle} className="code">
            {this.characters()}
          </pre>
        </div>
      </div>
    )
  }
}
TypingArea.propTypes = {
  text: PropTypes.string.isRequired
}
export default TypingArea
