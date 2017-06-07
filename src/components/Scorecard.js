/* eslint react/prop-types: 0 */
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

const Scorecard = ({mistakes, time, wpm, accuracy, onSubmit}) =>
<div className='scorecard'>
  <Paper>
    <div>
      <h3 style={{marginBottom: '0'}}>Score</h3>
    <ul>
      <li>
        <span>Mistakes</span>
        <span>{mistakes}</span>
      </li>
      <li>
        <span>Seconds</span>
        <span>{time}</span>
      </li>
      <li>
        <span>Words Per Minute</span>
        <span>{wpm}</span>
      </li>
      <li>
        <span>Accuracy</span>
        <span>{accuracy}%</span>
      </li>
    </ul>
    <RaisedButton style={{marginBottom: '10px'}}onClick={onSubmit} primary label="Submit" />
    </div>
  </Paper>
</div>
export default Scorecard
