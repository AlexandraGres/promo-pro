import './Article.scss';

import { Box, CardActions, Link, Menu, MenuItem } from '@mui/material';
import { MouseEvent, useState } from 'react';

import { ArticleProps } from '../ArticleForm/ArticleForm';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { RootState } from '../../store/store';
import Typography from '@mui/material/Typography';
import useArticleManagement from '../../hooks/useArticleManagement';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ITEM_HEIGHT = 40;
const MAX_TEXT_LENGTH = 100;

const Article = ({
  id,
  title,
  text,
  category,
  coverPhotoUrl,
  createdAt,
  author,
  profilePicUrl,
  uid,
}: ArticleProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { deleteArticle } = useArticleManagement();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const isAuthor = user ? uid === user.uid : false;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (id: string) => await deleteArticle(id);

  const handleEdit = (id: string) => navigate(`/edit-article/${id}`);

  const handleToggleText = () => {
    setIsExpanded((prev) => !prev);
  };

  const truncatedText =
    text.length > MAX_TEXT_LENGTH && !isExpanded
      ? text.substring(0, MAX_TEXT_LENGTH) + '...'
      : text;

  return (
    <Card
      sx={{ maxWidth: 372, width: '100%', borderRadius: '6px' }}
      className='article'
    >
      <CardMedia
        component='img'
        height='168'
        image={coverPhotoUrl || 'post-img.png'}
        alt='post image'
      />
      {isAuthor ? (
        <div>
          <IconButton
            aria-label='more'
            id='long-button'
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleClick}
            className='menu'
          >
            <MoreHorizIcon sx={{ color: 'white' }} />
          </IconButton>

          <Menu
            id='long-menu'
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              },
            }}
          >
            <MenuItem key='edit' onClick={() => handleEdit(id)}>
              Edit
            </MenuItem>
            <MenuItem key='delete' onClick={() => handleDelete(id)}>
              Delete
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <></>
      )}

      <CardContent sx={{ px: 3 }}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <span className='tag'>{category}</span>
          <span className='date'>{createdAt}</span>
        </Box>

        <Typography variant='h3' className='title'>
          {title}
        </Typography>

        <Typography variant='body2' className='text'>
          {truncatedText}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', px: 3, marginTop: 'auto' }}>
        <Avatar src={profilePicUrl} sx={{ height: 32, width: 32 }} />
        <span className='name'>{author}</span>
        {text.length > MAX_TEXT_LENGTH && (
          <Link className='read-more' onClick={handleToggleText}>
            {isExpanded ? 'Show less ←' : 'Read more →'}
          </Link>
        )}
      </CardActions>
    </Card>
  );
};

export default Article;
