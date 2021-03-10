import React from 'react';

export default function ImgUpload({ urls, setUrls }) {
  return (
    <>
      <div id="img-upload-container">
        <h4>Upload up to 5 image(s) of the product</h4>
        <input className="img-upload" type="file" accept="image/*" multiple="true" onChange={setUrls} />
      </div>
      <br />
      <div id="preview-container">
        { urls.map((url, i) => <img className="photo-thumbnail" src={url} alt={i} />) }
      </div>
    </>
  );
}
