import {useState} from 'react';

// type useFormType = [UserType, (target: any) => void, () => void]

export const useForm = (initialState: any) => {
  const [values, setValues] = useState(initialState);

  const handleChange = ({target}: any) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };
  const reset = () => {
    setValues(initialState);
  };
  return [values, handleChange, reset];
};
