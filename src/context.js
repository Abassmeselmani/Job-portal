import React, { createContext, useContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { GoogleAuthProvider , signInWithPopup } from "firebase/auth";

// Create authentication context
export const AuthContext = createContext();
const provider = new GoogleAuthProvider();

// Authentication provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
 
  // Handle user login
  const login = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
    } catch (error) {
      throw error; // Let the component using login handle the error
    }
  };

  // Handle user logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log('User signed in with Google:', user);
        setUser(user);  // Update the state with the user
      })
      .catch((error) => {
        console.error('Error signing in with Google:', error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout,signInWithGoogle, loading }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
