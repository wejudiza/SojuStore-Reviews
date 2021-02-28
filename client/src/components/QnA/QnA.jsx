import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Question from './Questions.jsx'

export default function QnA(){
  const [questions, setQuestions] = useState([]);
  const [questionsToShow, setQuestionsToShow] = useState(4);
  const [answers, setAnswers] = useState([]);
  const orderedQuestions = [];

  useEffect(() => {
    axios.get(`/api/qa/questions/16392`)
      .then((results) => setQuestions(results.data.results))
      .catch((err) => console.error(err));
  }, []);

  const showMoreQuestions = () => {
    setQuestionsToShow(questions.length)
  }

  // for (var i = 0; i < questions.length; i++) {
  //   var current = questions[3].question_helpfulness
  //   if (questions[i].question_helpfulness > current) {
  //     console.log(current)
  //   }
  // }


  return (
    <div>
      <div>
        <input type="text" className="search-bar" placeholder="Search Questions" />
      </div>
      <div>
      {questions.slice(0, questionsToShow).map((question, index) =>
        <div key={index}>
          <Question question={question}/>
        </div>
      )}
        <button onClick={showMoreQuestions}>Load More Questions</button>
      </div>
      {console.log((questions))}
    </div>
  );
};
