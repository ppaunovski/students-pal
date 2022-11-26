import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(name, surname, username, email, password) {
    const createUser = async (name, surname, username, email) => {
      await setDoc(doc(db, "users", `${email}`), {
        name: name,
        surname: surname,
        username: username,
        email: email,
        ppurl:
          "https://firebasestorage.googleapis.com/v0/b/social-app-6644b.appspot.com/o/Profile%20pictures%2Fdefault%2Favatar.jpeg?alt=media&token=e8e4f091-46c3-4f1a-a7da-6dbb2d32f829",
        isOnline: true,
        likedPosts: [],
      });
      await setDoc(doc(db, "onlineUsers", `${email}`), {
        isOnline: true,
      });
    };
    createUser(name, surname, username, email);
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout(email) {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
