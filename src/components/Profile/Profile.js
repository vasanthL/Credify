import React,{ useEffect, useState } from 'react'
import Certificate from '../Certificate/Certificate'
import axios from 'axios'

import './profile.css'

const Profile = () => {
  const [certs,getCerts] = useState('')
  // const [username,setUsername] = useState('')
  // const [email,setEmail] = useState('')
  useEffect(() => {
    getAllCerts()
    // const Userurl = 'https://credify.tk/user';
    // const options = {
    //   headers: {
    //     'Authorization': `TOKEN ${localStorage.getItem('token')}`
    //   }
    // };
    // axios.get(Userurl,options)
    //   .then(function (response) {
    //     console.log('response:',response.data);
    //     const user =response.data;

    //     setUsername(response.data.name);
    //     setEmail(response.data.email);
    //     console.log(email,username);


    //   })
    //   .catch(function (error) {
    //     console.log(error.response.status,error.response.data);
    //   });

  },[])

  const getAllCerts = () => {
    const Certurl = 'https://credify.tk/certificates'
    const options = {
      headers: {
        'Authorization': `TOKEN ${localStorage.getItem('token')}`
      }
    }
    axios.get(Certurl,options)
      .then(function (response) {
        const allCerts = response.data
        getCerts(allCerts)

      })
      .catch(function (error) {
        console.log(error.response.status,error.response.data)
        // Object.entries(error.response.data).forEach(([key,value]) => {
        //   setError(`${key.charAt(0).toUpperCase() + key.slice(1)} : ${value[0]}`);
        // })

      })
  }



  // const difDate = (d1,d2) => {
  //   const date1 = new Date(d1)
  //   const date2 = new Date(d2)
  //   console.log(date1,date2)
  //   const diffTime = Math.abs(date2 - date1)
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  //   return diffDays
  // }
  return (
    <div>
      <h1 style={{ marginLeft:'45px',fontSize:'35px',marginTop:'45px' }}>My Certificates</h1>
      <div className="certcontainer">
        <Certificate certs={certs}/>
      </div>
    </div>
  )
}

export default Profile