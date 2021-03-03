import React, {useState, useEffect} from 'react';
import Answer from './Answers.jsx';

export default function Question({question, index}) {
  const array = Object.keys(question.answers).map(key => {
    return question.answers[key]
  });
  const [answersToShow, setAnswersToShow] = useState(2);

  const showMoreAnswers = () => {
    setAnswersToShow(question.answers.length)
  }

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
         <button onClick={showMoreAnswers}>Load More Answers</button>
        {console.log('answer:', array)}
      </div>
    </div>
  )
}