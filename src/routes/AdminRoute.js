import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AdminNavbar from '../components/AdminNavbar'
import QuizNavbar from '../components/QuizNavbar'
import { isAdmin, isLogin } from '../utils/index'
import { useLocation } from 'react-router-dom'


const AdminRoute = ({ component: Component, ...rest }) => {
  const loc = useLocation().pathname

  return (

  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /login page
    <Route {...rest} render={props => (
      isAdmin()===true && isLogin()===true ?
        (
          <>
            {loc.slice(0,5)==='/quiz' ? <QuizNavbar/> : <AdminNavbar/>}
            <Component {...props} />
          </>
        )
        : <Redirect to="/" />
    )} />
  )
}

export default AdminRoute