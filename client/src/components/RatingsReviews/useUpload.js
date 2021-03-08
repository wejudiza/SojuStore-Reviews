import { useState } from 'react';

export default function use(initialValues) {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    (e) => {
      if (Object.values(e.target.files).length > 5) {
        alert('You may only upload up to 5 images');
        return null;
      }
      let urls = Object.values(e.target.files).map((img) => URL.createObjectURL(img));
      setValues(urls);
    }
  ];
}
