import React from 'react';

export default function AddReviewRadio(props) {
  const { id, header, setOption, options } = props;
  return (
    <>
      <h4>{header}</h4>
      <form className="add-review-radio" onChange={setOption}>
        { options.map((val, index) => (
          <>
            <input type="radio" name={id} value={index + 1} />
            <label htmlFor={val}>{val}</label>
          </>
        )) }
      </form>
    </>
  );
}
