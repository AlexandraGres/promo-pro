import authReducer, {
  User,
  resetUser,
  setDisplayName,
  setPhotoURL,
  setUser,
} from './authSlice';

describe('authSlice', () => {
  const sampleUser: User = {
    uid: '123',
    email: 'test@example.com',
    displayName: 'Test User',
    photoURL: 'http://example.com/photo.jpg',
  };

  it('should return the initial state', () => {
    const initialState = { user: null };
    expect(authReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should set the user', () => {
    const action = setUser(sampleUser);
    const state = authReducer(undefined, action);
    expect(state.user).toEqual(sampleUser);
  });

  it('should update the displayName when setDisplayName is called', () => {
    const initialState = { user: sampleUser };
    const action = setDisplayName('New Name');
    const state = authReducer(initialState, action);
    expect(state.user?.displayName).toBe('New Name');
  });

  it('should not update the displayName if user is null', () => {
    const initialState = { user: null };
    const action = setDisplayName('New Name');
    const state = authReducer(initialState, action);
    expect(state.user).toBeNull();
  });

  it('should update the photoURL when setPhotoURL is called', () => {
    const initialState = { user: sampleUser };
    const action = setPhotoURL('http://newphoto.com/photo.jpg');
    const state = authReducer(initialState, action);
    expect(state.user?.photoURL).toBe('http://newphoto.com/photo.jpg');
  });

  it('should not update the photoURL if user is null', () => {
    const initialState = { user: null };
    const action = setPhotoURL('http://newphoto.com/photo.jpg');
    const state = authReducer(initialState, action);
    expect(state.user).toBeNull();
  });

  it('should reset the user to null when resetUser is called', () => {
    const initialState = { user: sampleUser };
    const action = resetUser();
    const state = authReducer(initialState, action);
    expect(state.user).toBeNull();
  });
});
