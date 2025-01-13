import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

interface AuthState {
  user: null | User;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setDisplayName: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.displayName = action.payload;
      }
    },
    setPhotoURL: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.photoURL = action.payload;
      }
    },
    resetUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, setDisplayName, setPhotoURL, resetUser } =
  authSlice.actions;

export default authSlice.reducer;
