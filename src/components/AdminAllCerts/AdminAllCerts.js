import React,{ useState,useEffect } from 'react'
import Certificate from '../Certificate/Certificate'
import axios from 'axios'
import { deleteCertificate } from '../../utils/delete'
import CustomSelect from '../../utils/CustomSelect'

const AdminAllCerts = (props) => {
  const [certs,getCerts] = useState('')
  const [cspSelected,setcspSelected] = useState(null)
  const [levelSelected,setlevelSelected] = useState(null)
  const [nameSelected,setnameSelected] = useState(null)
  const [sbuSelected,setsbuSelected] = useState(null)

  useEffect(() => {
    getUserCerts()
  },[cspSelected,levelSelected,nameSelected,sbuSelected])

  const getUserCerts = () => {
    const url = 'https://credify.tk/alluserscertificates'
    var options = {
      headers: {
        'Authorization': `TOKEN ${localStorage.getItem('token')}`
      }
    }
    console.log('here')
    if(props.location.fromDashboard){
      let sbu
      try{
        sbu = props.location.sbu ? { sbu:props.location.sbu } : null
      }
      catch(e){
        sbu=null
      }
      console.log('sbu:',sbu)
      axios.post(url,sbu,options)
        .then(response => {
          console.log(response.data)
          getCerts(response.data)
        })
        .catch(function (error) {
          console.log(error.response.status,error.response)
        })
    }
    else{
      console.log('sbu:',sbuSelected)
      let reqbody = null
      reqbody = sbuSelected && cspSelected && levelSelected && nameSelected ? { sbu:sbuSelected,csp:cspSelected,level:levelSelected,certname:nameSelected } :
        sbuSelected && cspSelected && levelSelected ? { sbu:sbuSelected,csp:cspSelected,level:levelSelected } :
          sbuSelected && cspSelected ? { sbu:sbuSelected,csp:cspSelected }  :
            cspSelected ? { csp:cspSelected } :
              sbuSelected ? { sbu:sbuSelected } : null
      console.log('reqbody',reqbody)
      axios.post(url,reqbody,options)
        .then(response => {
          console.log(response.data)
          getCerts(response.data)
        })
        .catch(function (error) {
          console.log(error.response.status,error.response)
        })
    }

  }

  const selectstyle = {
    display:'flex',
    flexDirection:'row',
    marginLeft:'50px',
    marginTop:'30px',
    justifyContent:'space-around'
  }

  const handleCspSelect = (val1) => {
    setcspSelected(val1)
  }

  const handleCertLevelSelect = (val2) => {
    setlevelSelected(val2)
  }

  const handleCertNameSelect = (val3) => {
    setnameSelected(val3)
  }

  return(
    <>
      <h1 style={{ fontSize:'1.8em',marginTop:'25px',marginLeft:'50px' }}>All Certificates</h1>
      <div style={{ display:'flex' }}>
        <select style={{ marginTop:'67px' }} name="sbu-select" onChange={(e) => setsbuSelected(e.target.value||null)}>
          <option className='disabled' defaultValue value=''>  select an option  </option>
          <option>SBU 1</option>
          <option>SBU 2</option>
          <option>SBU 3</option>
        </select>
        <CustomSelect selectstyle={selectstyle}
          handleCspSelect={handleCspSelect}
          handleCertLevelSelect={handleCertLevelSelect}
          handleCertNameSelect={handleCertNameSelect}
        />
      </div>
      <div className="certcontainer">
        <Certificate certs={certs} deleteCertificate={deleteCertificate}/>
      </div>
    </>
  )
}

export default AdminAllCerts