import { useState } from 'react';

export default function useFilter(initialValues) {
  const [values, setValues] = useState(initialValues);
  return [
    values,
    (e) => {
      let newVals = values.size === 5 ? new Set(e) : new Set(values.add(e));
      setValues(newVals);
    }
      // console.log('values in', values);
      // console.log(new Set(e));
  ];
}
