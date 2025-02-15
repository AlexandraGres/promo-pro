import './FileUpload.scss';

import { Box, Typography } from '@mui/material';
import { ChangeEvent, DragEvent, FC, useCallback } from 'react';
import { useField, useFormikContext } from 'formik';

const ACCEPTED_FILE_TYPES = 'image/jpeg, image/png';

const FileUpload: FC<{ file: File | null }> = ({ file }) => {
  const formikProps = useFormikContext();
  const [, { error }] = useField('file');

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const file = event.dataTransfer.files[0];
      if (file) {
        formikProps.setFieldValue('file', file);
      }
    },
    [formikProps],
  );

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        formikProps.setFieldValue('file', file);
      }
    },
    [formikProps],
  );

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleClick = () => document.getElementById('file-input')?.click();

  return (
    <Box
      id="drop-zone"
      className="file-upload"
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <img src="/upload.svg" alt="upload icon" />
      <Typography sx={{ fontWeight: 500, fontSize: 13 }}>.JPG .PNG </Typography>
      <Typography sx={{ fontWeight: 500, fontSize: 13, color: '#6F7C8B80' }}>
        You can also upload files by
      </Typography>
      <Typography className="link">clicking here</Typography>
      <span>{file && file.name}</span>
      <input
        id="file-input"
        name="file"
        type="file"
        accept={ACCEPTED_FILE_TYPES}
        onChange={handleFileChange}
      />
      {error && <span className="error-message">{error}</span>}
    </Box>
  );
};

export default FileUpload;
