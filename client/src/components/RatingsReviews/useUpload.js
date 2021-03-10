import { useState } from 'react';
import { storage } from "../QnA/Firebase/index.js"

export default function use(initialValues) {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    (e) => {
      if (Object.values(e.target.files).length > 5) {
        alert('You may only upload up to 5 images');
        return null;
      }

      Object.values(e.target.files).map((img) => {
        const firebaseUpload = storage.ref(`images/${img.name}`).put(img);
        firebaseUpload.on(
          'state_changed',
          snapshot => {},
          error => console.log(error),
          () => storage.ref('images')
            .child(img.name)
            .getDownloadURL()
            .then((url) => setValues([...values, url]))
        );
      });
    }
  ];
}