import React,{ useState,useEffect } from 'react'
import axios from 'axios'
import { FaEye } from 'react-icons/fa'

import './QuizHistory.css'
import HistoryDoughnut from './HistoryDoughnut'

const QuizHistory = () => {
  const [quizHistory,setQuizHistory] = useState([])
  useEffect(() => {
    getquizHistory()
  },[])
  const getquizHistory = () => {
    const url = 'https://credify.tk/quizresults'
    var options = {
      headers: {
        'Authorization': `TOKEN ${localStorage.getItem('token')}`
      }
    }
    axios.get(url,options)
      .then(response => {
        setQuizHistory(response.data)
      }).catch(error => {
        console.log(error)
      })
  }
  return (
    <div>
      <h1 style={{ marginTop:'30px',marginLeft:'40px' }}>Quiz History</h1>
      <div className='row-container'>
        {quizHistory.map(history => (
          <div key={history.quiz.name} className='card history-card'>
            <HistoryDoughnut correct={history.rightans_no} wrong={history.wrongans_no} />
            <h2>{Math.floor((history.score/(history.quiz.marks*history.quiz.total_questions))*100)}%</h2>
            <h6>Name:&ensp;{history.quiz.name}</h6>
            <h6>Category:&ensp;{history.quiz.category}</h6>
            <h6>Sub-Category:&ensp;{history.quiz.subcategory}</h6>
            <h6>Marks: &ensp; {history.score} / {history.quiz.marks*history.quiz.total_questions}</h6>
            <h6 style={{ color:'#61B329' }}>Correct:&ensp;{history.rightans_no}</h6>
            <h6 style={{ color:'#FF6347' }}>Wrong:&ensp;{history.wrongans_no}</h6>
            {history.report_url &&
            <div className='view-report'>
              <a href={history.report_url}  target="_blank" rel="noreferrer">Quiz Report </a>
              <FaEye/>
            </div> }
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuizHistory
