import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "./firebase.config";
// import axios from "axios";

export const AuthFirebase = createContext(null);

const Firebase = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app)
    const googleProvider = new GoogleAuthProvider();

    const googleUser = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
         
        });
        return () => {
            unSubscribe();

        }
    }, [auth])

    const authInfo = { user, setUser, createUser, loginUser, googleUser, logOut, loading }
    return (
        <AuthFirebase.Provider value={authInfo}>
            {children}
        </AuthFirebase.Provider>
    );
};

export default Firebase;