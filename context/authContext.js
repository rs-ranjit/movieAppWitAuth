import React, {createContext, useContext, useState, useEffect} from 'react';
import auth, {confirmPasswordReset} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({children}) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsub = auth().onAuthStateChanged(user => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return unsub;
  }, [initializing]);

  useEffect(() => {
    setAuthorized(!!user);
  }, [user]);

  if (initializing) {
    return null; // Optionally, you can show a loading screen here
  }

  const register = async (username, email, password, profileUrl) => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      return {success: true, uid: response.user?.uid};
    } catch (e) {
      let msg = e.message;
      if (msg.includes('(auth/invalid-email)')) msg = 'Invalid email';
      if (msg.includes('(auth/email-already-in-use)'))
        msg = 'This email is already in use';
      return {success: false, msg};
    }
  };

  const setUserData = async (username, email, profileUrl, uid) => {
    try {
      await firestore()
        .collection('Users')
        .doc(uid)
        .collection('userdata')
        .doc('user_data_doc') // You can use a fixed document ID or generate one
        .set({
          name: username,
          email: email,
          profileUrl: profileUrl,
        });
      console.log('User data set successfully');
      return {userAddedSuccess: true};
    } catch (e) {
      console.error('Error adding user:', e);
      return {
        userAddedSuccess: false,
        msg: e.message || 'An unknown error occurred',
      };
    }
  };

  const setUserSearch = async (id, title, poster_path, vote_average, uid) => {
    if (!id || !title || !poster_path || vote_average == null || !uid) {
      console.warn('Invalid data passed to setUserSearch');
      return {
        userSearchHistory: false,
        msg: 'Missing or undefined movie data',
      };
    }
    try {
      const userSearchRef = firestore()
        .collection('Users')
        .doc(uid)
        .collection('searchHistory')
        .doc(id);

      console.log('This is id 1', id);
      const docSnapshot = await userSearchRef.get();

      // If the document doesn't exist, create it; otherwise, update the existing one
      if (docSnapshot.exists()) {
        await userSearchRef.update({
          count: firestore.FieldValue.increment(1), // Increment the count
          searchDate: firestore.FieldValue.serverTimestamp(),
        });
        console.log('User search history updated successfully');
      } else {
        await userSearchRef.set({
          movieTitle: title,
          count: 1, // Initialize the count
          url: poster_path,
          rating: vote_average,
          searchDate: firestore.FieldValue.serverTimestamp(),
        });
        console.log('User search history created successfully');
      }

      return {userSearchHistory: true};
    } catch (e) {
      console.log('Error while fetching user search history:', e);
      return {
        userSearchHistory: false,
        msg: e.message || 'An unknown error occurred',
      };
    }
  };

  const login = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      return {success: true};
    } catch (e) {
      return {success: false, msg: e.message};
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
      return {success: true};
    } catch (e) {
      return {success: false, msg: e.message};
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authorized,
        register,
        setUserData,
        logout,
        login,
        setUserSearch,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
