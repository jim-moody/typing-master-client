import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import Auth from '../modules/Auth'

// use private routes to have user redirected to login if they
// are not logged in and try to access the route
const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props
  return (
  <Route {...rest} render={props => {
    const finalProps = Object.assign(props, {...rest})
    return Auth.isUserAuthenticated()
     ? <Component {...finalProps}/>
     : <Redirect to={{
       pathname: '/sign-in',
       state: { from: props.location }
     }}/>
  }
  }/>
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object
}
export default PrivateRoute
