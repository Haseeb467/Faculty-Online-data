import { useEffect, useState } from "react";
import { auth, txtDB } from "@/firebasedbconfig/dbconfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { collection, query, where, getDocs } from "firebase/firestore";

interface AdminInfo {
    name: string;
    email: string;
}

const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState<AdminInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch admin data based on the email
    const fetchAdminData = async (email: string) => {
        try {
            const q = query(
                collection(txtDB, "users"), // Replace "users" with your admin collection name
                where("email", "==", email),
                where("role", "==", "admin") // Filter only for admins
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                const adminData = doc.data();
                return {
                    name: adminData.name || "No Name Provided",
                    email: adminData.email,
                };
            } else {
                console.warn(`No admin found with email: ${email}`);
                return null;
            }
        } catch (error) {
            console.error("Error fetching admin data:", error);
            return null;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const email = currentUser.email;
                if (email) {
                    const adminData = await fetchAdminData(email);
                    setAdmin(adminData || null);
                }
            } else {
                setAdmin(null);
                navigate("/");
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
            console.error("Error logging out:", error);
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
                    <p className="font-semibold">{admin?.name || "Admin"}</p>
                    <p className="text-sm text-gray-600">{admin?.email || "No Email"}</p>
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

export default NavBar;
