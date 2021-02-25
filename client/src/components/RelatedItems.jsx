import React, {useState, useEffect} from 'react';
import axios from 'axios';


const RelatedItems = (props) => {
  const [name, setName] = useState('');
  const [related, setRelated] = useState([]);


  const getRelated = () => {
    axios.get('/api/16392')
      .then((results) => setRelated(results.data))
      .catch((err) => console.log(err))
  }

  useState(getRelated, [])


  return (
    <div> TESTING HOOKS:
      <label className="header-name">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onClick={e => e.target.setSelectionRange(0, e.target.value.length)}
          placeholder="Untitled"
        />
        {related.map((id, index) => {
          return (
            <div key={index}>
              {id}
            </div>
          )
        })}
      </label>
    </div>

  )
}


export default RelatedItems;


//