import React from 'react'
import { Doughnut } from 'react-chartjs-2'

const HistoryDoughnut = ({ correct,wrong }) => {
  return (
    <>
      <br/>
      <Doughnut
        data={{
          labels: ['Correct','Wrong'],
          datasets: [{
            label:'CSP',
            data: [correct,wrong],
            backgroundColor: [
              'rgb(34,139,34,0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgb(128,128,128,0.2)'
            ],
            borderColor: [
              'rgb(34,139,34, 1)',
              'rgba(255, 99, 132, 1)',
              'rgb(128,128,128,1)'
            ],
            borderWidth: 1
          }]
        }}
        width={100}
        height={50}
        options={{
        // responsive: true,
        // maintainAspectRatio:true,
          legend:{
            position:'bottom',
            labels:{
              fontSize:14
            }
          },
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



export default HistoryDoughnut