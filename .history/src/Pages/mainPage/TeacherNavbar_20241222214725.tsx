import { Link } from "react-router-dom"
import { onAuthStateChanged, signOut, } from "firebase/auth";
import { auth, txtDB } from "@/firebasedbconfig/dbconfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getDocs, where } from "firebase/firestore";
import { collection, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import '@/App.css';
import '@/index.css';

interface UserInfo {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    name: string;
}

const TeacherNavbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTeacherData = async (email: string) => {
        try {
            const q = query(
                collection(txtDB, "teacherdatafromadmin"),
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

                    });
                }

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
            await signOut(auth); // Firebase sign-out method
            // alert("Logged Out Successfully!");
            toast.success("Logged Out Successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error logging out: ", error);
            alert("Failed to log out. Please try again.");
            toast.error("Failed to log out. Please try again.");
        }
    };


    return (

        <div className='w-full mx-1'>
            <div className="bg-slate-200 fixed top-0 left-0 z-50 shadow-gray-600 shadow-md  w-full rounded-lg flex items-center justify-between" >
                <div className="px-5 py-5 font-semibold text-2xl">
                    <h1>Faculty Information System</h1>
                </div>
                <div>
                    <ul className="flex gap-3">
                        <li className="px-3 py-6">
                            <Link to="/teacher">
                                Home
                            </Link>
                        </li>
                        <li className="px-3 py-6">
                            <Link to={`/TeacherEdit/${user?.email || "defaultEmail"}`}>
                                Edit Profile
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="px-3 profile-section flex items-center gap-8">
                    <div className="profile-info text-right">
                        <p className="font-semibold">
                            {user?.name || user?.displayName || "No Teacher Name"}
                        </p>
                        <p className="text-sm text-gray-600">
                            {user?.email || "No Email"}
                        </p>
                    </div>

                    {/* Profile Picture (Placeholder) */}
                    <div className="profile-pic w-10 h-10 rounded-full bg-gray-300">
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                {(user?.name || user?.displayName)?.[0]?.toUpperCase() || "N"}
                            </div>
                        )}
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogOut}
                        className="text-red-500 text-sm font-medium"
                    >
                        Logout
                    </button>
                </div>

            </div>

        </div>

    )
}

export default TeacherNavbar