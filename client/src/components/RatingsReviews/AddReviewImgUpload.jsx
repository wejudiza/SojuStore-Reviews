import React from 'react';

export default function ImgUpload({ uploads, setUploads }) {
  return (
    <>
      <div className="img-upload-preview">Upload up to 5 image(s) of the product</div>
      <input type="file" accept="image/*" multiple="true" onChange={setUploads} />
      { uploads.map((url, i) => <img className="upload-thumbnail" src={url} alt={i} />) }
    </>
  );
}
