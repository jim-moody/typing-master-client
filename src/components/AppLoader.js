import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import '../styles/AppLoader.css'

class AppLoader extends Component {
  render () {
    return (
      <div className="overlay">
        <div className="centered">
        <CircularProgress size={75} className="centered"/>
        </div>
      </div>
    )
  }
}

export default AppLoader
