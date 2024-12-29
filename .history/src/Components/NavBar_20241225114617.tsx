import { useEffect, useState } from "react";
import { auth, txtDB } from "@/firebasedbconfig/dbconfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {  collection, query, where, getDocs, } from "firebase/firestore";

interface UserInfo {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    name: string;
}

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user && !isLoading) {
                navigate("/");
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [navigate, isLoading]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return children;
};

const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTeacherData = async (email: string) => {
        try {
            const q = query(
                collection(txtDB, "users"),
                where("email", "==", email)
            );  
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0]; 
                const teacherData = doc.data();
                return {
                    name: teacherData.name || "No Name Provided",
                    photoURL: teacherData.image || null,
                };
            } else {
                console.warn(`No teacher found with email: ${email}`);
                return null;
            }
        } catch (error) {
            console.error("Error fetching teacher data:", error);
            return null;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                console.log("Auth state changed:", currentUser);
                const email = currentUser.email;

                if (email) {
                const teacherData = await fetchTeacherData(email);
                console.log("Fetched teacher data:", teacherData);                
                setUser({
                    displayName: teacherData?.name || currentUser.displayName,
                    email: email,
                    photoURL: teacherData?.photoURL || currentUser.photoURL,
                    name: teacherData?.name
                });}
            } else {
                setUser(null);
                if (!isLoading) {
                    navigate("/");
                }
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleLogOut = async () => {
        try {
            await signOut(auth); 
            toast.success("Logged Out Successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error logging out: ", error);
            alert("Failed to log out. Please try again.");
            toast.error("Failed to log out. Please try again.");
        }
    };
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-slate-200 w-full rounded-lg flex items-center justify-between p-4">
            <div>
                <h1 className="text-2xl font-bold">Faculty Management System</h1>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-right">
                    <p className="font-semibold">
                        {user?.name || user?.displayName || "Guest User"}
                        {console.log(object)}
                    </p>
                    <p className="text-sm text-gray-600">
                        {user?.email || "No Email"}
                    </p>
                </div>

                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300">
                    {user?.photoURL ? (
                        <img
                            src={user.photoURL}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                            {(user?.name || user?.displayName)?.[0]?.toUpperCase() || "G"}
                        </div>
                    )}
                </div>
                <button
                    onClick={handleLogOut}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export { ProtectedRoute };
export default NavBar;
