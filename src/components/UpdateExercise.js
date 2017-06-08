/* eslint react/prop-types: 0 */
import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'
import '../styles/UpdateExercise.css'

const UpdateExercise = ({onSubmit, onChange, exercise, errors, title}) =>
<div className='UpdateExercise'>
  <Paper>
    <div className="container">
        <h2>{title}</h2>
          <p className='error-message'>{errors.description}</p>
          <TextField
            onChange={onChange}
            floatingLabelText='Exercise Name'
            name="name"
            className="new-exercise"
            errorText={errors.name}
            value={exercise.name} />
          <TextField
            maxLength={750}
            onChange={onChange}
            floatingLabelStyle={{left: '0'}}
            floatingLabelText='Exercise Text'
            name="text"
            className="new-exercise"
            fullWidth
            errorText={errors.text}
            value={exercise.text}
            multiLine />
          <div className='textfield-info'>750 character limit</div>
        <div className='button-container'>
          <Link to="/exercises">
            <RaisedButton
              style={{float: 'left'}}
              type="cancel"
              label="Cancel"/>
          </Link>
            <RaisedButton
              onClick={onSubmit}
              type="submit"
              primary
              label="Submit"/>
          </div>
    </div>
  </Paper>
</div>

export default UpdateExercise
