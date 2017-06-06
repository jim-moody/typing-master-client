import $ from 'jquery'
import Auth from '../modules/Auth'

const url = process.env.REACT_APP_API_URL

const create = (exerciseId, score) =>
  $.ajax({
    url: url + '/exercises/' + exerciseId + '/scores',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + Auth.getToken()
    },
    data: {
      score
    }
  })

export {
    create
  }
