import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import '../styles/NewExercise.css'

const EditExercise = ({onSubmit, onChange, value}) =>
  <div className="new-exercise">
    <Paper style={{
      maxWidth: '750px',
      margin: '0 auto',
      padding: '10px',
      marginTop: '20px'
    }}>
      <h3>New Exercise</h3>
      <form onSubmit={onSubmit}>
        <TextField onChange={onChange} name="new-exercise" style={{
          width: '90%'
        }} className="new-exercise" value={value} placeholder="Enter text here" multiLine={true}/>
        <RaisedButton type="submit" primary label="Submit"/>
      </form>
    </Paper>
  </div>

EditExercise.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
}
export default EditExercise
