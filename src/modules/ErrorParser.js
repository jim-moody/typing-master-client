const ErrorParser = {
  errorMessage (response) {
    let errorMessage = 'Sorry something went wrong, please try again'
    if (response.responseJSON && response.responseJSON.error) {
      const { errors } = response.responseJSON.error
      for (let error in errors) {
        if (errors[error].path === 'email' && errors[error].kind === 'unique') {
          errorMessage = 'Sorry, this email is already taken.'
        }
      }
    }
    return errorMessage
  }
}

export default ErrorParser
