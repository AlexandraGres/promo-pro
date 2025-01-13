import './Input.scss';

import { useField } from 'formik';

interface InputProps {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  description?: string;
}

const Input = ({ label, description, ...props }: InputProps) => {
  const [field, { touched, error }] = useField(props);

  return (
    <div className={touched && error ? 'input error' : 'input'}>
      {label && <label>{label}</label>}
      <input {...field} {...props} />
      {touched && error && <span className='error-message'>{error}</span>}
      {description && <span>{description}</span>}
    </div>
  );
};

export default Input;
