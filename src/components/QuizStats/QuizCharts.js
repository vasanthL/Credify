import React,{ useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import RadarChart from './RadarChart'
import HorizontalBarChart from './HorizontalBarChart'
import { getQuizRank } from '../../utils/stats'
import JsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import './QuizCharts.css'
const QuizCharts = () => {
  const [quizStats,setQuizStats] = useState('')
  const [totalQuestions,setTotalQuestions] = useState(0)
  const [rank,setRank] = useState('')
  const { id } = useParams()
  useEffect(() => {
    getQuizRank(id,setRank)
    const url = 'https://credify.tk/adminquizstats'
    var options = {
      headers: {
        'Authorization': `TOKEN ${localStorage.getItem('token')}`
      }
    }
    axios
      .post(url,{ 'user__id':id },options)
      .then(function (response) {
        setQuizStats(response.data)
        let tq=0
        for(let val of response.data){
          tq+=val.total_questions
        }
        setTotalQuestions(tq)
      })
      .catch(function (err) {
        console.log('error message', err.message)
      })
  },[])

  const sendStats = () => {
    window.scrollTo(0, 0)
    setTimeout(() => {
      const divToPrint = document.querySelector('#quizstats')
      html2canvas(divToPrint).then(canvas => {
        const imgData = canvas.toDataURL('image/png')
        const imgWidth = 190
        const pageHeight = 290
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        let heightLeft = imgHeight
        const doc = new JsPDF('pt', 'mm')
        let position = 0
        doc.addImage(imgData, 'PNG', 10, 0, imgWidth, imgHeight + 25)
        heightLeft -= pageHeight
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight
          doc.addPage()
          doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight + 25)
          heightLeft -= pageHeight
        }
        // doc.save('download.pdf');
        var pdf = doc.output('blob')
        console.log(pdf)
        const formData = new FormData()
        formData.append('stats',pdf)
        formData.append('userid',id)
        const url = 'https://credify.tk/adminquizstatspdf'
        var options = {
          headers: {
            'Authorization': `TOKEN ${localStorage.getItem('token')}`
          }
        }
        axios
          .post(url,formData,options)
          .then(function (response) {
            console.log(response)
            alert('User Quiz Stats sent to their mail')
          })
          .catch(function (err) {
            console.log('error message', err.message)
          })
      })
    },1000)
  }
  return (
    <div>
      {quizStats ?(
        <>
          <button className='submit send-stats' onClick={sendStats}>Send Stats</button>
          <div className='quiz-stats-container' id='quizstats'>
            <div className='left'>
              <div className='card'>
                <RadarChart stats={quizStats}/>
              </div>
              <div className='card'>
                <HorizontalBarChart stats={quizStats} />
              </div>
            </div>
            <div className='right'>
              <div className='card'>
                Number of Quizzes attended <br/><h4>{quizStats.length}</h4>
              </div>
              <div className='card'>
                Number of Questions attended <br/><h4>{totalQuestions}</h4>
              </div>
              <div className='card rank'>
                Quiz Rankings Position <br/>{rank ? <h4>{rank}</h4> : <h4>NIL</h4>}
              </div>
              <div className='card title'>
                Credify Quiz
              </div>
            </div>
          </div>
        </>
      ) :
        <div className='container'>Loading Stats....</div>
      }
    </div>
  )
}

export default QuizCharts
