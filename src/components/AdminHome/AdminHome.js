import React,{ useState } from 'react'
import Logout from '../Logout/Logout'
import { Link } from 'react-router-dom'
import Users from '../Users/Users'
import { useHistory } from 'react-router-dom'

import './adminhome.css'


const AdminHome = () => {
  const [empid,setEmpid] = useState(0)
  // const [showUsers,setShowUsers] = useState(false)

  let history=useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    document.getElementById('searchForm').reset()
    history.push(`/usercerts/${empid}`)
  }
  return (
    <div className='admin-container'>
      <h1 style={{ marginTop:'70px' }}>Admin Dashboard</h1>
      <form id='searchForm' onSubmit={handleSubmit}>
        <input
          required
          className='tinput search-input'
          type='text'
          name='Employee ID'
          placeholder='Employee Id'
          onChange={(e) => setEmpid(e.target.value)}/>
        <input type='submit' value='Search' className='submit search-btn'/>
      </form>
      <Users />
      <Link to="/admindash" style={{ textDecoration: 'none' }}>
        Admin Dashboard
      </Link>
      <Logout/>
    </div>
  )
}

export default AdminHome