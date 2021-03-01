import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StyleSelect (props) {
  const [styles, setStyles] = useState([])
  const [thumbnail, setThumbnail] = useState('')

  useEffect(() => {
    if (props.data !== undefined) {
      axios.get(`/api/styles/${props.data}`)
        .then((results) => setStyles(results.data.results))
        .catch((err) => console.error(err))
    }
  }, [props.data])

  // const thumbPhotos = (input) => {
  //   for (var i = 0; i < input.length; i++) {
  //     for (var key in input[i]) {
  //       if (key === 'photos') {
  //         setThumbnail(input[i][key][0][thumbnail_url])
  //       }
  //     }
  //   }
  // }

  const testing = (input) => {
    var thumb = ''
    for (var key in input) {
      if (key === 'photos') {
        thumb = (input[key][0]['thumbnail_url'])
      }
    }
    return thumb
  }

  return (
    <div>
      {console.log('data: ', styles)}
      {console.log('thumb: ', thumbnail)}
      {styles.length > 0 ? setThumbnail(testing(styles[0])) : null}
    </div>
  )
}

export default StyleSelect

// const makeButtonCSS = (thumbnail) => {
//   return {
//     backgroundImage: `url(${thumbnail})`,
//   }
// }