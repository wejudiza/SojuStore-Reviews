import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GalleryImg(props) {
  const [maxThumbIndex, setMaxThumbIndex] = useState([]);
  const [thumbIndex, setThumbIndex] = useState(0);

  useEffect(() => {
    if (Object.keys(props.default).length > 0) {
      setMaxThumbIndex(props.default.photos.length)
    }
  }, [props.default])

  const handleClickImg = (url, ind) => {
    props.setDefaultPhoto(url)
    props.setIndex(ind)
  }

  const changeForwardRight = () => {
    if (props.index === props.default.photos.length - 1) {
      props.setIndex(0);
      props.setDefaultPhoto(props.default.photos[props.index].url)
    } else {
      props.setIndex(props.index + 1)
      props.setDefaultPhoto(props.default.photos[props.index].url)
    }
  }

  const changeBackwardLeft = () => {
    if (props.index === 0) {
      return
    } else {
      let newInd = props.index - 1
      props.setIndex(newInd)
      props.setDefaultPhoto(props.default.photos[props.index].url)
    }
  }

  const changeLeftThumb = () => {
    if (thumbIndex === 0 ) {
      return
    } else {
      let newInd = thumbIndex - 1
      setThumbIndex(newInd)
    }
  }

  const changeRightThumb = () => {
    if (thumbIndex === props.default.photos.length - 1 ) {
      return
    } else {
      let newInd = thumbIndex + 1
      setThumbIndex(newInd)
    }
  }

  const between = (target, min, max) => {
    return target >= min && target <= max;
  }

  const checkThumbnailImg = (ind) => {
    if (thumbIndex + 6 < props.default.photos.length) {
      return (between(ind, thumbIndex, thumbIndex + 6))
    } else {
      var diff = Math.abs(thumbIndex + 7 - props.default.photos.length)
      if (between(ind, thumbIndex - diff, props.default.photos.length)) {
        return true
      } else {
        return (between(ind, thumbIndex, props.default.photos.length))
      }
    }
  }

  return (
    <div id="default-thumbnails">
      <i className={props.index > 0 ? 'leftArrow' : 'leftArrow-hidden'} onClick={() => changeBackwardLeft()}> </i>
      <i className={props.index === maxThumbIndex - 1 ? 'rightArrow-hidden' : 'rightArrow' } onClick={() => changeForwardRight()}> </i>
      <div>
      {Object.keys(props.default).length > 0 ?
          props.default.photos.map((item, index) => (
              <img className={checkThumbnailImg(index) ? "default-thumbnail" : "default-thumbnail-hidden" } src={item.thumbnail_url} key={index} onClick={() => handleClickImg(item.url, index)} ></img>
        ))
      : null}
      </div>
      <i className={thumbIndex > 0 ? 'leftArrow' : 'leftArrow-hidden'} onClick={() => changeLeftThumb()}>  </i>
      <i className={thumbIndex === maxThumbIndex ? 'rightArrow-hidden' : 'rightArrow'} onClick={() => changeRightThumb()}> </i>
    </div>
  )
}

export default GalleryImg
