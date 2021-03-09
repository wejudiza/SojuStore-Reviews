import React from 'react';
import { Checkmark } from 'react-checkmark';

function Feature(props) {
  return (
    <div>
      {props.ft !== undefined ? props.ft.map((item, index) => (
        <div style={{display: 'inline-flex'}} key={index}> <Checkmark style={{position: 'absolute'}} size='small'/> {item.feature} <i className="fa fa-long-arrow-right" aria-hidden="true"></i> {item.value}</div>
      )) : null}
    </div>
  )
}

export default Feature