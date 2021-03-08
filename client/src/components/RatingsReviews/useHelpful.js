import { useState } from 'react';

export default function useCount(initialValues) {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    (e) => setValues({
      ...values,

    })
  ]