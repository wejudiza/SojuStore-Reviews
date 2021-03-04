import React, {useState, useEffect} from 'react';
import Answer from './Answers.jsx';
import Modal from 'react-modal';

export default function Question({question, index}) {
  var array = Object.keys(question.answers).map(key => {
    return question.answers[key]
  });

  array.sort((a, b) => a.helpfulness > b.helpfulness ? -1 : 1 )

  const [answersToShow, setAnswersToShow] = useState(2);
  const [loaded, setLoaded] = useState(false);
  const [modalState, setModal] = useState(false);
  const [answer, setAnswer] = useState('');
  const [helpfulness, setHelpfulness] = useState(question.question_helpfulness)
  const [clicked, setClicked] = useState(false);
  const [search, setSearch] = useState('');

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

  const captureText = (e) => {
    setAnswer(e.target.value)
  }

  const updateSearch = (e) => {
    setSearch(e.target.value)
  }

  let filteredAnswer = array.filter(
    (answer) => {
      return answer.body.toLowerCase().indexOf(search) !== -1;
    }
  )

  {console.log(array)}

  if (loaded === false) {
    return (
      <div className="question">
        <h4>
        Q: {question.question_body}
        </h4>
        <input type="text" className="search-bar" placeholder="Search Answers" value={search} onChange={updateSearch}></input>
          <div>
            <div className="question-helpfulness">
            Helpful? <u onClick={helpful}>Yes</u> ({helpfulness}) | <u onClick={()=>{setModal(true)}}>
              Add Answer</u>
            </div>
            <Modal isOpen={modalState} onRequestClose={()=>{setModal(false)}} appElement={document.getElementById('app')}>
              <h3>
                Add Answer
              </h3>
              <input placeholder="Username"></input>
              <br></br>
              <input placeholder="Email"></input>
              <br></br>
              <p>
                <textarea placeholder="Your Answer Here" onChange={captureText}>
                </textarea>
              </p>
              <button>Submit</button>
            <button onClick={()=>setModal(false)}>Close</button>
          </Modal>
          {filteredAnswer.slice(0,answersToShow).map((answer, index) =>
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
        <input type="text" className="search-bar" placeholder="Search Answers" value={search} onChange={updateSearch}></input>
         <div>
           <div className="question-helpfulness">
           Helpful? <u onClick={helpful}>Yes</u> ({helpfulness}) | <u onClick={()=>{setModal(true)}}>
              Add Answer</u>
            </div>
            <Modal isOpen={modalState} onRequestClose={()=>{setModal(false)}} appElement={document.getElementById('app')}>
              <h3>
                Add Answer
              </h3>
              <input placeholder="Username"></input>
              <br></br>
              <input placeholder="Email"></input>
              <br></br>
              <p>
                <textarea placeholder="Your Answer Here" onChange={captureText}>
                </textarea>
              </p>
              <button>Submit</button>
            <button onClick={()=>setModal(false)}>Close</button>
          </Modal>
          {filteredAnswer.slice(0,answersToShow).map((answer, index) =>
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