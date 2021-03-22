/* eslint-disable no-unused-vars */
import React,{ useState } from 'react'
import { isLogin,logout } from '../../utils/index'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import '../../css/Button.css'

const Logout = () => {
  const [isLoggedin,setIsLoggedin] = useState(isLogin())
  let history = useHistory()

  const handleSubmit = () => {
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
    <input type='button' onClick={handleSubmit} className='submit' value='Logout'
      style={{ margin:'0px',position:'absolute',top:'25px',right:'40px',fontSize:'18px' }} />
  )
}

export default Logout