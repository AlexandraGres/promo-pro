import './Input.scss';

import { FC } from 'react';
import { useField } from 'formik';

interface InputProps {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  description?: string;
}

const Input: FC<InputProps> = ({ label, description, ...props }) => {
  const [field, { touched, error }] = useField(props);

  return (
    <div className={touched && error ? 'input error' : 'input'}>
      {label && <label>{label}</label>}
      <input {...field} {...props} />
      {touched && error && <span className="error-message">{error}</span>}
      {description && <span>{description}</span>}
    </div>
  );
};

export default Input;
