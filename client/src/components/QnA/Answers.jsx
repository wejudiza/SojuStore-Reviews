import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import Photos from './Photos.jsx';
import axios from 'axios';

export default function Answer({answer}) {
  var n = new Date(`${answer.date.slice(0,10)}`)
  var newdate = n.toDateString()

  const [helpfulness, setHelpfulness] = useState(answer.helpfulness);
  const [clicked, setClicked] = useState(false);
  const [reported, setReported] = useState('Report');

  const helpful = () => {
    if (clicked === false) {
      setHelpfulness(helpfulness + 1)
      setClicked(true)
      axios.put(`api/qa/answers/${answer.answer_id}/helpful`, {
        "answer_id": answer.answer_id
      })
      .then ((result) => {
        alert('Upvoted!')
      })
      .catch((err) => console.error(err))
    }
  }

  const report = () => {
    axios.put(`api/qa/answers/${answer.answer_id}/report`, {
      "answer_id": answer.answer_id
    })
    .then ((result) => {
      setReported('Reported')
      alert('Reported!')
    })
    .catch (err => console.error(err))
  }

  if (answer.answerer_name === 'Seller') {
    return (
    <div>
       <span>
         <strong>A: </strong> {answer.body}
       </span>
        {answer.photos.map((photo, index) => {
          return (
            <Photos image={photo}/>
          )}
         )}
       <div style={{fontSize:'12px'}}>
         by: <b>Seller</b>, {newdate} | Helpful? <u onClick={helpful}>Yes</u> ({answer.helpfulness}) | <u name="report" onClick={report}>{reported}</u>
       </div>
     </div>
    )
  } else {
    return (
      <div>
         <span>
           <strong>A: </strong> {answer.body}
         </span>
          {answer.photos.map((photo, index) => {
            return (
              <Photos key={index} photo={photo.url}/>
            )}
           )}
         <div style={{fontSize:'12px'}}>
           by: {answer.answerer_name}, {newdate} | Helpful? <u onClick={helpful}>Yes</u> ({helpfulness}) | <u onClick={report}>{reported}</u>
         </div>
       </div>
      )
  }
}
