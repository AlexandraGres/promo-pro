import { Box, Button, CircularProgress, MenuItem, Select, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
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

export const initialValues: ArticleProps = {
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

const categories = [
    { id: 1, title: 'Productivity' },
    { id: 2, title: 'Media' },
    { id: 3, title: 'Business' },
    { id: 4, title: 'Technology' },
];

const ArticleForm = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const { saveArticle, fetchArticleById, loading } = useArticleManagement();
    const [articleData, setArticleData] = useState<ArticleProps | null>(null);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const article = await fetchArticleById(id);
                if (article) {
                    setArticleData(article);
                }
            };
            fetchData();
        }
    }, [id, fetchArticleById]);

    const handleSubmit = async (values: ArticleProps) => {
        if (user) {
            await saveArticle(id, values, user);
            navigate('/');
        }
    };

    return (
        <>
            {loading ? (
                <CircularProgress />
            ) : (
                <Box sx={{ maxWidth: 534, mx: 'auto', my: 6, p: 4 }} className="box">
                    <h3 className="form-title">{id ? 'Edit Article' : 'Add New Article'}</h3>
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
                                >
                                    {categories.map(({ id, title }) => (
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
                                        sx={{
                                            fontSize: 14,
                                            py: 1,
                                            px: 5,
                                            mr: 3,
                                        }}
                                        onClick={() => navigate('/')}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        sx={{
                                            fontSize: 14,
                                            py: 1,
                                            px: 5,
                                        }}
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting || !isValid}
                                        disableElevation
                                    >
                                        Publish
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            )}
        </>
    );
};

export default ArticleForm;
