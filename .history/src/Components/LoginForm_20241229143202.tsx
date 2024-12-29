import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "@/firebasedbconfig/dbconfig";
import { app } from "@/firebasedbconfig/dbconfig";
import "@/App.css";
import "@/index.css";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/Contexts/AuthContext";
import Loader from "./Hourglass";

const LoginForm = () => {
    const navigate = useNavigate();
    const auth = getAuth(app);
    const { setUserRole } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRole(e.target.value);
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            const userDocRef = doc(db, "users", userCred.user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                toast.error("User does not exist!");
                return;
            }

            const userData = userDoc.data();
            const userRole = userData.role.toLowerCase();
            const isactive = userData.isactive;

            if (userRole !== role.toLowerCase()) {
                toast.error("Incorrect role selected. Please select the correct role.");
                return;
            }

            if (!isValidEmail(email)) {
                toast.error("Invalid email format. Please enter a valid email address.");
                return;
            }

            if (!isactive) {
                toast.error("You are not an active user. Please contact the admin.");
                return;
            }

            setUserRole(userRole);

            if (userRole === "admin") {
                navigate("/admin", { replace: true });
                toast.success("Welcome Admin!");
            } else if (userRole === "teacher") {
                navigate("/teacher", { replace: true });
                toast.success("Welcome Teacher!");
            } else {
                toast.error("Invalid role assignment.");
            }
        } catch (error) {
            const firebaseError = error as FirebaseError;
            switch (firebaseError.code) {
                case "auth/user-not-found":
                    toast.error("No user found with this email address.");
                    break;
                case "auth/wrong-password":
                    toast.error("Incorrect password. Please try again.");
                    break;
                case "auth/too-many-requests":
                    toast.error("Too many login attempts. Please try again later.");
                    break;
                default:
                    toast.error(`Login failed: ${firebaseError.message}`);
            }
        } finally {
            setLoading(false); // Ensure loading is stopped in all cases
        }
    };

    return (
        <div className="co">
            <ToastContainer />
            {loading ? (
                <div className="h-screen flex justify-center items-center">
                    <Loader />
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="login-form w-1/3 m-auto mt-20 p-10 rounded-lg shadow-lg">
                        <div className="login-form-data">
                            <h2>Login</h2>
                            <div className="login-form-data-1">
                                <Input
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="login-form-data-2">
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="role-selection p-7 flex items-center">
                            <label>
                                <input
                                    type="radio"
                                    value="Admin"
                                    checked={role === "Admin"}
                                    onChange={handleRoleChange}
                                />
                                Admin
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="Teacher"
                                    checked={role === "Teacher"}
                                    onChange={handleRoleChange}
                                />
                                Teacher
                            </label>
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Login
                        </Button>
                        <div className="flex flex-col mt-3 items-center justify-center">
                            <span className="text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link to="/" className="text-blue-600 hover:text-blue-800">
                                    Sign Up
                                </Link>
                            </span>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default LoginForm;
