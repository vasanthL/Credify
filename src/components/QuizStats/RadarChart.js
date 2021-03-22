/* eslint-disable no-prototype-builtins */
import React,{ useState } from 'react'
import { Radar } from 'react-chartjs-2'

const RadarChart = (props) => {
  const [csp,setCSP] = useState('gcp')
  const GCPcategory = ['GCP Fundamentals','Google Cloud Associate','IAM','Compute Engine', 'App Engine','Cloud Storage', 'Cloud Monitoring','Cloud Functions']
  const AWScategory = ['General','EC2', 'Elastic Beanstack', 'Lambda Functions']
  let gcpCategoryData = [0,0,0,0,0,0,0,0]
  let awsCategoryData = [0,0,0,0,0,0,0]
  console.log(props.stats)
  const gcpStats =  {}
  const awsStats= {}
  props.stats.forEach((uqstat) => {
    if(uqstat.quiz.category==='GCP'){
      gcpStats[uqstat.quiz.subcategory] = Math.floor((uqstat.score/uqstat.total_marks)*100)
    }else{
      awsStats[uqstat.quiz.subcategory] = Math.floor((uqstat.score/uqstat.total_marks)*100)
    }
  })
  GCPcategory.forEach((val,i) => {
    if(gcpStats.hasOwnProperty(val)){
      gcpCategoryData[i]=gcpStats[val]
    }
  })
  AWScategory.forEach((val,i) => {
    if(awsStats.hasOwnProperty(val)){
      awsCategoryData[i]=awsStats[val]
    }
  })
  console.log(gcpCategoryData,awsCategoryData)

  const gcpChartData = [{
    label:'GCP',
    data: gcpCategoryData,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
    ],
    borderWidth: 1
  }]

  const awsChartData = [{
    label:'AWS',
    data: awsCategoryData,
    backgroundColor: [
      'rgba(54, 162, 235, 0.2)',
    ],
    borderColor: [
      'rgba(54, 162, 235, 1)',
    ],
    borderWidth: 1
  }]

  return (
    <>
      <h4 style={{ marginTop:'10px' }}>Score Chart</h4>
      <div className='radio-btn' onChange={(e) => setCSP(e.target.value)}>
        <input type="radio" name="cspSelect" id="gcp" value='gcp' checked={csp==='gcp'?'checked':''}/>
        <label htmlFor="gcp">GCP</label>
        <input type="radio" name="cspSelect" id="aws-radar" value='aws' checked={csp==='aws'?'checked':''}/>
        <label htmlFor="aws">AWS</label>
      </div>
      <Radar
        data={{
          labels: csp==='aws' ? AWScategory : GCPcategory,
          datasets: csp==='aws' ? awsChartData : gcpChartData
        }
        }
        width={100}
        height={70}
        options={{
        // responsive: true,
        // maintainAspectRatio:false,
          scale:{
            ticks:{
              beginAtZero:true,
              min:0,
              max:100
            }
          }
        }}
      />
      {/* <br></br> */}
    </>
  )
}

export default RadarChart