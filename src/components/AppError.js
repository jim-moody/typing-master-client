import React from 'react'
import Snackbar from 'material-ui/Snackbar'

const AppError = ({open, message}) =>
      <Snackbar
        autoHideDuration={4000}
        open={open}
        message={message}/>

export default AppError
