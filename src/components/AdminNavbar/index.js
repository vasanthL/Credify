/* eslint-disable no-unused-vars */
import React,{ useState } from 'react'
import axios from 'axios'
import { isLogin,logout } from '../../utils/index'
import { useHistory } from 'react-router-dom'
import { Navbar,Nav,NavDropdown } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'



const AdminNavbar = () => {
  const [isLoggedin,setIsLoggedin] = useState(isLogin())
  let history = useHistory()

  const handleLogout = () => {
    var options = {
      headers: {
        'Authorization': `TOKEN ${localStorage.getItem('token')}`
      }
    }

    const url = 'https://credify.tk/logout'
    axios.post(url,null,options)
      .then(function (response) {
        setIsLoggedin(false)
        logout()
        history.push('/login')
      })
      .catch(function (error) {
        console.log(error.response.status)
        if(error.response.status===401){
          alert('Ooops!!! Your session has expired')
          logout()
          history.push('/login')
        }
      })
  }
  return (
    <div className='nav-container'>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/admindash">Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="resp-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="/admindash">Dashboard</Nav.Link> */}
            <Nav.Link href="/users">Manage Users</Nav.Link>
            <NavDropdown title="Manage Certificates" id="basic-nav-dropdown">
              <NavDropdown.Item href="/adminallcerts">All Certificates</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/adminexpiring">Expiring Certificates</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/adminexpired">Expired Certificates</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/quizsetquiz">Manage Quiz</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default AdminNavbar