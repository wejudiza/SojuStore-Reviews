import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Checkmark } from 'react-checkmark';


function StyleSelect (props) {
  // const [styles, setStyles] = useState([])
  // const [thumbnail, setThumbnail] = useState([])
  // const [defaultStyle, setDefaultStyle] = useState({})
  const [thumbClick, setThumbClick] = useState(false)
  // const [defaultPhoto, setDefaultPhoto] = useState('')
  // index is for photo index
  // const [indexPhoto, setIndexPhoto] = useState(0);
  // const [reset, setReset] = useState()

  // useEffect(() => {
  //   if (props.data !== undefined) {
  //     axios.get(`/api/styles/${props.data}`)
  //       .then((results) => setStyles(results.data.results))
  //       .catch((err) => console.error(err))
  //   }
  // }, [props.data])

  // useEffect(() => {
  //   var res = [];
  //   if (props.style !== undefined) {
  //     {props.style.map((item, index) => {
  //       if (item['default?']) {
  //         setDefaultStyle(item)
  //       }
  //       item.photos.map((item, index) => {
  //         if (index === 0) {
  //           res.push(item)
  //           setThumbnail(res)
  //         }
  //       })
  //     })}
  //   }
  // }, [props.style])

  // useEffect(() => {
  //   if (Object.keys(defaultStyle).length > 0) {
  //     setDefaultPhoto(defaultStyle.photos[0].url)
  //   }
  // }, [defaultStyle])

  const thumbnailModel = (array) => {
    var result = [];
    var finalRes = [];

    for (var i = 0; i < array.length; i++) {
      if (result.length === 4) {
        array[i].index = i
        finalRes.push(result)
        result = [];
        result.push(array[i])
      } else if (i === array.length - 1) {
        array[i].index = i
        result.push(array[i]);
        finalRes.push(result);
      } else {
        array[i].index = i
        result.push(array[i]);
      }
    }

    return finalRes;
  }

  const clickThumbnail = (ind, newPhoto) => {
    props.setPhoto(newPhoto)
    var newStyle = props.style[ind]
    props.setDefault(newStyle);
    props.setIndex(0);
    props.setReset(['Select Size']);
  }

  return (
    <div id ="whole-Style">
      {/* <Default_Expanded default={defaultPhoto} setDefault={setDefaultPhoto} style={defaultStyle} index={indexPhoto} setIndex={setIndexPhoto} allStyle={thumbnail} /> */}
      {/* <div id="Style-Select"> */}
        <div className="container">
        <div className="category-rating" style={{margin: '1.5%', display: 'flex', order: '1', alignSelf: 'flex-end'}}>
         Color:&nbsp;<b>{props.defaultStyle.name}</b>
        </div>
      {thumbnailModel(props.thumbnail).map((itemA, index) => (
        <div key={index} style={{justifyContent: 'center', display: 'flex', width: '100%', order: '2', alignSelf: 'flex-end'}}>
        {itemA.map((item, index) => (
          <div key={index} style={{position: 'relative'}}> { props.defaultStyle.photos[0].thumbnail_url === null ? null : props.defaultStyle.photos[0].thumbnail_url === item.thumbnail_url ? <i style={{position: 'absolute', top: '6%', color: 'whitesmoke', backgroundColor: 'darkred', borderRadius: '50% 50%'}} className="fa fa-check" aria-hidden="true"></i> : null}
          <img src={item.thumbnail_url === null ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png' : item.thumbnail_url} className="thumbnail-img" style={props.defaultStyle.photos[0].thumbnail_url === null ? null : props.defaultStyle.photos[0].thumbnail_url === item.thumbnail_url ? {border: '2px solid darkred', boxShadow: '0px 0.5px 0.5px 1.5px darkred'} : null} onClick={() => clickThumbnail(item.index, item.url)}></img>
          </div>
        ))}
        </div>
      ))}
      {props.defaultStyle.sale_price === null ?
      <div style={{margin: '1.5%', fontSize: '19px', width: '100%', display: 'flex', order: '3', justifyContent: 'center', alignSelf: 'flex-end'}}> $ {props.defaultStyle.original_price}
      </div> :
      <div style={{margin: '1.5%', fontSize: '19px', width: '100%', display: 'flex', order: '3', justifyContent: 'center', alignSelf: 'flex-end'}}>
      <b style={{color:'red', weight: '600'}}>${props.defaultStyle.sale_price}</b><strike> $ {props.defaultStyle.original_price} </strike>
      </div> }
      {/* </div> */}
      {/* <GalleryImg default={props.defaultStyle} setDefaultPhoto={setDefaultPhoto} setIndex={setIndexPhoto} index={indexPhoto} />
      <ProductInfo reset={reset} default={props.defaultStyle} /> */}
      </div>
    </div>
  )
}

export default StyleSelect