import React, {useState, useEffect} from 'react';
import Answer from './Answers.jsx';
import Modal from 'react-modal';

export default function Question({question, index}) {
  var array = Object.keys(question.answers).map(key => {
    return question.answers[key]
  });

  array.sort((a, b) => a.helpfulness > b.helpfulness ? -1 : 1 )
  {console.log(array)}

  const [answersToShow, setAnswersToShow] = useState(2);
  const [loaded, setLoaded] = useState(false);
  const [modalState, setModal] = useState(false);
  const [answer, setAnswer] = useState('');
  const [helpfulness, setHelpfulness] = useState(question.question_helpfulness)
  const [clicked, setClicked] = useState(false);

  const showMoreAnswers = () => {
    setAnswersToShow(question.answers.length)
    setLoaded(true)
  }

  const helpful = () => {
    if (clicked === false) {
      setHelpfulness(helpfulness + 1)
      setClicked(true)
    }
  }

  const showLess = () => {
    setAnswersToShow(2)
    setLoaded(false)
  }

  const filterAnswer = () => {

  }

  const captureText = (e) => {
    setAnswer(e.target.value)
    console.log(answer)
  }

  if (loaded === false) {
    return (
      <div className="question">
        <h4>
        Q: {question.question_body}
        </h4>
          <div>
            <div className="question-helpfulness">
            Helpful? <u onClick={helpful}>Yes</u> ({helpfulness}) | <u onClick={()=>{setModal(true)}}>
              Add Answer</u>
            </div>
            <Modal isOpen={modalState} onRequestClose={()=>{setModal(false)}} appElement={document.getElementById('app')}>
              <h3>
                Answer
              </h3>
              <p>
                <textarea placeholder="Your Answer Here" onChange={captureText}>
                </textarea>
              </p>
              <button>Submit</button>
            <button onClick={()=>setModal(false)}>Close</button>
          </Modal>
          {array.slice(0,answersToShow).map((answer, index) =>
          <div key={index} >
              <Answer answer={answer}/>
          </div>
          )}
            <button onClick={showMoreAnswers}>Load More Answers</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="question">
        <h4>
        Q: {question.question_body}
        </h4>
         <div>
           <div className="question-helpfulness">
           Helpful? <u onClick={helpful}>Yes</u> ({helpfulness}) | <u onClick={()=>{setModal(true)}}>
              Add Answer</u>
            </div>
            <Modal isOpen={modalState} onRequestClose={()=>{setModal(false)}} appElement={document.getElementById('app')}>
              <h3>
                Answer
              </h3>
              <p>
                <textarea placeholder="Your Answer Here" onChange={captureText}>
                </textarea>
              </p>
              <button>Submit</button>
            <button onClick={()=>setModal(false)}>Close</button>
          </Modal>
          {array.slice(0,answersToShow).map((answer, index) =>
          <div key={index} >
              <Answer answer={answer}/>
          </div>
          )}
           <button onClick={showLess}>Load Less Answers</button>
        </div>
      </div>
    )
  }
}