import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth, firestore, storage } from '../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { setDisplayName, setPhotoURL } from '../store/auth/authSlice';

import { showNotification } from '../store/notification/notificationSlice';
import { useDispatch } from 'react-redux';

interface User {
  firstName?: string;
  lastName?: string;
  age?: string;
  photoURL?: string;
}

const useEditProfile = () => {
  const dispatch = useDispatch();

  const updateUserInfo = async (uid: string, userInfo: User) => {
    try {
      const docRef = doc(firestore, 'users', uid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data() as User;

      const updatedUser = {
        ...userData,
        firstName: userInfo.firstName || userData.firstName,
        lastName: userInfo.lastName || userData.lastName,
        age: userInfo.age?.toString() || userData.age || null,
      };

      await updateDoc(docRef, updatedUser);

      dispatch(setDisplayName(`${updatedUser.firstName} ${updatedUser.lastName}`));

      dispatch(
        showNotification({
          message: 'Your information has been updated successfully.',
          severity: 'success',
        }),
      );

      return true;
    } catch (error) {
      console.error('Error updating user info:', error);

      dispatch(
        showNotification({
          message: 'Failed to update information. Please try again later.',
          severity: 'error',
        }),
      );

      return false;
    }
  };

  const updateUserAvatar = async (uid: string, file: File) => {
    try {
      const storageRef = ref(storage, `users/${file.name}`);
      const uploadResult = await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(uploadResult.ref);
      const userDoc = doc(firestore, 'users', uid);
      await updateDoc(userDoc, { photoURL });

      dispatch(setPhotoURL(photoURL));

      dispatch(
        showNotification({
          message: 'Your avatar has been updated successfully.',
          severity: 'success',
        }),
      );

      return true;
    } catch (error) {
      console.error('Error updating avatar:', error);

      dispatch(
        showNotification({
          message: 'Failed to update avatar. Please try again later.',
          severity: 'error',
        }),
      );

      return false;
    }
  };

  const changeUserPassword = async (oldPassword: string, newPassword: string) => {
    try {
      const user = auth.currentUser;

      if (user && user.email) {
        const credential = EmailAuthProvider.credential(user.email, oldPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        dispatch(
          showNotification({
            message: 'Your password has been updated successfully.',
            severity: 'success',
          }),
        );
        return true;
      }
    } catch (error) {
      dispatch(
        showNotification({
          message: error.message,
          severity: 'error',
        }),
      );
      return false;
    }
  };

  return {
    updateUserInfo,
    updateUserAvatar,
    changeUserPassword,
  };
};

export default useEditProfile;
