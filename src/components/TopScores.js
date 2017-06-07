/* eslint react/prop-types: 0 */
import React, {Component} from 'react'
import moment from 'moment'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import Score from '../modules/Score'
import FlatButton from 'material-ui/FlatButton'

class TopScores extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false
    }
  }
  topScores () {
    let { scores } = this.props
    scores.sort(this.sorter)
    if (!this.state.expanded) {
      return scores.filter((e, i) => i < 5)
    }
    return scores
  }
  sorter (a, b) {
    const accuracyA = Score.accuracy(a.exerciseLength, a.mistakes)
    const accuracyB = Score.accuracy(b.exerciseLength, b.mistakes)
    if (accuracyA > accuracyB) {
      return -1
    } else if (accuracyA < accuracyB) {
      return 1
    }

    if (a.wpm > b.wpm) {
      return -1
    } else if (a.wpm < b.wpm) {
      return 1
    }
    if (a.createdAt > b.createdAt) {
      return 1
    } else if (a.createdAt < b.createdAt) {
      return -1
    } else {
      return 0
    }
  }
  sortBySpeed (a, b) {
    return a.wpm < b.wpm
  }
  onShowMore = () => {
    this.setState({expanded: !this.state.expanded})
  }
  render () {
    const buttonLabel = this.state.expanded ? 'Show Less' : 'Show More'
    const atLeastOneTopScore = this.props.scores.length > 0
    const colWidth = ['15%', '35%', '20%', '15%', '15%']
    const fontSize = '1em'
    const rows = this.topScores().map((score, i) => {
      const date = moment(score.createdAt).format('M/D/YYYY')
      const accuracy = Score.accuracy(score.exerciseLength, score.mistakes)
      return (
        <TableRow key={i}>
          <TableRowColumn style={{width: colWidth[0], fontSize}}>{i + 1}</TableRowColumn>
          <TableRowColumn
            className={score.editable ? 'currentUser' : ''}
            style={{width: colWidth[1], fontSize, overflow: 'auto', textOverflow: 'auto'}}>
            {score._owner.email}
          </TableRowColumn>
          <TableRowColumn style={{width: colWidth[2], fontSize}}>{date}</TableRowColumn>
          <TableRowColumn style={{width: colWidth[3], fontSize}}>{accuracy}%</TableRowColumn>
          <TableRowColumn style={{width: colWidth[4], fontSize}}>{score.wpm}</TableRowColumn>
        </TableRow>
      )
    })
    return (
  <div>
    <div>
    { atLeastOneTopScore
      ? <div>
        <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn style={{width: colWidth[0], fontSize}}>Rank</TableHeaderColumn>
            <TableHeaderColumn style={{width: colWidth[1], fontSize}}>Name</TableHeaderColumn>
            <TableHeaderColumn style={{width: colWidth[2], fontSize}}>Date</TableHeaderColumn>
            <TableHeaderColumn style={{width: colWidth[3], fontSize}}>Accuracy</TableHeaderColumn>
            <TableHeaderColumn style={{width: colWidth[4], fontSize}}>WPM</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {rows}
        </TableBody>
      </Table>
      <FlatButton onClick={this.onShowMore} label={buttonLabel}/>
      </div>
      : <p> No scores yet</p>
      }
    </div>
  </div>

    )
  }
}

export default TopScores