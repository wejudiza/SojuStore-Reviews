import { useState } from 'react';

export default function useTextInput(initialVals) {
  const [values, setValues] = useState(initialVals);

  return [
    values,
    (e) => setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  ];
}
