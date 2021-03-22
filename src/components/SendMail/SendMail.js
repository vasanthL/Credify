/* eslint-disable no-irregular-whitespace */
import axios from 'axios'
import React,{ useState } from 'react'
import './SendMail.css'

const SendMail = (props) => {
  const empid=props.empid
  const [message,setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const url = 'https://credify.tk/sendmail'
    var options = {
      headers: {
        'Authorization': `TOKEN ${localStorage.getItem('token')}`
      }
    }
    axios.post(url,{ empid,msg:message },options)
      .then(response => {
        alert(response.data)
        document.getElementById('sendForm').reset()
      })
      .catch(error => {
        console.log(error.response)
      })
  }

  return(
    <>
      <h1 style={{ marginBottom:'30px' }}>Send Mail</h1>
      <form id='sendMailForm' onSubmit={handleSubmit}>
      ​<textarea id="txtArea" name='Message' placeholder='Enter your message here' value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="18" cols="40"></textarea>
        <input type='submit' value='Send' className='submit send-btn'/>
      </form>
    </>
  )
}

export default SendMail