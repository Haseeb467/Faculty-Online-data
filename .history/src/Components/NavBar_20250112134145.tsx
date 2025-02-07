import { useEffect, useState } from "react";
import { auth, txtDB } from "@/firebasedbconfig/dbconfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { collection, query, where, getDocs } from "firebase/firestore";
import Loader from "./Hourglass";

interface UserInfo {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    name: string;
}

const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch the logged-in user's data only
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
            }
            return null;
        } catch (error) {
