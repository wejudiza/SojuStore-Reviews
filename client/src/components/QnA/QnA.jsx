import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Question from './Questions.jsx';
import Modal from 'react-modal';

export default function QnA(){
  const [questions, setQuestions] = useState([]);
  const [questionsToShow, setQuestionsToShow] = useState(2);
  const [loaded, setLoaded] = useState(false);
  const [modalState, setModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [search, setSearch] = useState('');
  questions.sort((a, b) => a.helpfulness > b.helpfulness ? -1 : 1)

  useEffect(() => {
    axios.get(`/api/qa/questions/16392`)
      .then((results) => setQuestions(results.data.results))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    console.log(search)
  }, [search]);

  const showMoreQuestions = () => {
    setQuestionsToShow(questions.length)
    setLoaded(true)
  }

  const showLess = () => {
    setQuestionsToShow(2)
    setLoaded(false)
  }

  const captureText = (e) => {
    setNewQuestion(e.target.value)
  }

  const updateSearch = (e) => {
    setSearch(e.target.value)
  }

  let filteredQuestion = questions.filter(
    (question) => {
      return question.question_body.toLowerCase().indexOf(search) !== -1;
    }
  )

  if (loaded === false) {
    return (
      <div>
        <div>
          <input type="text" className="search-bar" placeholder="Search Questions" value={search} onChange={updateSearch}/>
        </div>
        <div>
        {filteredQuestion.slice(0, questionsToShow).map((question, index) => {
          return (
          <div key={index}>
            <Question question={question}/>
          </div>
          )}
        )}
          <button onClick={showMoreQuestions}>Load More Questions</button>
          <button onClick={()=>{setModal(true)}}>Add A Question +</button>
          <Modal isOpen={modalState} onRequestClose={()=>{setModal(false)}} appElement={document.getElementById('app')}>
            <h2>
              Question
            </h2>
              <input placeholder="Username"></input>
              <br></br>
              <input placeholder="Email"></input>
              <br></br>
            <p>
              <textarea placeholder="Your Question" onChange={captureText}>
              </textarea>
            </p>
            <button>Submit</button>
            <button onClick={()=>setModal(false)}>Close</button>
          </Modal>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
        <input type="text" className="search-bar" placeholder="Search Questions" value={search} onChange={updateSearch}/>
        </div>
        <div>
        {filteredQuestion.slice(0, questionsToShow).map((question, index) => {
          return (
          <div key={index}>
            <Question question={question}/>
          </div>
          )}
        )}
          <button onClick={showLess}>Load Less Questions</button>
          <button onClick={()=>{setModal(true)}}>Add A Question +</button>
          <Modal isOpen={modalState} onRequestClose={()=>{setModal(false)}} appElement={document.getElementById('app')}>
            <h2>
              Question
            </h2>
              <input placeholder="Username"></input>
              <br></br>
              <input placeholder="Email"></input>
              <br></br>
            <p>
              <textarea placeholder="Your Question" onChange={captureText}>
              </textarea>
            </p>
            <button>Submit</button>
            <button onClick={()=>setModal(false)}>Close</button>
          </Modal>
        </div>
      </div>
    );
  }
};
