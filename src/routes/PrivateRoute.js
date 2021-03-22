import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import UserNavbar from '../components/UserNavbar/Usernavbar'
import { isLogin,isAdmin } from '../utils'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (

  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /login page
    <Route {...rest} render={props => (
      isAdmin()===false && isLogin() ? (
        <>
          <UserNavbar />
          <Component {...props} />
        </>
      )
        : <Redirect to="/" />
    )} />
  )
}

export default PrivateRoute