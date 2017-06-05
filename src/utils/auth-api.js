import $ from 'jquery'
const url = process.env.REACT_APP_API_URL

const signUp = ({email, password, passwordConfirmation: password_confirmation}) =>
  $.ajax({
    url: url + '/sign-up',
    method: 'POST',
    data: {
      credentials: {
        email,
        password,
        password_confirmation: password
      }
    }
  })

const signIn = ({email, password}) =>
  $.ajax({
    url: url + '/sign-in',
    method: 'POST',
    data: {
      credentials: {
        email,
        password
      }
    }
  })

const signOut = (token, userId) =>
    $.ajax({
      url: url + '/sign-out/' + userId,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + token
      }
    })

const changePassword = (passwords, token, userId) => {
  return $.ajax({
    url: url + '/change-password/' + userId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + token
    },
    data: {
      passwords
    }

  })
}

export {
  signUp,
  signIn,
  changePassword,
  signOut
}
