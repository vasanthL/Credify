import React from 'react'
import { isAdmin, isLogin } from '../../utils/index'
import Login from '../Login/Login'
import Dashboard from '../Dashboard/Dashboard'
import AdminDashboard from '../AdminDashboard/AdminDashboard'
import AdminNavbar from '../AdminNavbar'



const Home = () => {
  if(isAdmin() && isLogin())
    return (
      <>
        <AdminNavbar/>
        <AdminDashboard />
      </>
    )
  else if(isLogin() && isAdmin()===false)
    return (
      <>
        <AdminNavbar />
        <Dashboard/>
      </>
    )
  else
    return <Login/>
}

export default Home
