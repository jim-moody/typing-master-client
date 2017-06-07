/* eslint react/prop-types: 0 */
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import '../styles/Scorecard.css'
const Scorecard = ({complete, mistakes, time, wpm, accuracy, onSubmit}) =>
<div className='Scorecard'>
  <Paper>
    <div>
    <ul>
      <li>
        <span>Words Per Minute</span>
        <span>{wpm}</span>
      </li>
      <li>
        <span>Accuracy</span>
        <span>{accuracy}%</span>
      </li>
    </ul>
    { complete && <RaisedButton style={{marginBottom: '10px'}}onClick={onSubmit} primary label="Submit" /> }
    </div>
  </Paper>
</div>
export default Scorecard
