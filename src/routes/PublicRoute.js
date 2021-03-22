import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLogin,isAdmin } from '../utils'

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      if(isAdmin() && restricted){
        return <Redirect to="/admin" />
      }
      else if(isAdmin===false && isLogin() && restricted){
        return <Redirect to="/dashboard" />
      }
      else{
        return <Component {...props} />
      }

    }
    } />
  )
}

export default PublicRoute