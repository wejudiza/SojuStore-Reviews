import React, { useState, useContext } from 'react';
import Modal from 'react-modal';

// Components
import AddReviewText from './AddReviewText.jsx';

// Contexts
import { UserContext } from '../UserContext.jsx';

export default function AddReview() {
  const [isOpen, setIsOpen] = useState(false);
  let product = useContext(UserContext);

  return (
    <div id="add-review">
      <button id="add-review-btn" type="button" onClick={() => setIsOpen(true)}>Add A Review +</button>

      <Modal id="add-review-modal" isOpen={isOpen}>

        { /* Dynamic review header / title */ }
        <div id="add-review-header">
          Write Your Review For
          <br />
          { product.name }
        </div>

        <AddReviewText />

        <button id="close-review-btn" type="button" onClick={() => setIsOpen(false)}>Close</button>
      </Modal>

    </div>
  );
}
