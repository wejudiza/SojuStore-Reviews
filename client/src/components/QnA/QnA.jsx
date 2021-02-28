import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Question from './Questions.jsx'

export default function QnA(){
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios.get(`/api/qa/questions/16392`)
      .then((results) => setQuestions(results.data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div>
      {questions.map((question, index) =>
        <div key={index}>
          <Question question={question}/>
        </div>
        )}
      </div>
      {
        console.log('data', questions)
      }
    </div>
  );
};
