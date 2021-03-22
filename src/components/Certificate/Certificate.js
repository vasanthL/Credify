import React from 'react'
// import { useHistory } from 'react-router-dom'
import '../Profile/profile.css'

import '../../css/card.css'
import { isAdmin } from '../../utils'
import { useLocation } from 'react-router-dom'
import GCP from '../../img/GCP.png'
import AWS from '../../img/AWS.png'
import Azure from '../../img/Azure.png'


const Certificate= (props) => {
  let loc
  try{
    loc = useLocation().pathname
  }
  catch(e){
    loc = null
  }
  // console.log('Certifcates.js props:',props)
  const difDate = (d2) => {
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0')
    var yyyy = today.getFullYear()
    const date1 =new Date(`${yyyy}/${mm}/${dd}`)
    const date2 = new Date(d2)
    const diffTime = date2 - date1
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }
  const { certs } = props
  // console.log(certs)
  if(certs.length>0){
    return(
      certs.map((cert,i) => {
        return(
          <div key={i} className="c-card">
            <div className="card-img" >
              { cert.csp==='GCP' ?
                <img src={GCP} alt="Google Cloud Platform" />
                : cert.csp==='AWS' ?
                  <img src={AWS} alt="Amazon Web Services" />
                  :
                  <img src={Azure} alt="Microsoft Azure" />
              }
            </div>
            <div className="card-body">
              <div className="card-title">{cert.certname}</div>
              {isAdmin() &&
                  <>
                    <div className="card-intro">Email: {cert.user.email}</div>
                    <div className="card-intro">Employee ID: {cert.user.empid}</div>
                  </>
              }
              <div className="card-intro">{cert.csp}</div>
              <div className="card-intro">Certification ID : {cert.certid}</div>
              <div className="card-intro">Expiry Date : {cert.expiry_date}</div>
              { difDate(cert.expiry_date) ?
                <div className="card-intro">Ends in : {difDate(cert.expiry_date)} days</div>
                :
                <div className="card-intro" style={{ color:'red' }}>Expired</div>

              }
            </div>
            <div className='card-btn'>
              <a target="_blank" rel="noreferrer" style={{ textDecoration:'none',fontSize:'18px' }} href={cert.pdf_url} className='submit'>View</a>
              {props.notifySingle ? <a onClick={() => props.notifySingle(i)} style={{ marginLeft:'110px',textDecoration:'none',fontSize:'18px' }} className="submit">Notify</a> : ''}
              {(isAdmin() && loc.slice(0,-2)==='/usercerts') || props.deleteCertificate ? <a onClick={() => props.deleteCertificate(cert.id)} style={{ cursor:'pointer',marginLeft:'110px',textDecoration:'none',fontSize:'18px' }} className="submit">Delete</a> : ''}
            </div>
          </div>
        )
      })

    )

  }
  else{
    return (
      <>
        <div className="c-card">
          <div className="card-img skeleton"></div>
          <div className="card-body">
            <div className="card-title skeleton"></div>
            <div className="card-intro skeleton"></div>
            <div className='card-sbtn skeleton'></div>
          </div>
        </div>
        <div className="c-card">
          <div className="card-img skeleton"></div>
          <div className="card-body">
            <div className="card-title skeleton"></div>
            <div className="card-intro skeleton"></div>
            <div className='card-sbtn skeleton'></div>
          </div>
        </div>
        <div className="c-card">
          <div className="card-img skeleton"></div>
          <div className="card-body">
            <div className="card-title skeleton"></div>
            <div className="card-intro skeleton"></div>
            <div className='card-sbtn skeleton'></div>
          </div>
        </div>
        <div className="c-card">
          <div className="card-img skeleton"></div>
          <div className="card-body">
            <div className="card-title skeleton"></div>
            <div className="card-intro skeleton"></div>
            <div className='card-sbtn skeleton'></div>
          </div>
        </div>

      </>
    )
  }

}

export default Certificate