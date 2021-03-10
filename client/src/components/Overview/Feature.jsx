import React from 'react';
import { Checkmark } from 'react-checkmark';

function Feature(props) {
  return (
    <div id="features">
      {props.ft !== undefined ? props.ft.map((item, index) => (
        <div style={{display: 'flex'}}>
        <div key={index}> <Checkmark style={{position: 'absolute'}} size='small'/></div>
          <div>
           {item.feature} <i className="fa fa-long-arrow-right" aria-hidden="true"></i> {item.value}</div>
           </div>
      )) : null}
    </div>
  )
}

export default Feature