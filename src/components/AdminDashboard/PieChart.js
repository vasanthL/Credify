import React from 'react'
import { Pie } from 'react-chartjs-2'

const PieChart = (props) => {
  return (
    <>
      <h3>Analysis</h3>
      <Pie
        data={{
          labels: ['GCP','AWS','Azure'],
          datasets: [{
            label:'CSP',
            data: props.cspTotal,
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
          }]
        }}
        width={100}
        height={25}
        options={{
        // responsive: true,
        // maintainAspectRatio:false,
          scales:{
            xAxes: [{
              gridLines: { display: false },
              ticks:{ display: false }
            }],
            yAxes: [{
              gridLines: { display: false },
              ticks:{ display: false }
            }]
          }
        }}
      />
      {/* <br></br> */}
    </>
  )
}

export default PieChart