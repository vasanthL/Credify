import React from 'react'
import { Bar } from 'react-chartjs-2'

const LevelBarChart = (props) => {
  console.log('LevelBarCHart',props)
  return (
    <>
      <br/><br/>
      <h3>Certification level Count</h3>
      <Bar
        data={{
          labels:props.levelNames,
          datasets:[
            {
              label:'Certification Level Count',
              data:props.levelTotal,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
              ],
              borderWidth: 1
            }
          ]
        }}
        width={60}
        height={20}
        options={{
          responsive:true,
          // maintainAspectRatio:false,
          scales:{
            yAxes:[{
              ticks:{
                beginAtZero:true,
                stepSize:1
              }
            }]
          }
        }}
      />
    </>
  )
}

export default LevelBarChart