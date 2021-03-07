import { useState } from 'react';

export default function useFilter(initialValues) {
  const [values, setValues] = useState(initialValues);
  return [
    values,
    (e) => {
      values[e] = !values[e];
      // const check = Object.values(values).every((val) => val === false);
      // if (check) {
      //   setValues({
      //     5: true,
      //     4: true,
      //     3: true,
      //     2: true,
      //     1: true,
      //   });
      // } else {
      setValues({ ...values });
      // }
    }
  ];
}
