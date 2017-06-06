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

class TopScores extends Component {
  topScores () {
    let { scores } = this.props
    scores.sort(this.sorter)
    return scores.filter((e, i) => i < 5)
  }
  sorter (a, b) {
    const accuracyA = Score.accuracy(a.exerciseLength, a.mistakes)
    const accuracyB = Score.accuracy(b.exerciseLength, b.mistakes)
    if (accuracyA === accuracyB) {
      return a.wpm < b.wpm
    } else {
      return accuracyA < accuracyB
    }
  }
  render () {
    const rows = this.topScores().map((score, i) => {
      const date = moment(score.createdAt).format('DD/MM/YYYY')
      const accuracy = Score.accuracy(score.exerciseLength, score.mistakes)
      return (
        <TableRow key={i}>
          <TableRowColumn>{i + 1}</TableRowColumn>
          <TableRowColumn>jim</TableRowColumn>
          <TableRowColumn>{date}</TableRowColumn>
          <TableRowColumn>{accuracy}%</TableRowColumn>
          <TableRowColumn>{score.wpm}</TableRowColumn>
        </TableRow>
      )
    })
    return (
  <div>
    <h3>Top 5</h3>
  <Table>
    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
      <TableRow>
        <TableHeaderColumn>Number</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Date</TableHeaderColumn>
        <TableHeaderColumn>Accuracy</TableHeaderColumn>
        <TableHeaderColumn>Words Per Minute</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {rows}
    </TableBody>
  </Table>
  </div>
    )
  }
}

export default TopScores
