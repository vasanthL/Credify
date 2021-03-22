/* eslint-disable no-unused-vars */
import React,{ useState,useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import './SetQuestions.css'

const SetQuestions = (props) => {
  /* Quiz question set parameters */
  const quizid = props.location.state.quizid
  const total_questions = props.location.state.total_questions
  const [questionNumber, setQuestionNumber] = useState(1)
  const[text,setText]=useState('')
  const [explanation, setExplanation] = useState('')
  const[question_type,setQuestionType] = useState('')
  const [answerA, setAnswerA] = useState({ text:'',is_correct:false })
  const [answerB, setAnswerB] = useState({ text:'',is_correct:false })
  const [answerC, setAnswerC] = useState({ text:'',is_correct:false })
  const [answerD, setAnswerD] = useState({ text:'',is_correct:false })
  const [Questions,setQuestions,getQuestions] = useState([])
  const history = useHistory()


  useEffect(() => {
    console.log('Questions updated')
    if(Questions.length >= total_questions){
      handleQuestionsSubmit()
    }
  },[Questions])

  const handleQuestionsSubmit = () => {
    console.log('Finish button clicked')
    // setQuestionNumber(1);
    // clearQuestionFields();
    const reqBody={ ...convertToObject(Questions),'quizid':quizid }
    console.log(reqBody)

    const url = 'https://credify.tk/addquestions'

    axios.post(url, reqBody)
      .then(function (response){
        console.log('Add Questions Response',response)
        alert('Quiz Questions Uploaded')
        history.push('/admindash')
      })
      .catch(function(err){
        console.log('error message:',err.message)
      })
  }

  const convertToObject = (arr) => {
    console.log(arr)
    var result = {}
    for (let i = 1,j=0; j < arr.length;i++,j++) {
      result[i] = arr[j]
    }
    return result
  }

  const clearQuestionFields = () => {
    setText('')
    setExplanation('')
    setQuestionType('')
    setAnswerA({ text:'',is_correct:false })
    setAnswerB({ text:'',is_correct:false })
    setAnswerC({ text:'',is_correct:false })
    setAnswerD({ text:'',is_correct:false })
  }

  const handleNextButton = () => {
    console.log('Next button clicked')
    setQuestions(Questions.concat({ text,explanation,question_type,choices:[answerA,answerB,answerC,answerD] }))
    setQuestionNumber(questionNumber+1)
    clearQuestionFields()
  }
  const handleFinishButton = () => {
    setQuestions( Questions.concat({ text,explanation,question_type,choices:[answerA,answerB,answerC,answerD] }))
  }


  return (
    <div className="set-questions question-container container">
      <div className="question-card">
        <div className="set-question-heading">
          {/* Set Questions {questionNumber}/{totalques} */}
        </div>
        <div className="qa-block">
          <div className="ans-checks">
            <label className="qno">Q.No.{questionNumber} </label>
            <input type="text" required className="question-text enterq"
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter question"
              value={text}
            />
          </div>
          <div className="ans-checks">
            <label className="option-type">answer type:</label>
            <select
              className="qtype"
              onChange={(e) => setQuestionType(e.target.value)}
              value={question_type}
            >
              <option className='disabled' defaultValue value>  select an option  </option>
              <option value="single">Single option</option>
              <option value="multiple">multiple option</option>
            </select>
          </div>
          <div className="multiple-ans-container">
            <div className="ans-checks">
              <input type={question_type==='single'? 'radio' : 'checkbox'}
                name='selectcorrect' className="ic iscorrect-A"
                checked={answerA.is_correct}
                onChange={(e) => {setAnswerA({ ...answerA,is_correct:!answerA.is_correct })}}
              />
              <input type="text" required className="ma multiple-answer-A"
                placeholder="option A"
                onChange={(e) => setAnswerA({ ...answerA,text:e.target.value })}
                value={answerA.text} />
            </div>
            <div className="ans-checks">
              <input type={question_type==='single'? 'radio' : 'checkbox'}
                name='selectcorrect' className="ic iscorrect-B"
                checked={answerB.is_correct}
                onChange={(e) => {setAnswerB({ ...answerB,is_correct:!answerB.is_correct })}}
              />
              <input type="text" required className="ma multiple-answer-B"
                placeholder="option B"
                onChange={(e) => setAnswerB({ ...answerB,text:e.target.value })}
                value={answerB.text}
              />
            </div>
            <div className="ans-checks">
              <input type={question_type==='single'? 'radio' : 'checkbox'}
                name='selectcorrect' className="ic iscorrect-C"
                checked={answerC.is_correct}
                onChange={(e) => {setAnswerC({ ...answerC,is_correct:!answerC.is_correct })}}
              />
              <input type="text" required className="ma multiple-answer-C"
                placeholder="option C"
                onChange={(e) => setAnswerC({ ...answerC,text:e.target.value })}
                value={answerC.text} />
            </div>
            <div className="ans-checks">
              <input type={question_type==='single'? 'radio' : 'checkbox'}
                name='selectcorrect' className="ic iscorrect-D"
                checked={answerD.is_correct}
                onChange={(e) => {setAnswerD({ ...answerD,is_correct:!answerD.is_correct })}} />
              <input type="text" required className="ma multiple-answer-D"
                placeholder="option D"
                onChange={(e) => setAnswerD({ ...answerD,text:e.target.value })}
                value={answerD.text} />
            </div>
          </div>
          <input type="text" required className=" ma explanation-text"

            onChange={(e) => setExplanation(e.target.value)}
            placeholder="Enter answer explanation"
            value={explanation}
          />
          {/* <button className="next-question-set" onClick={handleNextButton}>next</button> */}
          {(questionNumber !== total_questions) && <button className="next-question-set" onClick={handleNextButton}>next</button>}
          {(questionNumber === total_questions) && <button className="finishquestionset" onClick={handleFinishButton}>finish</button>}
        </div>
      </div>
    </div>
  )}

export default SetQuestions
