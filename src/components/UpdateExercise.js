import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import '../styles/NewExercise.css'

const containerStyle = {
  maxWidth: '750px',
  margin: '0 auto',
  padding: '2em',
  marginTop: '20px'
}
const buttonContainer = {width: '90%', paddingTop: '15px', textAlign: 'right', clear: 'both'}

const UpdateExercise = ({onSubmit, onChange, exercise, errors, title}) =>
<Paper style={containerStyle}>
  <div className="new-exercise">
      <h2>{title}</h2>
        <p className='error-message'>{errors.description}</p>
        <TextField onChange={onChange} floatingLabelText='Exercise Name' name="name"
          className="new-exercise" errorText={errors.name} value={exercise.name} />
        <TextField maxLength={750} onChange={onChange} floatingLabelStyle={{left: '0'}} floatingLabelText='Exercise Text'
          name="text" className="new-exercise" fullWidth errorText={errors.text} value={exercise.text} multiLine/>
        <div style={{textAlign: 'left', color: 'lightgray', fontSize: '0.9em'}}>750 character limit</div>
      <div style={buttonContainer}>
          <RaisedButton onClick={onSubmit} type="submit" primary label="Submit"/>
        </div>
  </div>
</Paper>

UpdateExercise.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired,
  errors: PropTypes.object,
  title: PropTypes.string
}
export default UpdateExercise
