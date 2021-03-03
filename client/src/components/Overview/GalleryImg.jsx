import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GalleryImg(props) {

  const handleClickImg = (url) => {
    props.setDefaultPhoto(url)
  }

  return (
    <div>
      {console.log(props.default)}
      {Object.keys(props.default).length > 0 ? props.default.photos.map((item, index) => (
        <img className="default-thumbnail" key={index} src={item.thumbnail_url} onClick={() => handleClickImg(item.url)}></img>
      )) : null }
    </div>
  )
}

export default GalleryImg