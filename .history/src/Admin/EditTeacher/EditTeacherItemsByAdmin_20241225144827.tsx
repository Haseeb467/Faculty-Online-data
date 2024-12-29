import { txtDB } from "@/firebasedbconfig/dbconfig";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


interface EditTeacherItemsByAdmin {
    name: string;
    department: string;
    email: string;
    teacherId: string;
    isactive: boolean;
}
const EditTeacherItemsByAdmin: React.FC<EditTeacherItemsByAdmin> = ({ name, department, email, teacherId, isactive }) => {
    const navigate = useNavigate();
    const [activeStatus, setActiveStatus] = useState(isactive);
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        const teacherRef = doc(txtDB, "teacherdatafromadmin", teacherId);

        try {
            setLoading()
            // Update `teacherdatafromadmin`
            await updateDoc(teacherRef, { isactive: !activeStatus });
            // Find and update the corresponding user in `users` collection
            const userQuery = query(
                collection(txtDB, "users"),
                where("teacherId", "==", teacherId)
            );
            const userDocs = await getDocs(userQuery);
            // Update all matching users
            const updatePromises = userDocs.docs.map(userDoc =>
                updateDoc(userDoc.ref, { isactive: !activeStatus })
            );
            await Promise.all(updatePromises);
            setActiveStatus(!activeStatus);
            alert(`Teacher ${!activeStatus ? 'activated' : 'deactivated'} successfully in both tables.`);
        } catch (error) {
            console.error("Error updating teacher status:", error);
        }
    };

    return (
        <tr
            className={`border-b ${!activeStatus ? 'bg-red-100' : 'bg-white'}`}
            title={!activeStatus ? 'This teacher is inactive or not working in our university' : ''}
        >
            <th scope="row" className="items-center gap-3 sm:flex px-6 py-4 font-medium text-gray-800">
                {name ? name : "No Name"}
            </th>
            <td className="px-6 py-4">
                {department ? department : "No Department"}
            </td>
            <td className="px-6 py-4">
                {email ? email : "No Email"}
            </td>
            <td className="px-0 py-1 gap-5 flex items-center justify-center">
                <button
                    onClick={handleToggle}
                    className={`px-3 py-1 w-[86px] rounded ${activeStatus ? 'bg-green-400 py-2 px-5 rounded-md font-bold text-sm hover:bg-green-500 hover:text-white' : 'bg-red-400 py-2 px-5 rounded-md font-bold text-sm hover:text-white hover:bg-red-500'}`}
                >
                    {activeStatus ? 'Active' : 'Inactive'}
                </button>
                <button className="bg-green-400 py-2 px-5 rounded-md font-bold text-sm hover:text-white hover:bg-green-500"
                    onClick={() => {
                        if (teacherId) { // Check if teacherId is valid
                            navigate(`/EditTeacher/${teacherId}`);
                        } else {
                            console.error("Invalid teacher ID");
                        }
                    }}
                >
                    Edit
                </button>
            </td>
        </tr>
    );
}

export default EditTeacherItemsByAdmin;