/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// Material UI
import Paper from 'material-ui/Paper'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TopScores from './TopScores'
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less'
import classNames from 'classnames'
import Score from '../modules/Score'
import '../styles/ExerciseItem.css'
import {teal500} from 'material-ui/styles/colors'

class ExerciseItem extends Component {
  onItemClick = () => this.setState({expanded: !this.state.expanded})
  render () {
    const {id, name, onItemTouchTap, editable, text, scores} = this.props

    // if the exercise item has an editable button, then move the title over
    // 50px to make it line up
    const adjustForActions = !editable ? {marginRight: '50px'} : {}
    const length = text.length
    const averageWpm = Score.averageWpm(scores) || 'N/A'
    const averageAccuracy = Score.averageAccuracy(scores)
      ? Score.averageAccuracy(scores) + '%'
      : 'N/A'
    return (
    <Paper className="ExerciseItem" style={{margin: '20px auto', maxWidth: '700px' }}>

      <div className='paper-list-item'>
        <div data-value={id} onClick={this.onItemClick} className='paper-list-main'>
          <div className='exercise-name' style={adjustForActions}>
            {name}
          </div>
        </div>
        { editable &&
          <IconMenu value={id} onItemTouchTap={onItemTouchTap}
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
            <MenuItem name='edit' value={id} primaryText="Edit" />
            <MenuItem name='delete' value={id} primaryText="Delete" />
          </IconMenu>
        }
      </div>
      <Divider />
      <div className="options">
        <div className="attributes">
          <div><span>Length:</span> {length}</div>
            <div><span>Average WPM:</span> {averageWpm}</div>
            <div><span>Accuracy:</span> {averageAccuracy}</div>
        </div>
        <div className="start">
          <Link to={`/exercises/${id}`} >
            <RaisedButton style={{margin: '20px'}} labelColor={teal500} label="View Exercise" />
          </Link>
          </div>
        </div>

      <Divider />

    </Paper>

    )
  }
}
export default ExerciseItem
