/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React from 'react';
import { Checkmark } from 'react-checkmark';

function Feature(props) {
  return (
    <div id="features">
      {props.ft !== undefined ? props.ft.map((item, index) => (
        <div key={index} style={{ display: 'flex' }}>
          <div>
            {' '}
            <Checkmark style={{ position: 'absolute' }} size="small" />
          </div>
          <div>
            {item.feature}
            {' '}
            <i className="fa fa-long-arrow-right" aria-hidden="true" />
            {' '}
            {item.value}
          </div>
        </div>
      )) : null}
    </div>
  );
}

export default Feature;
