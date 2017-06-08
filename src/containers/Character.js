import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class Character extends Component {
  render () {
    const classes = classNames(
      {cursor: this.props.cursor},
      {highlight: this.props.highlight}
    )

    return (
    <span className={classes}>{this.props.character}</span>
    )
  }
}

Character.propTypes = {
  cursor: PropTypes.bool,
  highlight: PropTypes.bool,
  character: PropTypes.string.isRequired
}
export default Character
