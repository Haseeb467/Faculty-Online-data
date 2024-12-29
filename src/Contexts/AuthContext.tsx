import { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '../firebasedbconfig/dbconfig';

type AuthContextType = {
    currentUser: User | null,
    role: string | null,
    setRole: (role: string) => void;
    setUserRole: (role: string) => void;
};
export const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    role: null,
    setRole: () => { },
    setUserRole: (role: string) => { role },
});

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }: { children: ReactNode }) => {
    const [role, setRole] = useState("Teacher");
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const auth = getAuth(app);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        })
        return unSubscribe;
    }, [auth])

    const value = {
        currentUser,
        role,
        setRole,
        setUserRole: (role: string) => { setRole(role); },
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;