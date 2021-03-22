import React,{ useState,useEffect } from 'react'
import { getAllUsers } from '../../utils/stats'
import { useHistory } from 'react-router-dom'
const QuizStats = () => {
  const [allUsers,setAllUsers] = useState('')
  const history = useHistory()
  useEffect(() => {
    getAllUsers(setAllUsers)
  }, [])

  const showStats = (uid) => {
    console.log(uid)
    history.push(`/quizcharts/${uid}`)
  }
  return(
    <div className='table-container quizhome-container'>
      <table style={{ overflowX:'auto' }} className='quiz-table quizhome-table'>
        <thead>
          <tr>
            <th scope='col'>User Id</th>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Stats</th>
          </tr>
        </thead>
        <tbody>
          {allUsers && allUsers.map(user => (
            <tr key={user.id}>
              <td scope='row'>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><button className='submit' onClick={() => {showStats(user.id)}}>Quiz Stats</button></td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  )

}

export default QuizStats
