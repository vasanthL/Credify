import React,{ useState,useEffect } from 'react'
import axios from 'axios'
import './QuizRankings.css'
const QuizRankings = () => {
  const [rankings,setRankings] = useState([])
  useEffect(() => {
    getRankings()
  },[rankings])
  const getRankings = () => {
    const url = 'https://credify.tk/rankings'
    var options = {
      headers: {
        'Authorization': `TOKEN ${localStorage.getItem('token')}`
      }
    }
    axios.get(url,options)
      .then(response => {
        setRankings(response.data)
      }).catch(error => {
        console.log(error)
      })
  }
  return (
    <>
      <h1 style={{ textAlign:'center' }}>Quiz Ranking</h1>
      <div className='table-container'>
        <table className='quiz-table'>
          <thead>
            <tr>
              <th scope='col'>Position</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Score</th>
            </tr>
          </thead>
          <tbody>
            {
              rankings.map((rank,i) => (
                <tr key={rank.email}>
                  <th scope='row'>{i+1}</th>
                  <td>{rank.name}</td>
                  <td>{rank.email}</td>
                  <td>{rank.total}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default QuizRankings
