import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './QuizHome.css'
import { isAdmin } from '../../utils'

const QuizHome = (props) => {

  let [category,setCategory] = useState(null)
  let [subcategory,setSubcategory] = useState(null)
  const [tests, setTests] = useState([])
  const GCPcategory = ['GCP Fundamentals','Google Cloud Associate','IAM','Compute Engine', 'App Engine','Cloud Storage', 'Cloud Monitoring','Cloud Functions']
  const AWScategory = ['General','EC2', 'Elastic Beanstack', 'Lambda Functions']
  let  scategory

  useEffect(() => {
    getQuiz(category=null,subcategory=null)
  },[])

  const getQuiz = (category,subcategory) => {
    let reqbody=null
    reqbody = category && subcategory ? { category,subcategory } : category ? { category } : null
    const url = 'https://credify.tk/getquiz'
    var options = {
      headers: {
        'Authorization': `TOKEN ${localStorage.getItem('token')}`
      }
    }
    axios
      .post(url,reqbody,options)
      .then(function (response) {
        setTests(response.data)
      })
      .catch(function (err) {
        console.log('error message', err.message)
      })
  }

  if(category==='GCP'){
    scategory = GCPcategory.map(sub => <option key={sub}>{sub}</option>)
  }
  else{
    scategory = AWScategory.map(sub => <option key={sub}>{sub}</option>)
  }

  const handleFilter = (e) => {
    e.preventDefault()
    getQuiz(category,subcategory)
  }
  console.log(tests)

  return (
    <div className="quiz-home">
      {tests.length === 0 ? (
        <>
          <form className="filter-form" onSubmit={handleFilter}>
            <select name="category" onChange={(e) => setCategory(e.target.value||null)}>
              <option className='disabled' defaultValue value=''>Select CSP</option>
              <option value="GCP">GCP</option>
              <option value="AWS">AWS</option>
            </select>
            <select name="subcategory" onChange={(e) => setSubcategory(e.target.value||null)}>
              <option className='disabled' defaultValue value=''>Select a topic</option>
              {scategory}
            </select>
            <input type="submit" className="submit filter-btn" value="Filter"/>
          </form>
          <div className="loading container">No Quizzes Yet...</div>
        </>
      ) : (
        <>
          <form className="filter-form" onSubmit={handleFilter}>
            <select name="category" onChange={(e) => setCategory(e.target.value)}>
              <option className='disabled' defaultValue value>Select CSP</option>
              <option value="GCP">GCP</option>
              <option value="AWS">AWS</option>
            </select>
            <select name="subcategory" onChange={(e) => setSubcategory(e.target.value)}>
              <option className='disabled' defaultValue value>Select a topic</option>
              {scategory}
            </select>
            <input type="submit" className="submit filter-btn" value="Filter"/>
          </form>
          <div className='table-container quizhome-container'>
            <table className='quiz-table quizhome-table'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Sub Category</th>
                  <th>Marks</th>
                  <th>Time Limit</th>
                  <th>Total Questions</th>
                  {isAdmin() ? <th>Delete Quiz</th> : <th>Start Test</th>}
                </tr>
              </thead>
              <tbody>
                {tests.map((test, i) => (
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>{test.name}</td>
                    <td>{test.category}</td>
                    <td>{test.subcategory}</td>
                    <td>{test.marks}</td>
                    <td>{test.timelimit}</td>
                    <td>{test.total_questions}</td>
                    <td>
                      {
                        isAdmin() ? <button className='submit delete-quiz' onClick={() => props.deleteQuiz(test.id)}>Delete Quiz</button> : (
                          <Link className="table-button"
                            to={{
                              pathname:`/quiz/${test.id}`,
                              timelimit:test.timelimit,
                              marks:test.marks,
                            }}
                          >
                    begin
                          </Link>
                        )
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
          </div>
        </>
      )}
    </div>
  )
}

export default QuizHome
