import './Article.scss';

import { Box, CardActions, Link, Menu, MenuItem } from '@mui/material';
import { FC, MouseEvent, useState } from 'react';

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
import { useOnlineStatus } from '../Providers/OnlineStatusProvider';
import { useSelector } from 'react-redux';

const ITEM_HEIGHT = 40;
const MAX_TEXT_LENGTH = 100;
const DEFAULT_IMAGE_URL = 'post-img.png';

const Article: FC<ArticleProps> = ({
  id,
  title,
  text,
  category,
  coverPhotoUrl,
  createdAt,
  author,
  profilePicUrl,
  uid,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { deleteArticle } = useArticleManagement();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const isAuthor = user?.uid === uid;
  const isOnline = useOnlineStatus();
  const imageUrl = isOnline ? coverPhotoUrl || DEFAULT_IMAGE_URL : DEFAULT_IMAGE_URL;

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleDelete = async () => await deleteArticle(id);
  const handleEdit = () => navigate(`/edit-article/${id}`);
  const toggleTextExpansion = () => setIsExpanded((prev) => !prev);

  const truncatedText =
    text.length > MAX_TEXT_LENGTH && !isExpanded
      ? text.substring(0, MAX_TEXT_LENGTH) + '...'
      : text;

  return (
    <Card sx={{ maxWidth: 372, width: '100%', borderRadius: '6px' }} className="article">
      <CardMedia component="img" height="168" image={imageUrl} alt="post image" />
      {isAuthor && (
        <div>
          <IconButton
            id="long-button"
            onClick={handleMenuOpen}
            className="menu"
            data-cy="menu-button"
          >
            <MoreHorizIcon sx={{ color: 'white' }} />
          </IconButton>

          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            slotProps={{
              paper: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 160,
                },
              },
            }}
          >
            <MenuItem data-cy="edit-button" onClick={() => handleEdit()}>
              Edit
            </MenuItem>
            <MenuItem data-cy="delete-button" onClick={() => handleDelete()}>
              Delete
            </MenuItem>
          </Menu>
        </div>
      )}

      <CardContent sx={{ px: 3 }}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <span className="tag">{category}</span>
          <span className="date">{createdAt}</span>
        </Box>

        <Typography variant="h3" className="title">
          {title}
        </Typography>

        <Typography variant="body2" className="text">
          {truncatedText}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', px: 3, marginTop: 'auto' }}>
        <Avatar src={profilePicUrl} sx={{ height: 32, width: 32 }} />
        <span className="name">{author}</span>
        {text.length > MAX_TEXT_LENGTH && (
          <Link className="read-more" onClick={toggleTextExpansion}>
            {isExpanded ? 'Show less ←' : 'Read more →'}
          </Link>
        )}
      </CardActions>
    </Card>
  );
};

export default Article;
