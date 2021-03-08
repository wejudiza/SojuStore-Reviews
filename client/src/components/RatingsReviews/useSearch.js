import { useState } from 'react';

export default function useSearch(initialValues) {
  const [values, setValues] = useState(initialValues);

  return [
    values;
    (e) => {
      setValues({ text: e.target.value, count: e.target.lenght })
    }
  ]
}
