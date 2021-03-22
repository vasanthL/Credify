import React from 'react'
import { useHistory } from 'react-router-dom'
import { readExcelFile } from '../../utils/readExcel'
import './AddNewQuestions.css'

const AddNewQuestions = (props) => {

  const history = useHistory()

  const { quizid,total_questions } = props.location.state
  console.log(quizid,total_questions)

  const handleManualQuestInput = () => {
    history.push({
      pathname:'/quizsetnewquests',
      state: { quizid,total_questions }
    })
  }

  const handleUploadFile = (e) => {
    // setIsClicked(true)
    readExcelFile(quizid,e)
    history.push('/quizsetquiz')
    // setTimeout(() => {
    //   setIsLoading(false)
    // }, 2000);
  }

  return (
    <div className='container'>
      <h1 style={{ marginBottom:'100px' }}>Upload Questions</h1>
      <div className='file-input'>
        <input type="file" accept=".xls,.xlsx" id='excelfile' onChange={handleUploadFile} className='file'/>
        <label htmlFor="excelfile">Upload Excel file
          <img src='https://download.logo.wine/logo/Microsoft_Excel/Microsoft_Excel-Logo.wine.png'  id='excel'/>
        </label>
      </div>
      <h3>OR</h3>
      <button onClick={handleManualQuestInput} type='submit' className="form-submit-button">Add Questions Manually</button>
      {/* {
        (isClicked && isLoading) ? <h5>Loading!!!</h5> : isClicked ?  (
          <>
          <h5>Uploaded</h5>
          <Link to='/quizsetquiz'>Go back to Quiz Dashboard</Link>
          </>
        ) : ''
      } */}
    </div>
  )
}

export default AddNewQuestions
