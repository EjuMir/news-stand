import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "./firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthFirebase = createContext(null);

const Firebase = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app)
    const googleProvider = new GoogleAuthProvider();
    const userToken = useAxiosPublic();

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

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                userToken.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('token', res.data.token);
                            setLoading(false);
                        }
                    })
            }
            else {
                localStorage.removeItem('token');
                setLoading(false);
            }

        });
        return () => {
            return unSubscribe();
        }
    }, [auth, userToken])

    const authInfo = { user, setUser, createUser, loginUser, googleUser, logOut, updateUserProfile, loading }
    return (
        <AuthFirebase.Provider value={authInfo}>
            {children}
        </AuthFirebase.Provider>
    );
};

export default Firebase;