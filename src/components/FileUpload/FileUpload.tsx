import './FileUpload.scss';

import { Box, Typography } from '@mui/material';
import { ChangeEvent, DragEvent } from 'react';
import { useField, useFormikContext } from 'formik';

const FileUpload = ({ file }: { file: File | null }) => {
  const formikProps = useFormikContext();
  const [, { error }] = useField('file');

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    if (file) {
      formikProps.setFieldValue('file', file);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      formikProps.setFieldValue('file', file);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleClick = () => document.getElementById('file-input')?.click();

  return (
    <Box
      id='drop-zone'
      className='file-upload'
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <img src='/upload.svg' alt='upload icon' />
      <Typography sx={{ fontWeight: 500, fontSize: 13 }}>.JPG .PNG </Typography>
      <Typography sx={{ fontWeight: 500, fontSize: 13, color: '#6F7C8B80' }}>
        You can also upload files by
      </Typography>
      <Typography className='link'>clicking here</Typography>
      <span>{file && file.name}</span>
      <input
        id='file-input'
        name='file'
        type='file'
        accept='image/jpeg,image/png'
        onChange={handleFileChange}
      />
      {error && <span className='error-message'>{error}</span>}
    </Box>
  );
};

export default FileUpload;
