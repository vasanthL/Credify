import * as XLSX from 'xlsx'

import axios from 'axios'

const convertToObject = (arr) => {
  var result = {}
  for (let i = 0; i < arr.length; i++) {
    result[i+1] = arr[i]
  }
  return result
}

function stringEscape(s) {
  return s ? s.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/\t/g,'\\t').replace(/\v/g,'\\v').replace(/'/g,'\\\'').replace(/"/g,'\\"').replace(/[\x80-\x9F]/g,hex) : s
  function hex(c) { var v = '0'+c.charCodeAt(0).toString(16); return '\\x'+v.substr(v.length-2) }
}



export const readExcelFile = (quizid,event) => {
  console.log(event)
  console.log(event.target.files[0])
  const file =  event.target.files[0]
  const promise = new Promise((resolve,reject) => {
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file)

    fileReader.onload = (e) => {
      const bufferArray = e.target.result

      const workbook = XLSX.read(bufferArray,{ type:'buffer' })
      const worksheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[worksheetName]
      const data = XLSX.utils.sheet_to_json(worksheet)

      resolve(data)
    }

    fileReader.onerror = (error) => {
      reject(error)
    }
  })

  promise.then((data) => {
    // console.log(data);
    const dataArray= data.map((qa) => {
      let iscorrectArray = [false,false,false,false]
      if(qa.Type==='Single'){
        const index = qa['Answer Option']
        iscorrectArray[index-1]=true
      }
      else{
        const multiple = qa['Answer Option'].split(',')
        let j
        for(j of multiple){
          const index = Number(j)
          iscorrectArray[index-1]=true
        }
      }
      return (
        {
          'text':stringEscape(qa.Question),
          'explanation':stringEscape(qa.Explanation),
          'question_type':qa.Type.toLowerCase(),
          'choices':[
            {
              'text':stringEscape(qa['Choice 1']),
              'is_correct':iscorrectArray[0]
            },
            {
              'text':stringEscape(qa['Choice 2']),
              'is_correct':iscorrectArray[1]
            },
            {
              'text':stringEscape(qa['Choice 3']),
              'is_correct':iscorrectArray[2]
            },
            {
              'text':stringEscape(qa['Choice 4']),
              'is_correct':iscorrectArray[3]
            }
          ]
        }
      )
    })
    console.log(dataArray)
    const Questions_Data = { ...convertToObject(dataArray),'quizid':quizid }
    console.log(Questions_Data)

    const url = 'https://credify.tk/addquestions'
    var options = {
      headers: {
        'Authorization': `TOKEN ${window.localStorage.getItem('token')}`
      }
    }
    axios.post(url,Questions_Data,options)
      .then(response => {
        console.log(response)
        alert('NEW QUIZ CREATED')
      })
      .catch(error => {
        console.log(error)
      })


  })

}
