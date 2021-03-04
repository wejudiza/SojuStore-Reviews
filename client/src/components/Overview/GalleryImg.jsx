import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GalleryImg(props) {

  const handleClickImg = (url) => {
    props.setDefaultPhoto(url)
  }

  const defaultThumbModel = (array) => {
    var result = [];
    var finalRes = [];

    for (var i = 0; i < array.length; i++) {
      if (result.length === 7) {
        finalRes.push(result)
        result = [];
      } else if (i === array.length - 1) {
        array[i].index = i
        result.push(array[i]);
        finalRes.push(result);
      } else {
        array[i].index = i
        result.push(array[i])
      }
    }

    return finalRes
  }

  return (
    <div>
      {Object.keys(props.default).length > 0 ? defaultThumbModel(props.default.photos).map((item, index) => (
        <div key={index}>
        {item.map((defItem, index) => (
          <img className="default-thumbnail" key={index} src={defItem.thumbnail_url} onClick={() => handleClickImg(defItem.url)}></img>
        ))}
        </div>
      )) : null }
{/*
      props.default.photos.map((item, index) => (
        <img className="default-thumbnail" key={index} src={item.thumbnail_url} onClick={() => handleClickImg(item.url)}></img>
      )) : null } */}
    </div>
  )
}

export default GalleryImg