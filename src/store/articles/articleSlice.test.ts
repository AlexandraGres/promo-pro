import articleReducer, {
  setArticles,
  setSearchQuery,
  updateArticles,
} from './articleSlice';

import { ArticleProps } from '../../components/ArticleForm/ArticleForm';

const mockArticles: ArticleProps[] = [
  {
    id: '1',
    title: 'Article 1',
    text: 'This is article 1 text',
    category: 'Tech',
    coverPhotoUrl: 'http://example.com/photo1.jpg',
    file: null,
    createdAt: '2025-01-01T12:00:00Z',
    updatedAt: '2025-01-02T12:00:00Z',
    author: 'Author 1',
    profilePicUrl: 'http://example.com/author1.jpg',
    uid: 'user1',
  },
  {
    id: '2',
    title: 'Article 2',
    text: 'This is article 2 text',
    category: 'Health',
    coverPhotoUrl: 'http://example.com/photo2.jpg',
    file: null,
    createdAt: '2025-01-03T12:00:00Z',
    updatedAt: '2025-01-04T12:00:00Z',
    author: 'Author 2',
    profilePicUrl: 'http://example.com/author2.jpg',
    uid: 'user2',
  },
  {
    id: '3',
    title: 'Article 3',
    text: 'This is article 3 text',
    category: 'Science',
    coverPhotoUrl: 'http://example.com/photo3.jpg',
    file: null,
    createdAt: '2025-01-05T12:00:00Z',
    updatedAt: undefined,
    author: 'Author 3',
    profilePicUrl: 'http://example.com/author3.jpg',
    uid: 'user3',
  },
];

describe('articleSlice', () => {
  const initialState = {
    articles: null,
    searchQuery: '',
  };

  it('should return the initial state', () => {
    expect(articleReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setArticles', () => {
    const nextState = articleReducer(initialState, setArticles(mockArticles));

    expect(nextState).toEqual({
      articles: mockArticles,
      searchQuery: '',
    });
  });

  it('should handle updateArticles', () => {
    const currentState = {
      articles: mockArticles,
      searchQuery: '',
    };

    const result = mockArticles.filter((article) => article.id !== '2');

    const nextState = articleReducer(currentState, updateArticles('2'));

    expect(nextState).toEqual({ articles: result, searchQuery: '' });
  });

  it('should handle setSearchQuery', () => {
    const nextState = articleReducer(initialState, setSearchQuery('Tech'));

    expect(nextState).toEqual({
      articles: null,
      searchQuery: 'Tech',
    });
  });
});
