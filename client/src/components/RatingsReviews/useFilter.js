import { useState } from 'react';

export default function useFilter(initialValues) {
  const [values, setValues] = useState(initialValues);
  return [
    values,
    (e) => setValues(values.size === 5 ? new Set(e) : new Set(values.add(e)))
  ];
}
