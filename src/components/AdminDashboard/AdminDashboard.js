import React,{ useState,useEffect } from 'react'
import PieChart from './PieChart'
import LevelBarChart from './LevelBarChart'
import NameBarChart from './NameBarChart'
import {
  getStats,
  gcpLevelNames,
  awsLevelNames,
  azureLevelNames,
  gcpCertNames,
  awsCertNames,
  azureCertNames
} from '../../utils/stats'
import './AdminDashboard.css'
import { useHistory } from 'react-router-dom'

const AdminDashboard = () => {
  const [usersList,setUsersList] = useState([])
  const [usersTotal,setUsersTotal] =useState('')
  const [certsTotal,setCertsTotal] =useState('')
  const [cspTotal,setCspTotal] = useState([])
  const [CSP,setCSP] = useState('')
  const [SBU,setSBU] = useState('')
  const [gcpLevelTotal,setGcpLevelTotal] = useState([])
  const [awsLevelTotal,setAwsLevelTotal] = useState([])
  const [azureLevelTotal,setAzureLevelTotal] = useState([])
  const [GCPCertNamesTotal,setGCPCertNamesTotal] = useState([])
  const [AWSCertNamesTotal,setAWSCertNamesTotal] = useState([])
  const [AzureCertNamesTotal,setAzureCertNamesTotal] = useState([])

  const history = useHistory()


  useEffect(() => {
    getStats(
      SBU,
      setUsersList,
      setUsersTotal,
      setCertsTotal,
      setCspTotal,
      setGcpLevelTotal,
      setAwsLevelTotal,
      setAzureLevelTotal,
      setGCPCertNamesTotal,
      setAWSCertNamesTotal,
      setAzureCertNamesTotal
    )
  },[CSP,SBU])

  const onChangeCsp = (e) => {
    setCSP(e.target.value)
  }

  const handleTotalCertsClick = () => {
    history.push({
      pathname: '/adminallcerts',
      sbu: SBU,
      fromdashboard: true
    })
  }

  const handleTotalUsersClick = () => {
    history.push({
      pathname: '/users',
      state: { usersList }
    })
  }


  return (
    <>
      {/* <h1 style={{fontSize:'1.5em',marginTop:'10px',marginLeft:'20px'}}>Admin Dashboard</h1> */}
      <div className="top-section">
        <div className='inputCsp card' onChange={onChangeCsp}>
          <input type="radio" value="GCP" name="csp" id='gcp'/>
          <label htmlFor="gcp">GCP</label>
          <input type="radio" value="AWS" name="csp" id='aws' />
          <label htmlFor="aws">AWS</label>
          <input type="radio" value="Azure" name="csp" id='azure' />
          <label htmlFor="azure">Azure</label>
          <select onChange={(e) => setSBU(e.target.value)}
            name="SBU" required className="sbu-select">
            <option className='disabled' defaultValue value=''>  SBU  </option>
            <option value='SBU 1'>SBU 1</option>
            <option value='SBU 2'>SBU 2</option>
            <option value='SBU 3'>SBU 3</option>
          </select>
        </div>
        <div className="card dash-card">
          <PieChart cspTotal={cspTotal} SBU={SBU} style={{ display:'block' }} />
        </div>
        <div className='total-section'>
          <div className="card total-card" onClick={handleTotalUsersClick}>Total Number of Users <br/> {usersTotal}</div>
          <div className="card total-card" onClick={handleTotalCertsClick}>Total Number of Certificates <br/>  {certsTotal}</div>
        </div>
      </div>
      <div className='bottom-section'>
        {
          CSP==='GCP'
            ? (<div className="card dash-card">
              <LevelBarChart SBU={SBU} levelTotal={gcpLevelTotal} levelNames={gcpLevelNames} />
            </div>)
            : CSP==='AWS'
              ? (<div className="card dash-card">
                <LevelBarChart SBU={SBU} levelTotal={awsLevelTotal} levelNames={awsLevelNames} />
              </div>)
              : CSP==='Azure'
                ? (<div className="card dash-card">
                  <LevelBarChart SBU={SBU} levelTotal={azureLevelTotal} levelNames={azureLevelNames} />
                </div>)
                :''
        }
        {
          CSP==='GCP'
            ? (<div className="card dash-card"><NameBarChart SBU={SBU} certNamesTotal={GCPCertNamesTotal} certNames={gcpCertNames} /></div>)
            : CSP==='AWS'
              ? (<div className="card dash-card"><NameBarChart SBU={SBU} certNamesTotal={AWSCertNamesTotal} certNames={awsCertNames} /></div>)
              : CSP==='Azure'
                ? (<div className="card dash-card"><NameBarChart SBU={SBU} certNamesTotal={AzureCertNamesTotal} certNames={azureCertNames} /></div>)
                :''
        }
      </div>
    </>
  )
}

export default AdminDashboard