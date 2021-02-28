import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Question from './Questions.jsx'

export default function QnA(){
  const [questions, setQuestions] = useState([]);
  const [questionsToShow, setQuestionsToShow] = useState(2);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios.get(`/api/qa/questions/16392`)
      .then((results) => setQuestions(results.data.results))
      .catch((err) => console.error(err));
  }, []);

  const showMoreQuestions = () => {
    setQuestionsToShow(questions.length)
  }

  return (
    <div>
      <div>
        <input type="text" className="search-bar" placeholder="Have A QUESTION? SEARCH FOR ANSWERS..." />
      </div>
      <div>
      {questions.slice(0, questionsToShow).map((question, index) =>
        <div key={index}>
          <Question question={question}/>
        </div>
        )}
        <button onClick={showMoreQuestions}>Load More Questions</button>
      </div>
      {
        console.log('questionsToShow:', questionsToShow)
      }
    </div>
  );
};
