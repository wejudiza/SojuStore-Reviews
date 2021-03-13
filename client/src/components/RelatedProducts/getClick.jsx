import React, {useContext} from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import { UserClick } from '../UserClick.js';

const getClick = (props) => {
  const click = useContext(UserClick)
  console.log('TEST', click)
  return (
    <div>
      <RelatedProductsList click={click}/>
    </div>
  )
}

export default getClick;