/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

// leftArrow line 100 - needed to make it go to the left of the image, cheap coded the left alignment to make it fit into small monitor
// check the thumbnail change when you change default photo on the arrows..
// need to look into refractoring to be bale to fit the thumbnails into the default photos

function GalleryImg(props) {
  const [maxThumbIndex, setMaxThumbIndex] = useState([]);
  // the first thumb index of the displayed thumbnail gallery images
  const [thumbIndex, setThumbIndex] = useState(0);
  const [maxThumb, setMaxThumb] = useState();
  console.log(thumbIndex)
  console.log(props.index)

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (Object.keys(props.default).length > 0) {
      // eslint-disable-next-line react/prop-types
      setMaxThumbIndex(props.default.photos.length);
      setMaxThumb(helperCheck(props.default.photos.length - 1, 7));
    }
  }, [props.default]);

  const handleClickImg = (url, ind) => {
    props.setDefaultPhoto(url);
    props.setIndex(ind);
  };

  const changeForwardRight = () => {
    if (props.index === props.default.photos.length - 1) {
      props.setIndex(0);
      props.setDefaultPhoto(props.default.photos[props.index + 1].url);
    } else {
      props.setIndex(props.index + 1);
      props.setDefaultPhoto(props.default.photos[props.index + 1].url);
    }
  };

  const changeBackwardLeft = () => {
    if (props.index === 0) {
      return;
    }
    const newInd = props.index - 1;
    props.setIndex(newInd);
    props.setDefaultPhoto(props.default.photos[newInd].url);
  };

  const changeLeftThumb = () => {
    if (thumbIndex === 0) {
      return;
    }
    const newInd = thumbIndex - 1;
    setThumbIndex(newInd);
  };

  const changeRightThumb = () => {
    if (thumbIndex === props.default.photos.length - 1) {
      return;
    }
    // const newInd = thumbIndex + 1;
    // eslint-disable-next-line no-const-assign
    // const lastInd = newInd + 6;
    setThumbIndex(thumbIndex + 1);
    // setLast(lastInd);
  };

  const between = (target, min, max) => target >= min && target <= max;

  const checkThumbnailImg = (ind) => {
    if (thumbIndex + 6 < props.default.photos.length) {
      return (between(ind, thumbIndex, thumbIndex + 6));
    }
    const diff = Math.abs(thumbIndex + 7 - props.default.photos.length);
    if (between(ind, thumbIndex - diff, props.default.photos.length)) {
      return true;
    }
    return (between(ind, thumbIndex, props.default.photos.length));
  };

  const helperCheck = (num, variable) => {
    const arr = [];
    let count = 0;
    for (let i = 1; i <= num; i++) {
      arr.push(i);
    }

    for (let j = 0; j < arr.length; j++) {
      const end = arr[j] + (variable - 1);
      if (end === arr[arr.length - 1]) {
        count++;
        return count;
      }
      count++;
    }
  };

  return (
    <div id="default-thumbnails">
      <div>
        <i
          className={props.index > 0 ? 'leftArrow' : 'leftArrow-hidden'}
          style={{
            visibility: 'visible', position: 'absolute', left: '1.3%', top: '50%', padding: '0.5%',
          }}
          onClick={() => changeBackwardLeft()}
        />
        <i
          className={props.index === maxThumbIndex - 1 ? 'rightArrow-hidden' : 'rightArrow'}
          style={{
            visibility: 'visible', position: 'absolute', left: '47%', top: '50%', padding: '0.5%',
          }}
          onClick={() => changeForwardRight()}
        />
        <div>
          {Object.keys(props.default).length > 0
            ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="leftArrow" style={thumbIndex > 0 ? { visibility: 'visible' } : { visibility: 'hidden' }} onClick={() => changeLeftThumb()}>  </i>
                {props.default.photos.map((item, index) => (
                  <img className={checkThumbnailImg(index) ? 'default-thumbnail' : 'default-thumbnail-hidden'} src={item.thumbnail_url === null ? 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101032/112815935-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6' : item.thumbnail_url} key={index} onClick={() => handleClickImg(item.url, index)} style={props.index === index ? { boxShadow: '0px 1px 20px 10px lightsteelblue' } : null} />
                ))}
                <i className="rightArrow" style={thumbIndex >= maxThumb || maxThumb === undefined ? { visibility: 'hidden' } : { visibility: 'visible' }} onClick={() => changeRightThumb()}> </i>
              </div>
            )
            : null}
        </div>
      </div>
    </div>
  );
}

export default GalleryImg;
