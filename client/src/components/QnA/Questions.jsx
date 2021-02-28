import React, {useState, useEffect} from 'react';
import Answer from './Answers.jsx';

export default function Question({question, index}) {
  const array = Object.keys(question.answers).map(key => {
    return question.answers[key]
  });

  const [answersToShow, setAnswerstoShow] = useState(2);

  const showMoreAnswers = () => {
    setAnswerstoShow(array.length)
  }

  return(
    <div className="question">
      <h4>
      Q: {question.question_body}
      </h4>
       <div>
        {array.slice(0,answersToShow).map((answer, index) =>
        <div key={index}>
            <Answer answer={answer}/>
        </div>
        )}
        <div>
          <button onClick={showMoreAnswers}>Load More Answers</button>
        </div>
        {console.log('answer:', array)}
      </div>
    </div>
  )
}