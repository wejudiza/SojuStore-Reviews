import React from 'react';

export default function AddReviewRadio({ name, options }) {
  return (
    <form className="add-review-radio">
      { options.map((val) => (
        <>
          <input type="radio" id={val} name={name} value={val} />
          <label htmlFor={val}>{val}</label>
        </>
      )) }
    </form>
  );
}
