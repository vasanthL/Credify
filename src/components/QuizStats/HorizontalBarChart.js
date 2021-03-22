import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'

const HorizontalBarChart = (props) => {
  let answersRatio = [0,0]
  for(let uqstat of props.stats){
    answersRatio[0]+=uqstat.rightans_no
    answersRatio[1]+=uqstat.wrongans_no
  }
  return (
    <>
      <br/>
      <h3>Answers Ratio</h3>
      <HorizontalBar
        data={{
          labels:['Correct','Wrong'],
          datasets:[
            {
              label:'Overall Correct/Wrong Answers ',
              data:answersRatio,
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
        width={100}
        height={40}
        options={{
          responsive:true,
          // maintainAspectRatio:false,
          scales:{
            xAxes:[{
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

export default HorizontalBarChart