/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-lone-blocks */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-mixed-operators */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

// fix thumbnails button

function Default_Expanded(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [expandThumb, setExpandThumb] = useState([]);
  const [currExpInd, setCurrExpInd] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [bgPosition, setBgPosition] = useState('50% 50%');
  const [bgImage, setImage] = useState('');

  useEffect(() => {
    setCurrExpInd(props.index);
  }, [props.index]);

  useEffect(() => {
    const result = [];
    if (Object.keys(props.style).length > 0) {
      props.style.photos.map((item) => {
        result.push(item);
        setExpandThumb(result);
      });
    }
  }, [props.style]);

  const clickForward = () => {
    if (currExpInd === expandThumb.length - 1) {
      props.setIndex(0);
    } else {
      const newInd = currExpInd + 1;
      props.setIndex(newInd);
      props.setDefault(expandThumb[newInd].url);
    }
  };

  const clickBackward = () => {
    if (currExpInd === 0) {
      const newInd = expandThumb.length - 1;
      props.setIndex(newInd);
    } else {
      const newInd = currExpInd - 1;
      props.setIndex(newInd);
      props.setDefault(expandThumb[newInd].url);
    }
  };

  const between = (target, min, max) => target >= min && target <= max;

  const checkThumbnailImg = (ind) => {
    if (currExpInd + 6 < props.style.photos.length) {
      return (between(ind, currExpInd, currExpInd + 6));
    }
    const differenceMin = Math.abs(currExpInd + 7 - props.style.photos.length);
    if (between(ind, currExpInd - differenceMin, props.style.photos.length)) {
      return true;
    }
    return (between(ind, currExpInd, props.style.photos.length));
  };

  const arrangeThumb = (index) => {
    if (checkThumbnailImg(index)) {
      if (index === currExpInd) {
        return 'thumbnail-img-main';
      }
      return 'thumbnail-img-selected';
    }
    return 'thumbnail-img-main-hidden';
  };

  const clickThumbnail = (ind, newPhoto) => {
    props.setIndex(ind);
    props.setDefault(newPhoto);
  };

  const handleMouseMove = (e) => {
    const {
      // eslint-disable-next-line no-unused-vars
      left, top, width, height,
    } = e.target.getBoundingClientRect();
    const x = e.pageX / width * 100;
    const y = e.pageY / height * 100;
    setBgPosition(`${x}% ${y}%`);
  };

  const defaultImgStyle = (url) => {
    if (url === null) {
      url = 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101032/112815935-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6';
    }
    return {
      backgroundImage: `url(${url})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      width: 'auto',
      height: '100%',
      cursor: 'zoom-in',
      zIndex: '1',
    };
  };

  const customStyles = {
    content: {
      padding: '5px',
    },
  };

  return (
    <div id="default-wrapper">
      {props.default !== undefined
        ? <div style={defaultImgStyle(props.default)} onClick={() => setIsOpen(!modalIsOpen)} />
        : null }

      {expandThumb.length > 0 ? (
        <Modal appElement={document.getElementById('app')} isOpen={modalIsOpen} onRequestClose={() => { setIsOpen(!modalIsOpen); setZoom(false); }} style={customStyles} preventScroll>
          <div id="modalContainer">
            {zoom ? null : (
              <div className="test1">
                <div className="modalThumbnail">
                  <i className="leftArrow" onClick={() => clickBackward()} />
                  {expandThumb.map((item, index) => (
                    <img key={index} className={arrangeThumb(index)} src={item.thumbnail_url} onClick={() => clickThumbnail(index, item.url)} alt="expandthumb"/>
                  ))}
                  <i className="rightArrow" onClick={() => clickForward()} />
                </div>
              </div>
            )}
            {zoom ? (
              <figure onMouseMove={(e) => handleMouseMove(e)} style={{ backgroundImage: bgImage, backgroundPosition: bgPosition }} onClick={() => setZoom(!zoom)} />
            ) : (
              <div className="test">
                <img src={expandThumb[props.index].url} onClick={() => setZoom(!zoom)} onLoad={() => setImage(`url(${expandThumb[props.index].url})`)} style={{ cursor: 'crosshair' }} alt="expandthumb"/>
              </div>
            ) }
          </div>
        </Modal>
      ) : null }
    </div>
  );
}

export default Default_Expanded;

{ /* <img className="defaultStyle-img" src={props.default} onClick={() => setIsOpen(!modalIsOpen)}></img>  */ }
