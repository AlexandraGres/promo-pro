import { Box, Button, CircularProgress } from '@mui/material';
import Sorting, { SortOrder } from '../../components/Sorting/Sorting';

import AddIcon from '@mui/icons-material/Add';
import Article from '../../components/Article/Article';
import Filter from '../../components/Filter/Filter';
import { RootState } from '../../store/store';
import WeatherWidget from '../../components/WeatherWidget/WeatherWidget';
import useArticleManagement from '../../hooks/useArticleManagement';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const ArticleList = () => {
  const { loading } = useArticleManagement();
  const { articles, searchQuery } = useSelector((state: RootState) => state.articles);

  const [filter, setFilter] = useState<string>('All Categories');
  const [sortOrder, setSortOrder] = useState<SortOrder>('Newest');
  const navigate = useNavigate();

  const filteredArticles = articles
    ? articles.filter((article) => {
        const matchesCategory = filter === 'All Categories' ? true : article.category === filter;
        const matchesSearchQuery = article.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearchQuery;
      })
    : [];

  const sortedArticles =
    sortOrder === 'Newest'
      ? filteredArticles
      : filteredArticles.sort((a, b) => {
          const comparison = a.title.localeCompare(b.title);
          return sortOrder === 'Ascending' ? comparison : -comparison;
        });

  const handleClick = () => {
    navigate('/add-article');
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      sx={{ flexDirection: { xs: 'column-reverse', lg: 'row' } }}
    >
      <Box sx={{ px: 4, py: 3, maxWidth: 840 }}>
        <Box
          display="flex"
          alignItems="center"
          sx={{ mb: 2, flexDirection: { xs: 'column', sm: 'row' } }}
        >
          <h2>Articles Dashboard</h2>
          <Filter setFilter={setFilter} />
          <Sorting setSortOrder={setSortOrder} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: 4,
            justifyContent: 'center',
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            sortedArticles.map(
              ({
                id,
                title,
                text,
                category,
                coverPhotoUrl,
                createdAt,
                author,
                profilePicUrl,
                uid,
              }) => (
                <Article
                  key={id}
                  id={id}
                  title={title}
                  text={text}
                  category={category}
                  coverPhotoUrl={coverPhotoUrl}
                  createdAt={createdAt}
                  author={author}
                  profilePicUrl={profilePicUrl}
                  file={null}
                  uid={uid}
                />
              ),
            )
          )}
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" sx={{ pr: 4, py: 3, minWidth: { sm: '320px' } }}>
        <Button
          sx={{
            fontSize: 16,
            py: 1,
            px: 4,
            ml: 'auto',
          }}
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClick}
          disableElevation
        >
          Add Article
        </Button>
        <WeatherWidget />
      </Box>
    </Box>
  );
};

export default ArticleList;
