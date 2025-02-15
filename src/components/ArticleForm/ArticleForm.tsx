import { Box, Button, CircularProgress, MenuItem, Select, Typography } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

import FileUpload from '../FileUpload/FileUpload';
import Input from '../Input/Input';
import { RootState } from '../../store/store';
import Textarea from '../Textarea/Textarea';
import { articleSchema } from '../../utils/schemas';
import useArticleManagement from '../../hooks/useArticleManagement';
import { useSelector } from 'react-redux';

export interface ArticleProps {
  id: string;
  title: string;
  text: string;
  category: string;
  coverPhotoUrl: string;
  file: File | null;
  createdAt: string;
  updatedAt?: string;
  author: string;
  profilePicUrl: string;
  uid: string;
}

const initialValues: ArticleProps = {
  id: '',
  title: '',
  text: '',
  category: '',
  coverPhotoUrl: '',
  createdAt: '',
  updatedAt: '',
  author: '',
  profilePicUrl: '',
  file: null,
  uid: '',
};

const CATEGORIES = [
  { id: 1, title: 'Productivity' },
  { id: 2, title: 'Media' },
  { id: 3, title: 'Business' },
  { id: 4, title: 'Technology' },
];

const ArticleForm: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const { saveArticle, fetchArticleById, loading } = useArticleManagement();
  const [articleData, setArticleData] = useState<ArticleProps | null>(null);

  const fetchArticle = useCallback(async () => {
    if (id) {
      const article = await fetchArticleById(id);
      if (article) setArticleData(article);
    }
  }, [id, fetchArticleById]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  const handleSubmit = async (values: ArticleProps) => {
    if (!user) return;
    await saveArticle(id, values, user);
    navigate('/');
  };

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ maxWidth: 534, mx: 'auto', my: 6, p: 4 }} className="box">
      <Typography variant="h4" className="form-title" fontSize={21} fontWeight={700}>
        {id ? 'Edit Article' : 'Add New Article'}
      </Typography>
      <hr />
      <Formik
        initialValues={articleData || initialValues}
        enableReinitialize
        validationSchema={articleSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue, isValid }) => (
          <Form>
            <Input name="title" label="Title" type="text" placeholder="Enter your title" />
            <Typography color="secondary" sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
              Category
            </Typography>
            <Select
              sx={{ mb: 3, px: 3, fontSize: 16, width: '100%' }}
              value={values.category}
              onChange={(event) => setFieldValue('category', event.target.value)}
              data-cy="category"
            >
              {CATEGORIES.map(({ id, title }) => (
                <MenuItem key={id} value={title}>
                  {title}
                </MenuItem>
              ))}
            </Select>
            <Textarea name="text" label="Text" placeholder="Enter your text" />
            <h4 className="form-label">Add cover photo</h4>
            <Typography sx={{ fontSize: 13 }}>Drag and drop file below</Typography>
            <FileUpload file={values.file} />
            <Box display="flex" mt={2}>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ fontSize: 14, py: 1, px: 5, mr: 3 }}
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button
                sx={{ fontSize: 14, py: 1, px: 5 }}
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting || !isValid}
                disableElevation
                data-cy="publish-button"
              >
                Publish
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ArticleForm;
