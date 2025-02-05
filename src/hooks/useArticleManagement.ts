import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { firestore, storage } from '../firebase/firebase';
import { setArticles, updateArticles } from '../store/articles/articleSlice';
import { useCallback, useEffect, useState } from 'react';

import { ArticleProps } from '../components/ArticleForm/ArticleForm';
import { User } from '../store/auth/authSlice';
import { showNotification } from '../store/notification/notificationSlice';
import { timeAgo } from '../utils/timeAgo';
import { useDispatch } from 'react-redux';
import { useOnlineStatus } from '../components/Providers/OnlineStatusProvider';

const getOfflineArticles = () => {
  const data = localStorage.getItem('articles');
  return data ? JSON.parse(data) : null;
};

const useArticleManagement = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const isOnline = useOnlineStatus();

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const articlesCollection = collection(firestore, 'articles');
      const q = query(articlesCollection);
      const querySnapshot = await getDocs(q);

      const articlesList = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          ...data,
          id: doc.id,
          createdAt: timeAgo(data.createdAt),
          updatedAt: timeAgo(data.updatedAt),
        } as ArticleProps;
      });

      localStorage.setItem('articles', JSON.stringify(articlesList));

      dispatch(setArticles(articlesList));
    } catch (error) {
      console.error('Error fetching articles:', error);
      dispatch(
        showNotification({
          message: 'Failed to load articles. Please try again later.',
          severity: 'error',
        })
      );

      dispatch(setArticles(getOfflineArticles()));

      return null;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (isOnline) {
      fetchArticles();
    }
  }, [isOnline, fetchArticles]);

  const saveArticle = async (
    id: string | undefined,
    values: ArticleProps,
    user: User
  ) => {
    if (!navigator.onLine) {
      dispatch(
        showNotification({
          message: 'No internet connection.',
          severity: 'warning',
        })
      );

      return;
    }

    setLoading(true);

    const { category, createdAt, file, title, text } = values;

    let coverPhotoUrl = values.coverPhotoUrl;

    if (file instanceof File) {
      const storageRef = ref(storage, `articles/${file.name}`);
      const uploadResult = await uploadBytes(storageRef, file);
      coverPhotoUrl = await getDownloadURL(uploadResult.ref);
    }

    const articleData = {
      title: title,
      text: text,
      category: category,
      coverPhotoUrl: coverPhotoUrl,
      author: user.displayName,
      createdAt: id ? createdAt : new Date(),
      updatedAt: new Date(),
      profilePicUrl: user.photoURL,
      uid: user.uid,
    };

    try {
      if (id) {
        const docRef = doc(firestore, 'articles', id);
        await updateDoc(docRef, articleData);
      } else {
        const collectionRef = collection(firestore, 'articles');
        await addDoc(collectionRef, articleData);
      }

      dispatch(
        showNotification({
          message: 'Your article has been successfully saved!',
          severity: 'success',
        })
      );
    } catch (error) {
      console.error('Error saving article:', error);
      dispatch(
        showNotification({
          message: 'Failed to save article. Please try again later.',
          severity: 'error',
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id: string) => {
    setLoading(true);
    try {
      const docRef = doc(firestore, 'articles', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const articleData = docSnap.data();
        const coverPhotoUrl = articleData.coverPhotoUrl;

        if (coverPhotoUrl) {
          const storagePath = coverPhotoUrl.split('/o/')[1]?.split('?')[0];
          if (storagePath) {
            const imageRef = ref(storage, decodeURIComponent(storagePath));
            await deleteObject(imageRef);
          }
        }
      }
      await deleteDoc(docRef);

      dispatch(updateArticles(id));

      dispatch(
        showNotification({
          message: 'Your article has been removed successfully.',
          severity: 'success',
        })
      );
    } catch (error) {
      console.error('Error deleting article:', error);
      dispatch(
        showNotification({
          message: 'Failed to delete article. Please try again later.',
          severity: 'error',
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchArticleById = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const docRef = doc(firestore, 'articles', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return docSnap.data() as ArticleProps;
        }
        return null;
      } catch (error) {
        console.error('Error fetching article:', error);
        dispatch(
          showNotification({
            message: 'Failed to load article. Please try again later.',
            severity: 'error',
          })
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  return {
    fetchArticleById,
    fetchArticles,
    deleteArticle,
    loading,
    saveArticle,
  };
};

export default useArticleManagement;
