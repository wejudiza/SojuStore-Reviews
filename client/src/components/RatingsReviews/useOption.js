import { useState } from 'react';

export default function useOption(initialValues) {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    (e) => {
      console.log(values);
      setValues({
        ...values,
        [e.target.name]: Number(e.target.value)
      })
  }
  ]
}