import React, { useState, useEffect } from 'react';

export default function ImgUpload() {
  const [images, setImages] = useState([]);

  const handleUpload = (e) => {
    setImages((prev) => prev.concat(URL.createObjectURL(e.target.files[0])));
    console.log(images);
  };

  return (
    <>
      <div className="img-upload-preview">Upload up to 5 image(s) of the product</div>
      <input type="file" accept="image/*" multiple="true" onChange={handleUpload} />
      { images.length === 0 ? null : (
        images.map((url) => <img src={url} className="img-upload-thumbnail" alt={url} />)
      ) }
    </>
  );
}
