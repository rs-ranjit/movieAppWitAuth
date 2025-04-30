import React, {createContext, useContext, useState, useEffect} from 'react';
import auth, {reauthenticateWithRedirect} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

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
    if (user) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, [user]);

  if (initializing) {
    return null;
  }

  const register = async (username, email, password, profileUrl) => {
    console.log(username, password, email, profileUrl);
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
  const setUserData = async (username, email, profile, uid) => {
    try {
      const response = await firestore().collection('Users').doc(uid).set({
        name: username,
        email: email,
        profileUrl: profile,
        uid: uid,
      });

      console.log('User data set successfully', response);

      return {userAddedSuccess: true};
    } catch (e) {
      console.error('Error adding user:', e);

      let msg = e.message || 'An unknown error occurred';
      return {userAddedSuccess: false, msg};
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
      value={{user, authorized, register, setUserData, logout, login}}>
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
