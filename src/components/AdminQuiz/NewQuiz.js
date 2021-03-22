import React,{ useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'

import './NewQuiz.css'

const NewQuiz = () => {
  const history = useHistory()
  const [quizDetails,setQuizDetails] = useState(
    {
      name:'',
      category:'',
      subcategory: '',
      description: '',
      timelimit: 0,
      marks: 0,
      total_questions: 0,
    }
  )

  /*GCP and AWS category */
  const GCPcategory = ['GCP Fundamentals','Google Cloud Associate','IAM','Compute Engine', 'App Engine','Cloud Storage', 'Cloud Monitoring','Cloud Functions']
  const AWScategory = ['General','EC2', 'Elastic Beanstack', 'Lambda Functions']

  const handleQuizSubmit = (e) => {
    e.preventDefault()
    console.log('Quiz Details',quizDetails)
    const url = 'https://credify.tk/addquiz'

    axios.post(url, quizDetails)
      .then(function (response) {
        console.log(response)
        history.push({
          pathname:'/quizaddnewquests',
          state: { quizid:response.data.id,total_questions:response.data.total_questions }
        })
      })
      .catch(function (err) {
        console.log('error message', err.message)
      })


  }

  return (
    <div>
      <form action="" className="set-quiz-form newquiz-container">
        <h1 className="h1addquiz">Add a quiz</h1><br></br>
        <div className="quiz-form-field">
          <label className="form-label Name">Name</label>
          <input type="text" className="form-inputs Name"
            value={quizDetails.name}
            onChange={(e) => setQuizDetails({ ...quizDetails,name:e.target.value })}
            required
          />
        </div>
        <div className="quiz-form-field">
          <label className="form-label Category">Category</label><br></br>
          <select className="form-inputs Category"
            value={quizDetails.category}
            onChange={(e) => setQuizDetails({ ...quizDetails,category:e.target.value })}
            required
          >
            <option className='disabled' defaultValue value>  select an option  </option>
            <option value="GCP" >GCP</option>
            <option value="AWS">AWS</option>
          </select>
        </div>
        <div className="quiz-form-field">
          <label className="form-label Sub-Category">Sub-Category</label><br></br>
          <select className="form-inputs Sub-Category"
            onChange={(e) => setQuizDetails({ ...quizDetails,subcategory:e.target.value })}
            required
          >
            <option className='disabled' defaultValue value>  select an option  </option>
            { quizDetails.category === 'GCP' ? (GCPcategory.map((categ,i) => (<option key={i} value={categ}>{categ}</option>)))
              : (AWScategory.map((categ,i) => (<option key={i} value={categ}>{categ}</option>)))
            }
          </select>
        </div>
        <div className="quiz-form-field">
          <label className="form-label">Description</label><br></br>
          <textarea className="form-inputs Description"
            onChange={(e) => setQuizDetails({ ...quizDetails,description:e.target.value })}
            required
          ></textarea>
        </div>
        <div className="quiz-form-field">
          <label className="form-label Time-Limit"
            data-testid="TimeLimit">Time Limit</label>
          <input  type='number'
            step='0.01'className="form-inputs Time-Limit"  min="1" max="50"
            onChange={(e) => setQuizDetails({ ...quizDetails,timelimit:Number(e.target.value) })}
            required
          />
        </div>
        <div className="quiz-form-field">
          <label className="form-label Marks">Per Question Marks</label>
          <input  type='number'
            step='0.01' className="form-inputs Marks"  min="1" max="50"
            onChange={(e) => setQuizDetails({ ...quizDetails,marks:Number(e.target.value) })}
            required
          />
        </div>
        <div className="quiz-form-field">
          <label className="form-label Total-Ques">Total Questions</label>
          <input
            type='number'
            step='0.01' id="quantity" name="quantity"  min="1" max="50"
            className="form-inputs Total-Ques"
            data-testid="TotalQues"
            onChange={(e) => setQuizDetails({ ...quizDetails,total_questions:Number(e.target.value) })}
          />
        </div><br></br>
        <div className="quiz-form-field">
          <button className="form-submit-button" 
            data-testid="Submit"
          onClick={handleQuizSubmit}>Create</button>
        </div>
      </form>
    </div>
  )
}

export default NewQuiz
