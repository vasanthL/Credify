import React from 'react'
import '../css/togglebtn.css'

const Toggle = (props) => {
  const handleClick = (target) => {
    let v //Boolean
    if(target.classList[0]==='toggle-btn')
      v=target.classList.toggle('active')
    else
      v=target.parentElement.classList.toggle('active')
    props.setVisibility(v)
  }
  return (
    <div>
      <p>{props.name}</p>
      <div className="toggle-btn" onClick={({ target }) => handleClick(target)}>
        <div className="inner-circle">
        </div>
      </div>
    </div>
  )
}

export default Toggle