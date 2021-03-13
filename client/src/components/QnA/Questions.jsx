import React, {useState, useEffect} from 'react';
import Answer from './Answers.jsx';
import Modal from 'react-modal';
import axios from 'axios';
import { storage} from "./Firebase/index.js"

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
  const [charCount, setCharCount] = useState({
    body: 0,
    name: 0,
    email: 0
  })
  const [helpfulness, setHelpfulness] = useState(question.question_helpfulness)
  const [clicked, setClicked] = useState(false);
  const [search, setSearch] = useState('');
  const [reported, setReported] = useState('Report');
  const [image, setImage] = useState([]);
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
  }, [question]);

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
    });
    setCharCount({
      ...charCount,
      [e.target.name]: e.target.value.length,
      [e.target.name]: e.target.value.length,
      [e.target.name]: e.target.value.length
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

  const handleChange = e => {
    if (e.target.files) {
      setImage(e.target.files)
    }
  }

  const upload = () => {
    for (var i = 0; i < image.length; i++) {
      handleUpLoad(image[i])
    }
    alert('Images Uploaded')
  }

  var arr = answer.photos
  const handleUpLoad = (upload) => {
    const uploadTask = storage.ref(`images/${upload.name}`).put(upload);
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(upload.name)
          .getDownloadURL()
          .then(url => {
            arr.push(url)
            setAnswer({
              ...answer,
              photos: arr
            })
          })
      })
  }

  if (loaded === false) {
    return (
      <div id="question">
        <h4 id="actual-question">
        Q: {question.question_body}
        </h4>
          <div>
          <div id="question-helpfulness">
           Helpful? <u id="answer-helpfulness" onClick={helpful}>Yes</u> ({helpfulness}) | <u id="add-answer" onClick={()=>{setModal(true)}}>
              Add Answer</u> | <u onClick={reportQuestion}>{reported}</u>
            </div>
            <input type="text" className="search-bar" placeholder="Search Answers" value={search} onChange={updateSearch}></input>
            <Modal id="answer-modal" isOpen={modalState} onRequestClose={()=>{setModal(false)}} appElement={document.getElementById('app')}>
              <div id="answer-modal">
                <h3 id="add-answer-header">
                  Add Answer
                </h3>
                <h5 id="username-header">Username</h5>
                  <input id="name-input" placeholder="Example: jackson11!" name="name" onChange={captureText} maxLength={60}></input>
                  <br></br>
                  <div id="body-count">
                  ({charCount.name}/60 Max Characters)
                  </div>
                <h5 id="email-header">Email</h5>
                  <input id="email-input" placeholder="Example: jack@email.com" name="email" onChange={captureText} maxLength={60}></input>
                  <br></br>
                  <div id="body-count">
                  ({charCount.email}/60 Max Characters)
                  </div>
                <h5 id="your-answer-header">Your Answer</h5>
                  <p>
                    <textarea id="body-input" placeholder="Your Answer Here" name="body" onChange={captureText} maxLength={500}>
                    </textarea>
                  </p>
                  <div id="body-count">
                  ({charCount.body}/500 Max Characters)
                  </div>
                  <button id="on-submit-button" onClick={submitAnswer}>Submit</button>
                  <button id="close-button" onClick={()=>setModal(false)}>Close</button>
                  <br></br>
                  <div id="choose-file-button">
                    Choose Files
                  <input className="hide-file" type="file" multiple onChange={handleChange}/>
                  </div>
                  <button id="upload-button" onClick={upload}>Upload Photo</button>
              </div>
          </Modal>
          {filteredAnswer.slice(0,answersToShow).map((answer, index) =>
          <div key={index} >
              <Answer answer={answer}/>
          </div>
          )}
          <br>
          </br>
            <button id="load-more-button" onClick={showMoreAnswers}>Load More Answers</button>
        </div>
      </div>
    )
  } else {
    return (
      <div id="question">
        <h4 id="actual-question">
        Q: {question.question_body}
        </h4>
         <div>
           <div id="question-helpfulness">
           Helpful? <u id="answer-helpfulness" onClick={helpful}>Yes</u> ({helpfulness}) | <u id="add-answer" onClick={()=>{setModal(true)}}>
              Add Answer</u> | <u id="report" onClick={reportQuestion}>{reported}</u>
            </div>
            <input type="text" className="search-bar" placeholder="Search Answers" value={search} onChange={updateSearch}></input>
            <Modal id="answer-modal" isOpen={modalState} onRequestClose={()=>{setModal(false)}} appElement={document.getElementById('app')}>
              <div id="answer-modal">
                <h3 id="add-answer-header">
                  Add Answer
                </h3>
                <h5 id="username-header">Username</h5>
                  <input id="name-input" placeholder="Example: jackson11!" name="name" onChange={captureText} maxLength={60}></input>
                  <br></br>
                  <div id="body-count">
                  ({charCount.name}/60 Max Characters)
                  </div>
                <h5 id="email-header">Email</h5>
                  <input id="email-input" placeholder="Example: jack@email.com" name="email" onChange={captureText} maxLength={60}></input>
                  <br></br>
                  <div id="body-count">
                  ({charCount.email}/60 Max Characters)
                  </div>
                <h5 id="your-answer-header">Your Answer</h5>
                  <p>
                    <textarea id="body-input" placeholder="Your Answer Here" name="body" onChange={captureText} maxLength={500}>
                    </textarea>
                  </p>
                  <div id="body-count">
                  ({charCount.body}/500 Max Characters)
                  </div>
                  <button id="on-submit-button" onClick={submitAnswer}>Submit</button>
                  <button id="close-button" onClick={()=>setModal(false)}>Close</button>
                  <br></br>
                  <div id="choose-file-button">
                    Choose Files
                  <input className="hide-file" type="file" multiple onChange={handleChange}/>
                  </div>
                  <button id="upload-button" onClick={upload}>Upload Photo</button>
              </div>
          </Modal>
          {filteredAnswer.slice(0,answersToShow).map((answer, index) =>
          <div key={index} >
              <Answer answer={answer}/>
          </div>
          )}
          <br>
          </br>
           <button id="load-more-button" onClick={showLess}>Collapse Answers</button>
        </div>
      </div>
    )
  }
}