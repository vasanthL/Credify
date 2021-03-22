import React from 'react'
import DoughnutChart from './DoughnutChart'
import './GetQuizReport.css'

const GetQuizReport = (props) => {
  const questions = props.questions
  const wrongSelected = props.wrongSelected

  console.log('total_marks:', props.total_marks)
  console.log('score:', props.score)
  return (
    <div>
      <div className="card result-card">
        <div className='doughnut-card'>
          <DoughnutChart correct={props.correct} wrong={props.wrong} />
        </div>
        <div className='result-content'>
          <h1>You Scored {Math.floor((props.score/props.total_marks)*100)}% ({props.score}/{props.total_marks})</h1>
          <h2 style={{ color:'rgb(34,139,34, 1)' }}>Correct Answers: {props.correct} </h2>
          <h2 style={{ color:'rgba(255, 99, 132, 1)' }}>Wrong Answers: {props.wrong}</h2>
        </div>
      </div>
      <h2 style={{ marginTop:'40px',fontWeight:'bolder' }}>Results</h2>
      {
        questions.map((question,i) => {
          const wrongArray =  [false,false,false,false]
          if(wrongSelected[i]){
            if(wrongSelected[i].length===1){
              wrongArray[wrongSelected[i][0]]=true
            }
            else if(wrongSelected[i].length===2){
              wrongArray[wrongSelected[i][0]]=true
              wrongArray[wrongSelected[i][1]]=true
            }
          }
          return(
            <div style={{ marginTop:'30px' }} key={i}>
              <h4 style={{ fontWeight:'bold',fontSize:'2em' }}>Question {i+1}</h4>
              <h4 style={{ fontWeight:'bold',fontSize:'1.7em',marginTop:'40px' }}>{question.text}</h4><br/>
              <h6 className={(question.choices[0].is_correct ? 'correct-answer' : '')}
                style={
                  { backgroundColor:wrongArray[0]?'red':'white',
                    color: wrongArray[0]?'white':'black',
                    fontSize:'1.4em',borderRadius:'5px',padding:'5px' }
                }>a. {question.choices[0].text}</h6><br/>
              <h6 className={(question.choices[1].is_correct ? 'correct-answer' : '')}
                style={
                  { backgroundColor:wrongArray[1]?'red':'white',
                    color: wrongArray[1]?'white':'black',
                    fontSize:'1.4em',borderRadius:'5px',padding:'5px' }
                }>b. {question.choices[1].text}</h6><br/>
              <h6 className={(question.choices[2].is_correct ? 'correct-answer' : '')}
                style={
                  { backgroundColor:wrongArray[2]?'red':'white',
                    color: wrongArray[2]?'white':'black',
                    fontSize:'1.4em',borderRadius:'5px',padding:'5px' }
                }>c. {question.choices[2].text}</h6><br/>
              <h6 className={(question.choices[3].is_correct ? 'correct-answer' : '')}
                style={
                  { backgroundColor:wrongArray[3]?'red':'white',
                    color: wrongArray[3]?'white':'black',
                    fontSize:'1.4em',borderRadius:'5px',padding:'5px' }
                }>d. {question.choices[3].text}</h6><br/>
              <h4 style={{ fontWeight:'bold',fontSize:'1.7em' }}>Explanation</h4><br/>
              <p style={{ fontStyle:'italic',fontSize:'1.4em' }}>{question.explanation}</p><br/>
            </div>
          )
        })
      }
    </div>
  )
}

export default GetQuizReport
