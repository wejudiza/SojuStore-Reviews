import React, { useState, useContext } from 'react';
import Modal from 'react-modal';

// Contexts
import { UserContext } from '../UserContext.jsx';

// Components
import RatingStars from './RatingStars.jsx';
import AddReviewText from './AddReviewText.jsx';
import AddReviewRadio from './AddReviewRadio.jsx';
import AddReviewImgUpload from './AddReviewImgUpload.jsx';
import AddReviewSubmit from './AddReviewSubmit.jsx';

// Custom Hooks
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

const initialOptions = {
  14: 0, // Size
  15: 0, // Width
  16: 0, // Comfort
  17: 0, // Quality
  18: 0, // Length
  19: 0, // Fit
  recommend: 0, // recommended
};

export default function AddReview() {
  // Get product context + set inital state
  const product = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [texts, setText] = useText(initialText);
  const [counts, setCount] = useCount(initialCount);
  const [options, setOption] = useOption(initialOptions);
  const [urls, setUrls] = useUpload([]);

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
        <AddReviewRadio
          id="recommend"
          header="Do You Recommend This Product?"
          setOption={setOption}
          options={['Yes', 'No']}
        />
        { /* Radio Buttons: Size */ }
        <AddReviewRadio
          id="14"
          header="Size"
          setOption={setOption}
          options={[
            'A Size Too Small',
            '1/2 A Size Too Small',
            'Perfect',
            '1/2 A Size Too Big',
            'A Szie Too Big'
          ]}

        />
        { /* Radio Buttons: Width */ }
        <AddReviewRadio
          id="15"
          header="Width"
          setOption={setOption}
          options={[
            'Too Narrow',
            'Slightly Narrow',
            'Perfect',
            'Too Wide',
            'Slightly Wide',
          ]}
        />
        { /* Radio Buttons: Length */ }
        <AddReviewRadio
          id="18"
          header="Length"
          setOption={setOption}
          options={[
            'Runs Short',
            'Runs Slightly Short',
            'Perfect',
            'Runs Slightly Long',
            'Runs Long',
          ]}
        />
        { /* Radio Buttons: Fit */ }
        <AddReviewRadio
          id="19"
          header="Fit"
          setOption={setOption}
          options={[
            'Runs Tight',
            'Runs Slightly Tight',
            'Perfect',
            'Runs Slightly Long',
            'Runs Long',
          ]}
        />
        { /* Radio Buttons: Comfort */ }
        <AddReviewRadio
          id="16"
          header="Comfort"
          setOption={setOption}
          options={[
            'Uncomfortable',
            'Slightly Uncomfortable',
            'Ok',
            'Comfortable',
            'Perfect',
          ]}
        />
        { /* Radio Buttons: Quality */ }
        <AddReviewRadio
          id="17"
          header="Quality"
          setOption={setOption}
          options={[
            'Poor',
            'Below Average',
            'What I Expected',
            'Pretty Great',
            'Perfect',
          ]}
        />
        <br />

        { /* User Image Upload, Close Button, Submit Button */ }
        <AddReviewImgUpload urls={urls} setUrls={setUrls} />
        <br />
        <AddReviewSubmit texts={texts} counts={counts} options={options} urls={urls} />
        <button id="close-review-btn" type="button" onClick={() => setIsOpen(false)}>Close</button>

      </Modal>

    </div>
  );
}
