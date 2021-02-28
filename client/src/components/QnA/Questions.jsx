import React from 'react';
import Answer from './Answers.jsx';
import Photo from './Photos.jsx';

export default function Question({question, index}) {
  const array = Object.keys(question.answers).map(key => {
    return question.answers[key]
  });

  return(
    <div className="question">
      <h4>
      Q: {question.question_body}
      </h4>
       <div >
        {array.slice(0,answersToShow).map((answer, index) =>
        <div key={index} >
            <Answer answer={answer}/>
        </div>
        )}
        {console.log('answer:', array)}
      </div>
    </div>
  )
}