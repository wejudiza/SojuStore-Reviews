import React from 'react';
import Photo from './Photos.jsx';

export default function Answer({answer, index}) {
  var n = new Date(`${answer.date.slice(0,10)}`)
  var newdate = n.toDateString()

 return (
 <div className="answer" id="answer" >
     {answer.photos.map((photo, index) =>
        <div className="photo" key={index}>
            <img src={photo} width='100px' height='100px' />
        </div>
        )}
    <span>
      <strong>A: </strong> {answer.body}
    </span>
    <div style={{fontSize:'12px'}}>
      by: {answer.answerer_name}, {newdate}
    </div>
  </div>
 )
}
