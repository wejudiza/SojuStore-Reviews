import React, {useContext} from 'react';
import {UserContext} from './UserContext.jsx';
import RelatedProductsList from './RelatedProductsList.jsx'

const GetMainId = (props) => {
  console.log(props)
  const mainId = useContext(UserContext)
  return (
    <div>
      <RelatedProductsList mainId={mainId.id}/>
    </div>
  )
}

export default GetMainId;