import React,{ useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const UserFeedback = (props) => {

  // const[quiz,setQuiz] = useState('');
  const quiz = props.location.state.quizid
  const [rating,setrating] = useState('')
  const[message,setmessage] = useState('')
  const[fbalert,setfbalert] =useState(false)

  const history = useHistory()

  const sendfeedback = () => {

    const url = 'https://credify.tk/sendfeedback'

    const feedbacksegment = {
      quiz,
      rating:rating,
      msg:message
    }

    console.log(feedbacksegment)
    var options = {
      headers: {
        'Authorization': `TOKEN ${localStorage.getItem('token')}`
      }
    }

    axios.post(url, feedbacksegment,options)
      .then(function (response) {
        console.log(response.data)
        alert('Feedback Submitted')
        props.setShowScore(true)
        props.setShowFeedback(false)
      })
      .catch(function (err) {
        console.log('error message:', err.message)
      })
    setrating('')
    setmessage('')
    setfbalert(true)
    setTimeout(() => {
      setfbalert(false)
    }, 2000)

  }

  // const goToReport = () => {
  //   props.setShowScore(true)
  //   props.setShowFeedback(false)
  // }


  return (
    <div className="user-feedback"
      style={{
        padding: '10px',
        width: '660px',
        margin: '16px auto',
        boxShadow:'1px 3px 5px rgba(0, 0, 0, 0.3)'
      }}
    >
      <h2 className="feedback"
        style={{
          backgroundColor:'#ffde7a',
          padding:'0 16px',
          marginBottom:'10px'
        }}

      >Add a feedback on the test</h2>
      <div className="rating">
        <p>how was the test </p>
        <select className="rating"
          required
          onChange = {(e) => setrating(e.target.value)}
          value={rating}
          style={{
            width: '90%',
            borderRadius: '6px',
            padding: '6px'
          }}
        >
          <option value="very good">very good</option>
          <option value="good">good</option>
          <option value="not good">not good</option>
          <option value="bad">bad</option>
        </select>
      </div>
      <div className="message">
        <p>provide feedback </p>
        <input type="text" className="message"
          onChange={(e) => setmessage(e.target.value)}
          value={message}
          style={{
            width:'89%',
            borderRadius:'6px',
            padding:'6px',
            outline:'none',
            border:'1px solid grey',
            marginBottom:'4px'
          }}
        />
      </div>

      <button className="feedback-button"
        onClick= {() => sendfeedback()}
        style ={{
          marginLeft:'20px',
          backgroundColor:'#ffde7a',
          padding: '8px',
          color:'black',
          fontWeight:'600',
          outline:'none',
          border:0,
          borderRadius:'6px',
          marginBottom:'4px',
          marginTop:'20px'
        }}

      >Submit Feedback</button>
      <button className="feedback-button"
        onClick= {() => history.push('/dashboard')}
        style ={{
          marginLeft:'50px',
          backgroundColor:'#ffde7a',
          padding: '8px',
          color:'black',
          fontWeight:'600',
          outline:'none',
          border:0,
          borderRadius:'6px',
          marginBottom:'4px'
        }}

      >Go To Dashboard</button>
      {fbalert && <div>feedback sent</div>
      }
    </div>
  )
}

export default UserFeedback