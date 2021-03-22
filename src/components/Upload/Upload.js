import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import '../../css/Button.css'
import '../../css/cselect.css'
import './upload.css'


// import Toggle from '../utils/Toggle';
import CustomSelect from '../../utils/CustomSelect'

const Upload = () => {
  const [userCertDetails,setuserCertDetails] = useState(
    {
      csp: '',
      certlevel: '',
      certname: '',
      sbu: '',
      certid: '',
      dateofcert: '',
      expiry: '',
      certFile: null
    })
  const [error,setError] = useState('')

  let history = useHistory()


  const handleCustomSelect = (csp,certlevel,certname) => {
    setuserCertDetails({ ...userCertDetails,csp,certlevel,certname })
  }

  const handleSubmit = (e) => {

    e.preventDefault()
    // const usercred = {name, email, password};
    console.log('upload Button clicked',userCertDetails)

    const formData = new FormData()
    formData.append('pdf', userCertDetails.certFile)
    formData.append('csp', userCertDetails.csp)
    formData.append('level', userCertDetails.certlevel)
    formData.append('certname', userCertDetails.certname)
    formData.append('sbu', userCertDetails.sbu)
    formData.append('certid', userCertDetails.certid)
    formData.append('certified_date', userCertDetails.dateofcert)
    formData.append('expiry_date', userCertDetails.expiry)



    const url = 'https://credify.tk/certificates'
    var options = {
      headers: {
        'Authorization': `TOKEN ${localStorage.getItem('token')}`
      }
    }

    axios.post(url,formData,options)
      .then(function (response) {
        console.log(response)
        alert('Your Certificate has been uploaded!')
        document.getElementById('uploadform').reset()
        history.push('/dashboard')
      })
      .catch(function (error) {
        console.log(error.response)
        Object.entries(error.response.data).forEach(([key,value]) => {
          setError(`${key.charAt(0).toUpperCase() + key.slice(1)} : ${value[0]}`)
        })
      })
  }

  return (
    <div className="upload-container">
      <h2 id='header' style={{ marginBottom:'30px' }}>Upload Certificates</h2>
      <form id='uploadform' onSubmit={handleSubmit}>
        <CustomSelect setCert={handleCustomSelect}/>
        <label htmlFor='Certification ID'>Certification ID</label>
        <input
          required
          className='tinput'
          type='text'
          name='Certification ID'
          value={userCertDetails.certid}
          onChange={(e) => setuserCertDetails({ ...userCertDetails,certid:e.target.value })}/>
        <label htmlFor='SBU'>Select a SBU</label>
        <br/>
        <select onChange={(e) => setuserCertDetails({ ...userCertDetails,sbu:e.target.value })}
          name="SBU" required>
          <option className='disabled' defaultValue value>  select an option  </option>
          <option value='SBU 1'>SBU 1</option>
          <option value='SBU 2'>SBU 2</option>
          <option value='SBU 3'>SBU 3</option>
        </select>
        <br/>
        <label htmlFor="Date of Certification">Date of Certification</label>
        <input
          required
          type='date'
          name='Date of Certification'
          value={userCertDetails.dateofcert}
          placeholder='Date of Certification'
          onChange={(e) => setuserCertDetails({ ...userCertDetails,dateofcert:e.target.value })}/>
        <label htmlFor="Expiry Date of Certification">Expiry Date</label>
        <input
          required
          type='date'
          name='Expiry Date of Certification'
          value={userCertDetails.expiry}
          placeholder='Expiry Date of Certification'
          onChange={(e) => setuserCertDetails({ ...userCertDetails,expiry:e.target.value })}/>
        <label htmlFor="file">Certificate pdf</label>
        <input type="file" name="file" onChange={(e) => {setuserCertDetails({ ...userCertDetails,certFile:e.target.files[0] })}}/>
        {/* <Toggle name="Private" setVisibility={handleToggle} /> */}
        <input type='submit' value='Upload' className='submit upload'/>
        <div className="cancel">
          <Link to="/dashboard">
            <button type="button" className='cancelbtn'>Cancel</button>
          </Link>
        </div>

      </form>
      {
        error ? <p style={{ color:'red' }}> {error} </p> : ''
      }
    </div>

  )
}

export default Upload