import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app')

function Default_Expanded (props) {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [expandThumb, setExpandThumb] = useState([])
  const [currExpInd, setCurrExpInd] = useState(0)
  const [height, setHeight] = useState()
  const [weight, setWeight] = useState()

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
      var diff = Math.abs(currExpInd + 7 - props.style.photos.length)
      if (between(ind, currExpInd - diff, props.style.photos.length)) {
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

  const zoomIn = () => {
    setHeight(photoHeight * 2.5)
    setWidth(photoWidth * 2.5)
  }

  return (
    <div>
      {props.default !== undefined ? <img className="defaultStyle-img" src={props.default} onClick={() => setIsOpen(!modalIsOpen)}></img> : null }

      {expandThumb.length > 0 ? <Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(!modalIsOpen)}>
        <div>
          <i className="leftArrow" onClick={() => clickBackward()}></i>
          {expandThumb.map((item, index) => (
            <img key={index} className={arrangeThumb(index)} src={item.thumbnail_url} ></img>
          ))}
          <i className="rightArrow" onClick={() => clickForward()}></i>
        </div>
        <img className="expanded-img" src={expandThumb[props.index].url}></img>
      </Modal> : null }
    </div>
  )
}

export default Default_Expanded