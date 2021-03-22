import axios from 'axios'
import React,{ useEffect, useState } from 'react'
import Certificate from '../Certificate/Certificate'
// import Popup from '../Popup/Popup'
import './UserCertificates.css'

const UserCertificates = (props) => {
  console.log(props)
  console.log('User certs userid props',props.match.params.userid)
  const [certs,getCerts] = useState('')
  const user_id=props.match.params.userid
  // let [trigger,setTrigger] = useState(false);
  useEffect(() => {
    getUserCerts()
  },[])

  const getUserCerts = () => {
    const url = 'https://credify.tk/alluserscertificates'
    var options = {
      headers: {
        'Authorization': `TOKEN ${localStorage.getItem('token')}`
      }
    }
    axios.post(url,{ user_id },options)
      .then(response => {
        console.log(response.data)
        getCerts(response.data)
      })
      .catch(function (error) {
        console.log(error.response.status,error.response)
      })
  }

  return(
    <>
      <h1 className='uc-title'>Users Certificates</h1>
      {/* <button className="submit popup-btn" onClick={()=>setTrigger(true)}>Send Mail</button> */}
      <div className="certcontainer">
        <Certificate certs={certs}/>
      </div>
      {/* <Popup trigger={trigger} setTrigger={setTrigger} userid={userid} setUserid={setUserid} /> */}
    </>
  )
}

export default UserCertificates