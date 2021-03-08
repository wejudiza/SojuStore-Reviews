import React from 'react';

const options = {
  Recommend: [
    'Yes',
    'No'
  ],
  Size: [
    'A Size Too Small',
    '1/2 A Size Too Small',
    'Perfect',
    '1/2 A Size Too Big',
    'A Szie Too Big'
  ],
  Width: [
    'Too Narrow',
    'Slightly Narrow',
    'Perfect',
    'Too Wide',
    'Slightly Wide',
  ],
  Length: [
    'Runs Short',
    'Runs Slightly Short',
    'Perfect',
    'Runs Slightly Long',
    'Runs Long',
  ],
  Fit: [
    'Runs Tight',
    'Runs Slightly Tight',
    'Perfect',
    'Runs Slightly Long',
    'Runs Long',
  ],
  Comfort: [
    'Uncomfortable',
    'Slightly Uncomfortable',
    'Ok',
    'Comfortable',
    'Perfect',
  ],
  Quality: [
    'Poor',
    'Below Average',
    'What I Expected',
    'Pretty Great',
    'Perfect',
  ]
};

export default function AddReviewRadio(props) {
  const { header, name, setOption } = props;
  return (
    <>
      <h4>{header}</h4>
      { !header || !name ? null : (
        <form className="add-review-radio" onChange={setOption}>
          { options[header].map((val, index) => (
            <>
              <input type="radio" name={name} value={index + 1} />
              <label htmlFor={val}>{val}</label>
            </>
          )) }
       </form>
      ) }
    </>
  );
}
