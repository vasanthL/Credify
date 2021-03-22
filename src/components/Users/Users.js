import React,{ useState,useEffect } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
// import Popup from '../Popup/Popup'

import './users.css'
import userImg from '../../img/user.jpg'
import { deleteUser } from '../../utils/delete'
import { getAllUsers } from '../../utils/stats'

const Users = (props) => {
  let [allUsers,setAllUsers] = useState('')
  // let [trigger,setTrigger] = useState(false)
  // let [userid,setUserid] = useState('')
  console.log(props)

  const userids = props.location.state ? props.location.state.usersList : null
  let history=useHistory()

  useEffect(() => {
    const url='https://credify.tk/allusers'
    var options = {
      headers: {
        'Authorization': `TOKEN ${localStorage.getItem('token')}`
      }
    }
    if(userids){
      axios.post(url,{ userids },options)
        .then(response => {
          console.log(response)
          setAllUsers(response.data)
        })
        .catch(function (error) {
          console.log(error.response.status,error.response)
        })
    }
    else{
      getAllUsers(setAllUsers)
    }
  },[])

  // const handleContactClick = (userid) => {
  //   // setTrigger(true);
  //   setUserid(userid);
  // }

  const handleProfileClick = (userid) => {
    history.push(`/usercerts/${userid}`)
  }
  return(
    <>
      <h1 style={{ marginLeft:'60px',marginTop:'30px' }}>Users</h1>
      {/* <Popup trigger={trigger} setTrigger={setTrigger} userid={userid} setUserid={setUserid} /> */}
      <div className="ucontainer">
        { allUsers.length>0  ?
          (
            allUsers.map(user =>
              <div key={user.id} className="ucard">
                <div className="card__body">
                  <div className="card__img">
                    <img src={userImg} alt=""/>
                  </div>
                  <span className="card__name">{user.name}</span>
                  <span className="card__empid">{user.empid}</span>
                  <span className="card__email">{user.email}</span>
                  <div className="card__footer">
                    <a onClick={() => handleProfileClick(user.id)} title="" className="card__btn cbtn btn-primary">Certificates</a>
                    <a onClick={() => deleteUser(user.id)} className="card__btn cbtn contactbtn">Delete</a>
                  </div>
                </div>
              </div>)
          )
          : [...Array(4)].map((e, i) =>
            <div className="ucard" key={i}>
              <div className="card__body">
                <div className="card__img skeleton">
                  <img src="" alt="" />
                </div>
                <span className="card__name skeleton">Place Holder</span>
                <span className="card__empid skeleton">1234567</span>
                <span className="card__email skeleton">placeholder@company.com</span>
                <div className="card__footer skeleton">
                  <a href="#" title="" className="card__btn cbtn btn-primary">Certificates</a>
                  <a href="#" title="" className="card__btn cbtn">Contact</a>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}

export default Users