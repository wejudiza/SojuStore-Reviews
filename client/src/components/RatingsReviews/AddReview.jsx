import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';

// Contexts
import { UserContext } from '../UserContext.jsx';

// Components
import AddReviewText from './AddReviewText.jsx';
import AddReviewRadio from './AddReviewRadio.jsx';
import AddReviewImgUpload from './AddReviewImgUpload.jsx';
import AddReviewSubmit from './AddReviewSubmit.jsx';

// Custom Hooks + helper functions
import useText from './useText.js';
import useCount from './useCount.js';
import useOption from './useOption.js';
import useUpload from './useUpload.js';

// Custom Hook initial states
const initialCount = {
  "name": 0,
  "email": 0,
  "summary": 0,
  "body": 0,
};

const initialText = {
  "name": '',
  "email": '',
  "summary": '',
  "body": '',
};

export default function AddReview({ metadata }) {
  // Get product context + set inital state
  const product = useContext(UserContext);
  const [urls, setUrls] = useUpload([]);
  const [isOpen, setIsOpen] = useState(false);
  const [texts, setText] = useText(initialText);
  const [counts, setCount] = useCount(initialCount);
  const [options, setOption] = useOption({recommend: 0 });
  const [characteristics, setCharacteristics] = useState({});

  useEffect(() => {
    if (metadata) {
      setCharacteristics({ ...metadata.characteristics });
    }
  }, [metadata]);

  return (
    <div id="add-review">
      <button id="add-review-btn" type="button" onClick={() => setIsOpen(true)}>Add A Review +</button>
      <Modal id="add-review-modal" isOpen={isOpen} onRequestClose={() => setIsOpen(false)} ariaHideApp={false}>

        { /* Dynamic add review title */ }
        <div id="add-review-header">
          <h2>
            Write Your Review For
            <br />
            { product.name }
          </h2>
        </div>

        { /* -------------------
          User Input Text Fields
          ------------------- */ }
        {/* Text Input: Username */ }
        <AddReviewText
          name="name"
          header="Username"
          placeholder="Example: jackson11!"
          min="0"
          max="60"
          setText={setText}
          setCount={setCount}
          charCount={counts.name}
        />
        <div className="add-review-privacy">For privacy reasons, do not use your full name or email address</div>
        {/* Text Input: Email */ }
        <AddReviewText
          name="email"
          header="Email"
          placeholder="Example: jackson11@email.com!"
          min="0"
          max="60"
          setText={setText}
          setCount={setCount}
          charCount={counts.email}
        />
        <div className="add-review-privacy">For authentication reasons, you will not be emailed</div>
        {/* Text Input: Review Summary */ }
        <AddReviewText
          name="summary"
          header="Review Summary"
          placeholder="Example: Best purchase ever!"
          min="0"
          max="60"
          setText={setText}
          setCount={setCount}
          charCount={counts.summary}
        />
        { /* Text Input: Full Review */ }
        <AddReviewText
          name="body"
          header="Full Review"
          placeholder="Why did you like the product or not?"
          min="50"
          max="1000"
          setText={setText}
          setCount={setCount}
          charCount={counts.body}
        />

        { /* -------------------
          User Input Radio Forms
          ------------------- */ }
        { /* Radio Buttons: Product Recommendation */ }
        <AddReviewRadio header="Recommend" name="recommend" setOption={setOption} />
        { Object.keys(characteristics).map((char) => (
          <AddReviewRadio
            setOption={setOption}
            header={char}
            name={characteristics[char].id}
            key={characteristics[char].id}
          />
        )) }

        { /* User Image Upload, Close Button, Submit Button */ }
        <AddReviewImgUpload urls={urls} setUrls={setUrls} />
        <br />
        <AddReviewSubmit texts={texts} counts={counts} options={options} urls={urls} />
        <button id="close-review-btn" type="button" onClick={() => setIsOpen(false)}>Close</button>

      </Modal>

    </div>
  );
}
