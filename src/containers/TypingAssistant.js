import React, {Component} from 'react'
import '../styles/TypingAssistant.css'
import FingerMap from '../modules/FingerMap'

class TypingAssistant extends Component {
  render () {
    const character = this.props.character.character || ''
    let finger = FingerMap.getFinger(character.toUpperCase())
    const iter = [5, 6, 7, 8, 9]
    // console.log(character)

    const leftFingers = iter.map((e, i) => {
      let classes = 'finger'
      if (i === 4) classes += ' thumb'
      if (i === 4 && (finger === 4 || finger === 5)) classes += ' active'
      else if (finger === i) classes += ' active'
      // show highlight on both thumbs when character is a space (spacebar)
      return <div key={i} className={classes}></div>
    })

    const rightFingers = iter.map((e, i) => {
      let classes = 'finger'
      if (i === 0) classes += ' thumb'
      if (i === 0 && (finger === 4 || finger === 5)) classes += ' active'
      else if (finger === e) classes += ' active'
      // show highlight on both thumbs when character is a space (spacebar)
      return <div key={i} className={classes}></div>
    })

    return (
      <div className='TypingAssistant'>
        <div className="hand">
          <div className="fingers">
            {leftFingers}
          </div>
          <div className="back"></div>
        </div>
        <div className="hand">
          <div className="fingers">
            {rightFingers}
          </div>
          <div className="back"></div>
        </div>
      </div>
    )
  }
}

export default TypingAssistant
