import React, { useState, useEffect } from 'react';
import axios from 'axios';

// leftArrow line 100 - needed to make it go to the left of the image, cheap coded the left alignment to make it fit into small monitor
// change css for the selected thumbnail on display (thumbnails of 7) TRY TO HIGHLIGHT OVER THE IMAGE
// check the thumbnail change when you change default photo on the arrows..

function GalleryImg(props) {
  const [maxThumbIndex, setMaxThumbIndex] = useState([]);
  // the first thumb index of the displayed thumbnail gallery images
  const [thumbIndex, setThumbIndex] = useState(0);
  const [maxThumb, setMaxThumb] = useState();

  useEffect(() => {
    if (Object.keys(props.default).length > 0) {
      setMaxThumbIndex(props.default.photos.length)
      setMaxThumb(helperCheck(props.default.photos.length-1, 7))
    }
  }, [props.default])

  const handleClickImg = (url, ind) => {
    props.setDefaultPhoto(url)
    props.setIndex(ind)
  }

  const changeForwardRight = () => {
    if (props.index === props.default.photos.length - 1) {
      props.setIndex(0);
      props.setDefaultPhoto(props.default.photos[props.index + 1].url)
    } else {
      props.setIndex(props.index + 1)
      props.setDefaultPhoto(props.default.photos[props.index + 1].url)
    }
  }

  const changeBackwardLeft = () => {
    if (props.index === 0) {
      return
    } else {
      let newInd = props.index - 1
      props.setIndex(newInd)
      props.setDefaultPhoto(props.default.photos[newInd].url)
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
      let last = newInd + 6
      setThumbIndex(newInd)
      setLast(last)
      setRight(right + 1)
    }
  }

  const between = (target, min, max) => {
    return target >= min && target <= max;
  }

  const checkThumbnailImg = (ind) => {
    if (thumbIndex + 6 < props.default.photos.length) {
      return (between(ind, thumbIndex, thumbIndex + 6))
    } else {
      let diff = Math.abs(thumbIndex + 7 - props.default.photos.length)
      if (between(ind, thumbIndex - diff, props.default.photos.length)) {
        return true
      } else {
        return (between(ind, thumbIndex, props.default.photos.length))
      }
    }
  }

  const helperCheck = (num, variable) => {
    let arr = [];
    let count = 0;
    for (let i = 1; i <= num; i++) {
      arr.push(i)
    }

    for (let j = 0; j < arr.length; j++) {
      let end = arr[j] + (variable - 1)
      if (end === arr[arr.length - 1]) {
        count++;
        return count;
      } else {
        count++;
      }
    }
  }

  return (
    <div id="default-thumbnails">
      <i className={props.index > 0 ?'leftArrow' : 'leftArrow-hidden'} style={{visibility: 'visible', position: 'absolute', margin: '-16%', left: '-76.5%'}} onClick={() => changeBackwardLeft()}> </i>
      <i className={props.index === maxThumbIndex - 1 ? 'rightArrow-hidden' : 'rightArrow'} style={{visibility: 'visible', margin: '-16%', right:'122.5%', position: 'absolute'} } onClick={() => changeForwardRight()}> </i>
      <div>
      {Object.keys(props.default).length > 0 ?
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <i className='leftArrow' style={thumbIndex > 0 ? {visibility: 'visible'} : {visibility: 'hidden'} } onClick={() => changeLeftThumb()}>  </i>
          {props.default.photos.map((item, index) => (
             <img className={checkThumbnailImg(index) ? "default-thumbnail" : "default-thumbnail-hidden" } src={item.thumbnail_url} key={index} onClick={() => handleClickImg(item.url, index)} style={props.index === index ? {boxShadow: '0px 1px 20px 5px red', filter: 'contrast(1.5)'} : null} ></img>
          ))}
          <i className='rightArrow' style={thumbIndex >= maxThumb ? {visibility: 'hidden'} : {visibility: 'visible'} } onClick={() => changeRightThumb()}> </i>
        </div>
      : null}
      </div>
    </div>
  )
}

export default GalleryImg

// if (index === thumbIndex - 1) {
//   return (
//     <Animated animationOut="slideOutLeft" >
//     <img className={checkThumbnailImg(index) ? "default-thumbnail" : "default-thumbnail-hidden" } src={item.thumbnail_url} key={index} onClick={() => handleClickImg(item.url, index)} style={props.index === index ? {boxShadow: '0px 1px 20px 5px red', filter: 'contrast(1.5)'} : null} >{console.log('test')}</img>
//     </Animated>
//   )
// } else if (index === lastThumbInd) {
//   return (
//     <Animated animationIn="slideInRight" style={{height: '70px'}} >
//     <img className={checkThumbnailImg(index) ? "default-thumbnail" : "default-thumbnail-hidden" } src={item.thumbnail_url} key={index} onClick={() => handleClickImg(item.url, index)} style={props.index === index ? {boxShadow: '0px 1px 20px 5px red', filter: 'contrast(1.5)'} : null} >{console.log('test slideIn')}</img>
//     </Animated>
//   )
// } else {
//   return (
//     <img className={checkThumbnailImg(index) ? "default-thumbnail" : "default-thumbnail-hidden" } src={item.thumbnail_url} key={index} onClick={() => handleClickImg(item.url, index)} style={props.index === index ? {boxShadow: '0px 1px 20px 5px red', filter: 'contrast(1.5)'} : null} ></img>
