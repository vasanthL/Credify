import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Timer from './Timer'
import './Quiz.css'
import GetQuizReport from './GetQuizReport'
import JsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { Link } from 'react-router-dom'


export default function Quiz(props) {
  const { id } = useParams()
  console.log(props.location.timelimit,props.location.marks,id)
  const marksPerQuestion = props.location.marks
  const timelimit = props.location.timelimit
  const [cq, setcq] = useState(0)
  const [userClickedOptions,setUserClickedOptions] = useState([false,false,false,false])
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)
  const [startQuiz, setStartQuiz] = useState(true)
  const [correct,setCorrect]=useState(0)
  const [wrong,setWrong]=useState(0)
  const [wrongSelected,setWrongSelected] = useState([])
  const [prevClicked,setprevClicked] = useState('')
  const [pdfId,setPdfId] = useState('')
  // const [showFeedback, setShowFeedback] = useState(false);


  const url = 'https://credify.tk/getquestions'

  //console.log(id);
  const [questions, setQuestions] = useState([])


  useEffect(() => {
    axios.post(url, {
      'quizid': id
    })
      .then(function (response) {
        console.log(response.status)
        console.log((response.data))
        setQuestions(response.data)
      })
      .catch(function (err) {
        console.log('error message', err.message)
      })
  }, [startQuiz]

  )

  const handleAdd = (arr) => {
    const newarr = [...wrongSelected]
    newarr.push(arr)
    setWrongSelected(newarr)
  }

  function arraysEqual(a, b) {
    if (a === b) return true
    if (a === null || b === null) return false
    if (a.length !== b.length) return false

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false
    }
    return true
  }
  const handleNextQuestion = (isCorrect,cq) => {
    console.log(isCorrect,userClickedOptions)
    setprevClicked('')
    if(arraysEqual(isCorrect,userClickedOptions)){
      setScore(score+marksPerQuestion)
      setCorrect(correct+1)
      handleAdd(null)
    }else{
      setWrong(wrong+1)
      let wrongArray=[]
      for (const [index, value] of userClickedOptions.entries()) {
        if(value===true){
          wrongArray.push(index)
        }
      }
      handleAdd(wrongArray)
    }
    setcq(cq + 1)
    setUserClickedOptions([false,false,false,false])
    console.log('correct:',correct)
    console.log('wrong:', wrong)
    const nextQuestion = cq + 1
    const prevQuestion = cq - 1
    if(prevQuestion < 0){
      setcq(0)
    }
    if (nextQuestion < questions.length) {
      setcq(nextQuestion)
    }
    else {
      finishQuiz()
      setShowScore(true)
      // setShowFeedback(true);
    }
  }

  const finishQuiz = () => {
    const url = 'https://credify.tk/quizresults'
    var options = {
      headers: {
        'Authorization': `TOKEN ${localStorage.getItem('token')}`
      }
    }
    const reqbody = {
      quiz: id,
      rightans_no:correct,
      wrongans_no:wrong,
      score
    }
    axios.post(url,reqbody,options)
      .then(response => {
        console.log(response)
        setPdfId(response.data.id)
      }).catch(error => {
        console.log(error)
      })
  }

  const handleOptionClick = (i,qtype) => {
    const newUserClicked = [...userClickedOptions]
    if(qtype==='single'){
      if(prevClicked===''){
        setprevClicked(i)
        newUserClicked[i]=!userClickedOptions[i]
        setUserClickedOptions(newUserClicked)
      }
      else if(prevClicked!==i){
        newUserClicked[prevClicked]=false
        newUserClicked[i]=true
        setprevClicked(i)
        setUserClickedOptions(newUserClicked)
      }
    }
    else{
      newUserClicked[i]=!userClickedOptions[i]
      setUserClickedOptions(newUserClicked)
    }
  }

  const exportPDF = () => {
    window.scrollTo(0, 0)
    setTimeout(() => {
      // setTimeout(() => {
      //     setLoader(true);
      // }, 100);
      const divToPrint = document.querySelector('#report')
      html2canvas(divToPrint).then(canvas => {
        const imgData = canvas.toDataURL('image/png')
        const imgWidth = 190
        const pageHeight = 290
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        let heightLeft = imgHeight
        const doc = new JsPDF('pt', 'mm','a4',true)
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
        formData.append('report', pdf)
        formData.append('quiztakerid', pdfId)
        const url = 'https://credify.tk/quizresultspdf'
        var options = {
          headers: {
            'Authorization': `TOKEN ${localStorage.getItem('token')}`
          }
        }
        axios.post(url,formData,options)
          .then(response => {
            console.log(response)
            alert('PDF Report Sent to your Email')
          })
          .catch(error => {
            console.log(error)
          })
      })
    }, 1000)
  }

  return (
    <div className="app">
      {startQuiz ? (
        <div className="instruction-section quiz-container">
          <h2  style={{ fontSize:'2em' }}>Quiz Instructions</h2>
          <p style={{ fontSize:'1.2em',textAlign:'center' }} className="instructions">
              1. Answer all the questions <br/> 2. Make sure to submit your
              feedback after submission
          </p>
          <button onClick={() => setStartQuiz(false)} className='submit'>Begin Test</button>
        </div>
      ) : showScore ? (
        <>
          <button style={{ marginLeft:'65px',marginTop:'40px',fontSize:'1.2em' }} onClick={exportPDF} className='submit'>Send Report</button>
          <Link style={{ textDecoration:'none' }} to='/dashboard'>
            <button style={{ marginLeft:'65px',marginTop:'40px',fontSize:'1.2em' }} className='submit'>Go to Dashboard</button>
          </Link>
          <Link style={{ textDecoration:'none' }} to={{
            pathname: '/userquizfeedback',state: { quizid: id } }}>
            <button style={{ marginLeft:'65px',marginTop:'40px',fontSize:'1.2em' }} className='submit'>Quiz Feedback</button>
          </Link>
          <div className="score-section report-container" id='report'>
            {/* <span style={{fontSize:'30px',fontWeight:'bolder'}}>You scored {score} out of {questions.length * marksPerQuestion} </span> <br/>
                   <span style={{fontSize:'25px',fontWeight:'bold',color:'green'}}> Correct Answers : {correct} </span><br/>
                   <span style={{fontSize:'25px',fontWeight:'bolder',color:'red'}}> Wrong Answers: {wrong} </span> */}
            <GetQuizReport
              score={score}
              total_marks={questions.length * marksPerQuestion}
              total_questions={questions.length}
              correct={correct}
              wrong={wrong}
              questions={questions}
              wrongSelected={wrongSelected} />
          </div>
        </>
      ) : questions.length <= 0 ? (
        <div className="loading">
                loading questions...
          {questions.length}
        </div>


      ) : (
        <>
          <div className="question-section quiz-container">
            <Timer seconds={timelimit * 60}
              finishQuiz={finishQuiz}
              setShowScore={setShowScore}
              totalQuestions={questions.length}
              correct={correct}
              wrong={wrong} />
            <div className="question-count">
              <span>Question {cq + 1}</span>/{questions.length}
            </div>
            <div className="question-text" style={{ fontSize:'1.2em',fontWeight:'bold',margin:'20px 80px' }}>
              {questions[cq].text}
            </div>
            <div className="answer-section">
              <div className='answer-options' style={{ margin:'20px 80px' }}>
                <input type={questions[cq].question_type==='single'?'radio':'checkbox'}
                  name="answer-options" checked={userClickedOptions[0] ? 'checked' : ''}
                  onChange={() => {handleOptionClick(0,questions[cq].question_type)}}

                />
                <p style={{ fontSize:'1.2em',cursor:'pointer' }}
                  onClick={() => {handleOptionClick(0,questions[cq].question_type)}}

                >{questions[cq].choices[0].text}</p>
              </div>
              <div className='answer-options' style={{ margin:'10px 80px' }}>
                <input type={questions[cq].question_type==='single'?'radio':'checkbox'}
                  name="answer-options" checked={userClickedOptions[1] ? 'checked' : ''}
                  onChange={() => {handleOptionClick(1,questions[cq].question_type)}}

                />
                <p style={{ fontSize:'1.2em',cursor:'pointer' }}
                  onClick={() => {handleOptionClick(1,questions[cq].question_type)}}

                >{questions[cq].choices[1].text}</p>
              </div>
              <div className='answer-options' style={{ margin:'20px 80px' }}>
                <input type={questions[cq].question_type==='single'?'radio':'checkbox'}
                  name="answer-options" checked={userClickedOptions[2] ? 'checked' : ''}
                  onChange={() => {handleOptionClick(2,questions[cq].question_type)}}

                />
                <p style={{ fontSize:'1.2em',cursor:'pointer' }}
                  onClick={() => {handleOptionClick(2,questions[cq].question_type)}}

                >{questions[cq].choices[2].text}</p>
              </div>
              <div className='answer-options' style={{ margin:'20px 80px' }}>
                <input type={questions[cq].question_type==='single'?'radio':'checkbox'}
                  name="answer-options" checked={userClickedOptions[3] ? 'checked' : ''}
                  onChange={() => {handleOptionClick(3,questions[cq].question_type)}}

                />
                <p style={{ fontSize:'1.2em',cursor:'pointer' }}
                  onClick={() => {handleOptionClick(3,questions[cq].question_type)}}

                >{questions[cq].choices[3].text}</p>
              </div>
            </div>
            <button
              onClick={() => {handleNextQuestion([
                questions[cq].choices[0].is_correct,
                questions[cq].choices[1].is_correct,
                questions[cq].choices[2].is_correct,
                questions[cq].choices[3].is_correct
              ],cq)}}
              className='submit'
              style={{ padding:'8px 14px',fontSize:'1em' }}>{cq+1 < questions.length ? 'Next' : 'Finish' }</button>
          </div>
        </>
      )}
    </div>
  )
}