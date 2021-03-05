import React, { useState, useContext } from 'react';
import Modal from 'react-modal';

// Contexts
import { UserContext } from '../UserContext.jsx';

// Components
import RatingStars from './RatingStars.jsx';
import AddReviewText from './AddReviewText.jsx';
import AddReviewRadio from './AddReviewRadio.jsx';
import AddReviewImgUpload from './AddReviewImgUpload.jsx';

// Custom Hooks
import useText from './useText.js';
import useCount from './useCount.js';
import useOption from './useOption.js';

export default function AddReview() {
  let product = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useCount({
    "Username": 0,
    "Email": 0,
    "Review Summary": 0,
    "Full Review": 0,
  });

  const [text, setText] = useText({
    "Username": '',
    "Email": '',
    "Review Summary": '',
    "Full Review": '',
  });

  const [option, setOption] = useOption({
    14: 0, // Size
    15: 0, // Width
    16: 0, // Comfort
    17: 0, // Quality
    18: 0, // Length
    19: 0, // Fit
    recommend: 0, // recommended
  });

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
        {JSON.stringify(option)}
        { /* -------------------
          User Input Text Fields
          ------------------- */ }
        {/* Text Input: Username */ }
        <AddReviewText
          name="Username"
          placeholder="Example: jackson11!"
          min="0"
          max="60"
          setText={setText}
          setCount={setCount}
          charCount={count.Username}
        />
        <div className="add-review-privacy">For privacy reasons, do not use your full name or email address</div>
        {/* Text Input: Email */ }
        <AddReviewText
          name="Email"
          placeholder="Example: jackson11@email.com!"
          min="0"
          max="60"
          setText={setText}
          setCount={setCount}
          charCount={count.Email}
        />
        <div className="add-review-privacy">For authentication reasons, you will not be emailed</div>
        {/* Text Input: Review Summary */ }
        <AddReviewText
          name="Review Summary"
          placeholder="Example: Best purchase ever!"
          min="0"
          max="60"
          setText={setText}
          setCount={setCount}
          charCount={count['Review Summary']}
        />
        { /* Text Input: Full Review */ }
        <AddReviewText
          name="Full Review"
          placeholder="Why did you like the product or not?"
          min="60"
          max="1000"
          setText={setText}
          setCount={setCount}
          charCount={count['Full Review']}
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

        { /* User Image Upload */ }
        <AddReviewImgUpload />

        <button id="close-review-btn" type="button" onClick={() => setIsOpen(false)}>Close</button>
        <button id="submit-review-btn" type="button" onClick={() => setIsOpen(false)}>Submit</button>
      </Modal>

    </div>
  );
}
