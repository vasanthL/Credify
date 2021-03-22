import React,{ useState,useEffect } from 'react'
import Certificate from '../Certificate/Certificate'
import axios from 'axios'



const AdminExpiring = () => {
  const [certs,getCerts] = useState('')
  const [expiryThreshold,setExpiryThreshold] = useState(0)
  const [isClicked,setIsClicked] = useState(false)
  const [isbtntrigger,setIsBtnTrigger] = useState(false)
  const [certids,setCertids]= useState([])

  useEffect(() => {
    setIsClicked(false)
  },[])

  const getUserCerts = () => {
    const url = 'https://credify.tk/expiring'
    var options = {
      headers: {
        'Authorization': `TOKEN ${localStorage.getItem('token')}`
      }
    }
    axios.post(url,{ 'days':Number(expiryThreshold) },options)
      .then(response => {
        console.log(response.data)
        getCerts(response.data)
        const certs =  response.data
        setCertids(certs.map(cert => cert.id))
      })
      .catch(function (error) {
        console.log(error.response.status,error.response)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getUserCerts()
    setIsClicked(true)
  }
  const notifyAll = () => {
    const url = 'https://credify.tk/sendmail'
    var options = {
      headers: {
        'Authorization': `TOKEN ${localStorage.getItem('token')}`
      }
    }
    axios.post(url,{ certids },options)
      .then(response => {
        if(isbtntrigger){
          document.getElementById('searchForm').reset()
          setExpiryThreshold(0)
          setIsBtnTrigger(false)
        }
        alert(response.data)
        setCertids([])
      })
      .catch(function (error) {
        console.log(error.response.status,error.response)
      })
  }

  const notifySingle = (i) => {
    const id = certids[i]
    setCertids([id])
    notifyAll()
  }
  return (
    <div className='admin-container'>
      <h1 style={{ marginTop:'20px' }}>Expiring Certificates</h1>
      <form id='searchForm' onSubmit={handleSubmit}>
        <input
          required
          className='tinput search-input'
          type='number'
          name='expiry days'
          placeholder='Expiry days'
          onChange={(e) => setExpiryThreshold(e.target.value)}/>
        <input type='submit' value='Search' className='submit search-btn'/>
      </form>
      <input type='submit'
        onClick={() => {if(expiryThreshold!==0){setIsBtnTrigger(true);notifyAll()}else alert('Please enter expiry days')}}
        value='Notify All' className='submit search-btn'/>
      {
        isClicked || certs.length ? (
          <div className="certcontainer">
            <Certificate certs={certs} notifySingle={notifySingle}/>
          </div>
        ) : isClicked===false ?
          <h5>Enter the Expiry days and Search</h5>
          : <h2>No Expired Certificates yet</h2>
      }

    </div>
  )
}

export default AdminExpiring