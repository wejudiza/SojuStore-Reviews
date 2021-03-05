import React from 'react';

export default function ImgUpload({ urls, setUrls }) {
  return (
    <>
      <div className="img-upload-preview">Upload up to 5 image(s) of the product</div>
      { urls.map((url, i) => <img className="upload-thumbnail" src={url} alt={i} />) }
      <br />
      <input type="file" accept="image/*" multiple="true" onChange={setUrls} />
    </>
  );
}
