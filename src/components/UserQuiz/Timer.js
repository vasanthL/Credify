import React,{ useState,useEffect } from 'react'
const Timer = ({ seconds,finishQuiz,setShowScore }) => {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(seconds)

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId)
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft])

  function secondsToMs(d) {
    d = Number(d)
    var h = Math.floor(d / 3600)
    var m = Math.floor((d % 3600) / 60)
    var s = Math.floor((d % 3600) % 60)
    let minutes
    let seconds
    let hours
    var hDisplay = h > 0 ? h : '00'
    var mDisplay = m > 0 ? m : '00'
    var sDisplay = s > 0 ? s : '00'
    hDisplay.toString().length === 1 ? hours=`0${hDisplay}` : hours=hDisplay
    mDisplay.toString().length === 1 ? minutes=`0${mDisplay}` : minutes=mDisplay
    sDisplay.toString().length === 1 ? seconds=`0${sDisplay}` : seconds=sDisplay
    if(hDisplay==='00' && mDisplay==='00' && sDisplay==='00'){
      alert('Your Time has ended')
      finishQuiz()
      setShowScore(true)
    }
    if(hours){
      return `${hours} : ${minutes} : ${seconds}`
    }
    else{
      return `${minutes} : ${seconds}`
    }
  }
  return (
    <div>
      <h5>{secondsToMs(timeLeft)}</h5>
    </div>
  )
}
export default Timer
