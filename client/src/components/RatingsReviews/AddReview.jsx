import React, { useState, useContext } from 'react';
import Modal from 'react-modal';

// Contexts
import { UserContext } from '../UserContext.jsx';

// Components
import RatingStars from './RatingStars.jsx';
import AddReviewText from './AddReviewText.jsx';
import AddReviewRadio from './AddReviewRadio.jsx';
import AddReviewImgUpload from './AddReviewImgUpload.jsx';

export default function AddReview() {
  const [isOpen, setIsOpen] = useState(false);
  let product = useContext(UserContext);

  return (
    <div id="add-review">
      <button id="add-review-btn" type="button" onClick={() => setIsOpen(true)}>Add A Review +</button>
      <Modal id="add-review-modal" isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>

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
          name="Username"
          placeholder="Example: jackson11!"
          min="0"
          max="60"
        />
        <div className="add-review-privacy">For privacy reasons, do not use your full name or email address</div>
        {/* Text Input: Email */ }
        <AddReviewText
          name="Email"
          placeholder="Example: jackson11@email.com!"
          min="0"
          max="60"
        />
        <div className="add-review-privacy">For authentication reasons, you will not be emailed</div>
        {/* Text Input: Review Summary */ }
        <AddReviewText
          name="Review Summary"
          placeholder="Example: Best purchase ever!"
          min="0"
          max="60"
        />
        { /* Text Input: Full Review */ }
        <AddReviewText
          name="Full Review"
          placeholder="Why did you like the product or not?"
          min="60"
          max="1000"
        />

        { /* -------------------
          User Input Radio Forms
          ------------------- */ }
        { /* Radio Buttons: Product Recommendation */ }
        <AddReviewRadio
          name="Do You Recommend This Product?"
          options={['Yes', 'No']}
        />
        { /* Radio Buttons: Size */ }
        <AddReviewRadio
          name="Size"
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
          name="Width"
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
          name="Length"
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
          name="Fit"
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
          name="Comfort"
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
          name="Quality"
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
