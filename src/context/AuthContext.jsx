import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut,
    sendPasswordResetEmail,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listen to Firebase Auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser({
                    uid: currentUser.uid,
                    email: currentUser.email,
                    name: currentUser.displayName || currentUser.email.split('@')[0],
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (emailOrUserData, password, rememberMe = true) => {
        if (typeof emailOrUserData === 'object') {
            // Support legacy profile update calls from Settings
            const userData = emailOrUserData;
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: userData.name
                });
                setUser({
                    uid: auth.currentUser.uid,
                    email: auth.currentUser.email,
                    name: userData.name
                });
            }
            return;
        }
        // Set persistence based on rememberMe checkbox
        const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
        await setPersistence(auth, persistence);
        
        return signInWithEmailAndPassword(auth, emailOrUserData, password);
    };

    const register = async (email, password, name) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
            displayName: name
        });
        // State will update via onAuthStateChanged listener
        return userCredential.user;
    };

    const logout = () => {
        return signOut(auth);
    };

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, resetPassword, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);



