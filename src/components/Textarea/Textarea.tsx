import './Textarea.scss';

import { useField } from 'formik';

interface TextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
}

const Textarea = ({ label, ...props }: TextareaProps) => {
  const [field, { touched, error }] = useField(props);

  return (
    <div className={touched && error ? 'textarea error' : 'textarea'}>
      {label && <label>{label}</label>}
      <textarea {...field} {...props} />
      {touched && error && <span className='error-message'>{error}</span>}
    </div>
  );
};

export default Textarea;
