import React, {useState, useEffect} from 'react';
import Answer from './Answers.jsx';
import Modal from 'react-modal';
import axios from 'axios';

export default function Question({question}) {

  const [answers, setAnswers] = useState([]);
  const [answersToShow, setAnswersToShow] = useState(2);
  const [loaded, setLoaded] = useState(false);
  const [modalState, setModal] = useState(false);
  const [answer, setAnswer] = useState({
    body: '',
    name: '',
    email: '',
    photos: []
  });
  const [helpfulness, setHelpfulness] = useState(question.question_helpfulness)
  const [clicked, setClicked] = useState(false);
  const [search, setSearch] = useState('');
  const [reported, setReported] = useState('Report');
  answers.sort((a, b) => a.helpfulness > b.helpfulness ? -1 : 1 )

  let filteredAnswer = answers.filter(
    (answer) => {
      return answer.body.toLowerCase().indexOf(search) !== -1;
    }
  )

  useEffect(() => {
    axios.get(`/api/qa/questions/${question.question_id}/answers`)
    .then((results) => {
      setAnswers(results.data.results)
    })
    .catch((err) => {
      console.error(err)
    })
  }, []);

  const showMoreAnswers = () => {
    setAnswersToShow(question.answers.length)
    setLoaded(true)
  }

  const helpful = () => {
    if (clicked === false) {
      setHelpfulness(helpfulness + 1)
      setClicked(true)
      axios.put(`api/qa/questions/${question.question_id}/helpful`, {
        "question_id": question.question_id
      })
      .then ((result) => {
        alert('Upvoted!')
      })
      .catch((err) => console.error(err))
    }
  }

  const showLess = () => {
    setAnswersToShow(2)
    setLoaded(false)
  }

  const captureText = (e) => {
    setAnswer({
      ...answer,
      [e.target.name]: e.target.value
    })
  }

  const updateSearch = (e) => {
    setSearch(e.target.value)
  }

  const submitAnswer = () => {
    if (answer.email.indexOf('@') === -1 || answer.email.indexOf('.') === -1) {
      alert('Invalid Email')
    } else if (answer.body === '' || answer.name === '') {
      alert('Invalid Entry')
    } else {

      axios.post(`/api/qa/questions/${question.question_id}/answers`, {
        "body" : answer.body,
        "name" : answer.name,
        "email" : answer.email,
        "photos" : answer.photos
      })
      .then((results) => {
        alert('Answer Submitted!')
      })
      .then(() => {
        axios.get(`/api/qa/questions/${question.question_id}/answers`)
        .then((results) => {
          setAnswers(results.data.results)
        })
        .catch((err) => {
          console.error(err)
        })
      })
      .then(() => {
        setAnswer({
        "body" : '',
        "name" : '',
        "email" : '',
        "photos" : []
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

  const reportQuestion = () => {
    axios.put(`api/qa/questions/${question.question_id}/report`, {
      "question_id": question.question_id
    })
    .then ((result) => {
      setReported('Reported')
      alert('Reported!')
    })
    .catch (err => console.error(err))
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
              Add Answer</u> | <u onClick={reportQuestion}>{reported}</u>
            </div>
            <input type="text" className="search-bar" placeholder="Search Answers" value={search} onChange={updateSearch}></input>
            <Modal id="answer-modal" isOpen={modalState} onRequestClose={()=>{setModal(false)}} appElement={document.getElementById('app')}>
              <h3>
                Add Answer
              </h3>
              <h5>Username</h5>
              <input id="name-input" placeholder="Example: jackson11!" name="name" onChange={captureText}></input>
              <br></br>
              <h5>Email</h5>
              <input id="email-input" placeholder="Example: jack@email.com" name="email" onChange={captureText}></input>
              <br></br>
              <h5>Your Answer</h5>
              <p>
                <textarea id="body-input" placeholder="Your Answer Here" name="body" onChange={captureText}>
                </textarea>
              </p>
              <button onClick={submitAnswer}>Submit</button>
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
         <div>
           <div className="question-helpfulness">
           Helpful? <u onClick={helpful}>Yes</u> ({helpfulness}) | <u onClick={()=>{setModal(true)}}>
              Add Answer</u> | <u onClick={reportQuestion}>{reported}</u>
            </div>
            <input type="text" className="search-bar" placeholder="Search Answers" value={search} onChange={updateSearch}></input>
            <Modal id="answer-modal" isOpen={modalState} onRequestClose={()=>{setModal(false)}} appElement={document.getElementById('app')}>
              <h3>
                Add Answer
              </h3>
              <h5>Username</h5>
              <input id="name-input" placeholder="Example: jackson11!" name="name" onChange={captureText}></input>
              <br></br>
              <h5>Email</h5>
              <input id="email-input" placeholder="Example: jack@email.com" name="email" onChange={captureText}></input>
              <br></br>
              <h5>Your Answer</h5>
              <p>
                <textarea id="body-input" placeholder="Your Answer Here" name="body" onChange={captureText}>
                </textarea>
              </p>
              <button onClick={submitAnswer}>Submit</button>
            <button onClick={()=>setModal(false)}>Close</button>
          </Modal>
          {filteredAnswer.slice(0,answersToShow).map((answer, index) =>
          <div key={index} >
              <Answer answer={answer}/>
          </div>
          )}
           <button onClick={showLess}>Collapse Answers</button>
        </div>
      </div>
    )
  }
}