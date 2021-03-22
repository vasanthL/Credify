import React from 'react'
// import axios from 'axios'


const Feedbacklist = (/*props*/ { feedbacks, fbdelete }) => {

  // const blogs = props.blogs;
  // const title = props.title;



  return (
    <div className="FeedbackList">
      <h2 style={{ textAlign:'center' }}>Feedbacks from Users</h2>

      <div className='table-container'>
        <table className='quiz-table'>
          <thead>
            <tr>
              <th scope='col'>Username</th>
              <th scope='col'>Rating</th>
              <th scope='col'>User Message</th>
              <th scope='col'>Delete Feedback</th>
            </tr>
          </thead>
          <tbody>

            {
              feedbacks.map((feedback) =>
                (
                  <tr className="feedback-preview" key={feedback.id}>
                    <td scope='row'>{feedback.user.name}</td>
                    <td>{feedback.rating}</td>
                    <td>{feedback.msg}</td>
                    <td><button onClick ={() => fbdelete(feedback.id)}
                    >delete</button></td>

                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Feedbacklist