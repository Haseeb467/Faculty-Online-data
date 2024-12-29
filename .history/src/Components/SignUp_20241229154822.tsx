import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebasedbconfig/dbconfig";
import { setDoc, doc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();

    const hundleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            console.log(user);
            if (user) {
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    role: role,
                    name: name,
                    password: password,
                });
            }
            console.log("User Created Successfully");
            toast.success("User Created Successfully");
            setTimeout(() => {
                navigate("/login");
            }, 4000)
        } catch (error) {
            console.error("Error creating user:", error);
            toast.error("Error creating user:",);
        }
    }
    return (

        <div className=" h-screen">
            <ToastContainer />
            <form onSubmit={hundleRegister}>
                <div className="login-form w-1/3 m-auto mt-20 p-10 rounded-lg shadow-lg">
                    <div className="login-form-data">
                        <h2>Sign up </h2>
                        <div className="login-form-data-2">
                            Name
                            <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="login-form-data-1">
                            Email
                            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="login-form-data-2">
                            Password
                            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="role-selection p-7  flex items-center">
                        <label>
                            <input type="radio" name="role" value="Admin" checked={role === "Admin"} onChange={(e) => setRole(e.target.value)} />
                            Admin
                        </label>
                        <label>
                            <input type="radio" name="role" value="Teacher" checked={role === "Teacher"} onChange={(e) => setRole(e.target.value)} />
                            Teacher
                        </label>
                    </div>
                    <Button type="submit">Login</Button>
                    <div className="flex flex-col mt-3 items-center justify-center">

                        <span> <h1></h1></span>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default SignUp
