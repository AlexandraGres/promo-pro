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
  const [field, meta] = useField(props);

  return (
    <div className={meta.touched && meta.error ? 'input error' : 'input'}>
      {label && <label>{label}</label>}
      <input {...field} {...props} />
      {meta.touched && meta.error && <span className="error-message">{meta.error}</span>}
      {description && <span>{description}</span>}
    </div>
  );
};

export default Input;
