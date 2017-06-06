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

class ExerciseItem extends Component {
  constructor () {
    super()
    this.state = {
      expanded: false
    }
  }
  onItemClick = () => this.setState({expanded: !this.state.expanded})
  render () {
    const {id, name, onItemTouchTap, scores, editable} = this.props
    const { expanded } = this.state
    const expandStyle = {float: 'left'}
    return (
    <Paper style={{ margin: '20px auto', maxWidth: '700px' }}>

      <div className='paper-list-item'>
        <div data-value={id} onClick={this.onItemClick} className='paper-list-main'>
          {expanded ? <ExpandMore style={expandStyle} /> : <ExpandLess style={expandStyle} /> }
          <div>
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
      { expanded &&
        <div>
         <TopScores scores={scores}/>
           <Divider />
           <Link to={`/exercises/${id}`} >
         <RaisedButton style={{ margin: '20px' }} primary label="Start" />
         </Link>
       </div>
      }
    </Paper>

    )
  }
}
export default ExerciseItem
