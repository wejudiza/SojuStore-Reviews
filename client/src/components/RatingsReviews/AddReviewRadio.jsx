import React from 'react';

export default function AddReviewRadio({ name, options }) {
  return (
    <>
      <h4>{name}</h4>
      <form className="add-review-radio">
        { options.map((val) => (
          <>
            <input type="radio" name={name} value={val} />
            <label htmlFor={val}>{val}</label>
          </>
        )) }
      </form>
    </>
  );
}
