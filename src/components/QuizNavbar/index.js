/* eslint-disable no-unused-vars */
import React,{ useState } from 'react'
import axios from 'axios'
import { isLogin,logout } from '../../utils/index'
import { useHistory } from 'react-router-dom'
import { Navbar,Nav } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

const QuizNavbar = () => {
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
      .then(function () {
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
    <div style={{ marginBottom:'70px' }} className='nav-container'>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/quizsetquiz">Credify-Quiz</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="resp-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/quizsetquiz">New Quiz</Nav.Link>
            <Nav.Link href="/quizadminrankings">Quiz Rankings</Nav.Link>
            <Nav.Link href="/quizfeedback">Quiz Feedbacks</Nav.Link>
            <Nav.Link href="/quizlist">List Quiz</Nav.Link>
            <Nav.Link href="/quizstats">User Quiz Stats</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/admindash">Admin Dashboard</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default QuizNavbar