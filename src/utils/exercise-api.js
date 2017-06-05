import $ from 'jquery'
import Auth from '../modules/Auth'

const url = process.env.REACT_APP_API_URL

const createExercise = (exercise) =>
  $.ajax({
    url: url + '/exercises',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + Auth.getToken()
    },
    data: {
      exercise
    }
  })

const index = () =>
$.ajax({
  url: url + '/exercises',
  method: 'GET',
  headers: {
    Authorization: 'Token token=' + Auth.getToken()
  }
})

const show = (id) =>
  $.ajax({
    url: url + '/exercises/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + Auth.getToken()
    }
  })

const update = (id, exercise) =>
  $.ajax({
    url: url + '/exercises/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + Auth.getToken()
    },
    data: { exercise }
  })

const destroy = id =>
  $.ajax({
    url: url + '/exercises/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + Auth.getToken()
    }
  })

export {
  createExercise,
  index,
  show,
  update,
  destroy
}
