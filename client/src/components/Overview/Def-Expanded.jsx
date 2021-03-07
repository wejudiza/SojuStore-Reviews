import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ZoomedImg from './ZoomedImg.jsx';
import { Magnifier } from 'react-image-magnifiers';
import ReactImageZoom from 'react-image-zoom';

import InnerImageZoom from 'react-inner-image-zoom';

Modal.setAppElement('#app')

function Default_Expanded (props) {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [expandThumb, setExpandThumb] = useState([])
  const [currExpInd, setCurrExpInd] = useState(0)
  // const [height, setHeight] = useState()
  // const [weight, setWeight] = useState()
  const [zoom, setZoom] = useState(false)
  const [bgPosition, setBgPosition] = useState('0% 0%')

  var img = document.getElementsByClassName('test3');
  var width = img.clientWidth;
  var height = img.clientHeight;
  console.log(img.clientWidth)

  useEffect(() => {
    setCurrExpInd(props.index)
  }, [props.index])

  useEffect(() => {
    var result = []
    if (Object.keys(props.style).length > 0) {
      props.style.photos.map(item => {
      result.push(item)
      setExpandThumb(result)
      })
    }
  }, [props.style])

  const clickForward = () => {
    if (currExpInd === expandThumb.length - 1) {
      props.setIndex(0)
    } else {
      let newInd = currExpInd + 1
      props.setIndex(newInd)
      props.setDefault(expandThumb[newInd].url)
    }
  }

  const clickBackward = () => {
    if (currExpInd === 0) {
      let newInd = expandThumb.length - 1
      props.setIndex(newInd)
    } else {
      let newInd = currExpInd - 1
      props.setIndex(newInd)
      props.setDefault(expandThumb[newInd].url)
    }
  }

  const between = (target, min, max) => {
    return target >= min && target <= max;
  }

  const checkThumbnailImg = (ind) => {
    if (currExpInd + 6 < props.style.photos.length) {
      return (between(ind, currExpInd, currExpInd + 6))
    } else {
      var differenceMin = Math.abs(currExpInd + 7 - props.style.photos.length)
      if (between(ind, currExpInd - differenceMin, props.style.photos.length)) {
        return true
      } else {
        return (between(ind, currExpInd, props.style.photos.length))
      }
    }
  }

  const arrangeThumb = (index) => {
    if (checkThumbnailImg(index)) {
      if (index === currExpInd) {
        return "thumbnail-img-main"
      } else {
        return "thumbnail-img"
      }
    } else {
      return "thumbnail-img-main-hidden"
    }
  }

  const clickThumbnail = (ind, newPhoto) => {
    props.setIndex(ind)
    props.setDefault(newPhoto)
  }

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.pageX - left) / width
    const y = (e.pageY - top) / height
    setBgPosition(`${offsetX}% ${offsetY}%`)
    console.log( e.clientX, e.pageX)
  }

  return (
    <div>
      {props.default !== undefined ?
      <img className="defaultStyle-img" src={props.default} onClick={() => setIsOpen(!modalIsOpen)}></img>
      : null }

      {expandThumb.length > 0 ? <Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(!modalIsOpen)} preventScroll={true} >
        {zoom ? null : <div className="test1">
          <i className="leftArrow" onClick={() => clickBackward()}></i>
          {expandThumb.map((item, index) => (
            <img key={index} className={arrangeThumb(index)} src={item.thumbnail_url} onClick={() => clickThumbnail(index, item.url)}></img>
          ))}
          <i className="rightArrow" onClick={() => clickForward()}></i>
          </div>}
        <div className="test" >
            <img src={expandThumb[props.index].url} onClick={() => setZoom(!zoom)} onLoad={(e) => console.log(e.clientX)}></img>
        </div>
        {/* {const props = {width: 400, height: 250, scale: {100%}, }} */}
          {/* <ReactImageZoom {... {img: expandThumb[props.index].url, zoomPosition: 'original'}} /> */}
        {/* <Magnifier className="expanded-img" imageSrc={expandThumb[props.index].url} dragToMove={false} cursorStyleActive="crosshair" cursorStyle="crosshair" onZoomStart={() => setZoom(!zoom)} onZoomEnd={() => setZoom(!zoom)} /> */}
      </Modal> : null }
    </div>
  )
}

export default Default_Expanded


{/* <Magnifier className="expanded-img" imageSrc={expandThumb[props.index].url} dragToMove={false} cursorStyleActive="crosshair" cursorStyle="crosshair" onZoomStart={() => setZoom(!zoom)} onZoomEnd={() => setZoom(!zoom)}  /> */}

{/* <img className={zoom ? "expanded-img-zoom" : "expanded-img"} src={expandThumb[props.index].url} onClick={() => setZoom(!zoom)}></img> */}