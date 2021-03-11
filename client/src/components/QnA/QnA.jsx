import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Question from './Questions.jsx';
import Modal from 'react-modal';
import {UserContext} from '../UserContext.jsx';

export default function QnA() {
  const product_Id = useContext(UserContext).id;
  const [questions, setQuestions] = useState([]);
  const [questionsToShow, setQuestionsToShow] = useState(2);
  const [filteredQuestion, setFilteredQuestion] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalState, setModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    body: '',
    name: '',
    email: '',
    product_id: 0
  });
  const [search, setSearch] = useState('');
  questions.sort((a, b) => a.helpfulness > b.helpfulness ? -1 : 1)

  useEffect(() => {
    if (product_Id) {
      axios.get(`/api/qa/questions/${product_Id}`)
        .then((results) => {
          setQuestions(results.data.results)
          setFilteredQuestion(results.data.results)
        })
        .then((axios.get(`/api/qa/questions/${product_Id}`)
          .then((results) => setNewQuestion({
            ...newQuestion,
            product_id: results.data.product_id,
          }))
          ))
        .catch((err) => console.error(err));
    }
  }, [product_Id]);

  const showMoreQuestions = () => {
    setQuestionsToShow(questions.length)
    setLoaded(true)
  }

  const showLess = () => {
    setQuestionsToShow(2)
    setLoaded(false)
  }

  const captureText = (e) => {
    setNewQuestion({
      ...newQuestion,
      [e.target.name]: e.target.value
    })
  }

  const updateSearch = (e) => {
    setSearch(e.target.value)
    let filter = questions.filter(
      (question) => {
        return question.question_body.toLowerCase().match(search);
      }
    )
    setFilteredQuestion(filter)
  }

  const submitQuestion = () => {
    if (newQuestion.email.indexOf('@') === -1 || newQuestion.email.indexOf('.') === -1) {
      alert('Invalid Email')
    } else if (newQuestion.body === '' || newQuestion.name === '') {
      alert('Invalid Entry')
    } else {

      axios.post(`/api/qa/questions/${newQuestion.product_id}`, {
        "body" : newQuestion.body,
        "name" : newQuestion.name,
        "email" : newQuestion.email,
        "product_id" : Number(newQuestion.product_id)
      })
      .then((results) => {
        alert('Question Submitted!')
      })
      .then(() => {
        axios.get(`/api/qa/questions/${newQuestion.product_id}`)
        .then((results) => {
          setQuestions(results.data.results)
        })
        .catch((err) => {
          console.error(err)
        })
      })
      .then(() => {
        setNewQuestion({
        "body" : '',
        "name" : '',
        "email" : '',
        "product_id" : 0
        })
      })
      .then(() => {
        document.getElementById('name-input').value = ''
        document.getElementById('email-input').value = ''
        document.getElementById('body-input').value = ''
      })
      .catch((err) => {
        console.error(err)
      })
    }
  }

  if (loaded === false) {
    return (
      <div id="questions-container">
        <div id="search-bar-container">
          <input type="text" id="search-bar" id="search-bar" placeholder="Search Questions" value={search} onChange={updateSearch}/>
        </div>
        <div id="answers-container">
        {!filteredQuestion ? null : filteredQuestion.slice(0, questionsToShow).map((question, index) => {
          return (
          <div key={index}>
            <Question question={question}/>
          </div>
          )}
        )}
          <button id="show-more" onClick={showMoreQuestions}>Load More Questions</button>
          <button id="add-a-question" onClick={()=>{setModal(true)}}>Add A Question +</button>
          <Modal isOpen={modalState} onRequestClose={()=>{setModal(false)}} appElement={document.getElementById('app')}>
            <h2 id="add-question-header">
              Question
            </h2>
              <h5 id="username-header">Username</h5>
              <input id="name-input" placeholder="Example: jackson11!" name="name" onChange={captureText}></input>
              <br></br>
              <h5 id="email-header">Email</h5>
              <input id="email-input" placeholder="Email" name="email" onChange={captureText}></input>
              <br></br>
              <h5 id="your-answer-header">Your Question</h5>
              <p>
                <textarea id="body-input" placeholder="Your Question Here" name="body" onChange={captureText}>
                </textarea>
              </p>
            <button id="on-submit-button" onClick={submitQuestion}>Submit</button>
            <button id="close-button" onClick={()=>setModal(false)}>Close</button>
          </Modal>
        </div>
      </div>
    );
  } else {
    return (
      <div id="questions-container">
        <div id="search-bar-container">
        <input type="text" id="search-bar" placeholder="Search Questions" value={search} onChange={()=>{updateSearch(search)}}/>
        </div>
        <div id="answers-container">
        {!filteredQuestion ? null : filteredQuestion.slice(0, questionsToShow).map((question, index) => {
          return (
          <div key={index}>
            <Question question={question}/>
          </div>
          )}
        )}
          <button id="show-more" onClick={showLess}>Collapse Questions</button>
          <button id="add-a-question" onClick={()=>{setModal(true)}}>Add A Question +</button>
          <Modal isOpen={modalState} onRequestClose={()=>{setModal(false)}} appElement={document.getElementById('app')}>
            <h2 id="add-question-header">
              Question
            </h2>
              <h5 id="username-header">Username</h5>
              <input id="name-input" placeholder="Example: jackson11!" name="name" onChange={captureText}></input>
              <br></br>
              <h5 id="email-header">Email</h5>
              <input id="email-input" placeholder="Email" name="email" onChange={captureText}></input>
              <br></br>
              <h5 id="your-answer-header">Your Question</h5>
              <p>
                <textarea id="body-input" placeholder="Your Question Here" name="body" onChange={captureText}>
                </textarea>
              </p>
            <button id="on-submit-button" onClick={submitQuestion}>Submit</button>
            <button id="close-button" onClick={()=>setModal(false)}>Close</button>
          </Modal>
        </div>
      </div>
    );
  }
};
