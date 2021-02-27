import React, {useState} from 'react';
import axios from 'axios';

const QnA = (props) => {
  const [questions, setQuestions] = useState('');
  const [answers, setAnswers] = useState('');

  const getQnA = () => {
    axios.get('/qa/questions/16392')
      .then((results) => setQuestions(results.data))
      .catch((err) => {
        if (err) console.error(err);
      });
  };

  useState(setQuestions, []);

  return (
    <div>
      Hi
    </div>
  );
};

export default QnA