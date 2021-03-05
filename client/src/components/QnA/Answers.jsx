import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import Photos from './Photos.jsx';

export default function Answer({answer, index}) {
  var n = new Date(`${answer.date.slice(0,10)}`)
  var newdate = n.toDateString()

  const [helpfulness, setHelpfulness] = useState(answer.helpfulness)
  const [clicked, setClicked] = useState(false);

  const helpful = () => {
    if (clicked === false) {
      setHelpfulness(helpfulness + 1)
      setClicked(true)
    }
  }

  if (answer.answerer_name === 'Seller') {
    return (
    <div className="answer" id="answer" >
        {answer.photos.map((photo, index) => {
          return (
            <Photos image={photo}/>
          )}
         )}
       <span>
         <strong>A: </strong> {answer.body}
       </span>
       <div style={{fontSize:'12px'}}>
         by: <b>Seller</b>, {newdate} | Helpful? <u onClick={helpful}>Yes</u> ({answer.helpfulness}) | <u>Report</u>
       </div>
     </div>
    )
  } else {
    return (
      <div className="answer" id="answer" >
          {answer.photos.map((photo, index) => {
            return (
              <Photos key={index} photo={photo}/>
            )}
           )}
         <span>
           <strong>A: </strong> {answer.body}
         </span>
         <div style={{fontSize:'12px'}}>
           by: {answer.answerer_name}, {newdate} | Helpful? <u onClick={helpful}>Yes</u> ({helpfulness}) | <u>Report</u>
         </div>
       </div>
      )
  }
}
