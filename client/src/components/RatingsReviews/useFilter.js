import { useState } from 'react';

export default function useFilter(initialValues) {
  const [values, setValues] = useState(initialValues);
  return [
    values,
    (e) => {
      values[e] = !values[e];
      setValues({ ...values });
    }
  ];
}
