"use client"

import { useState, useEffect } from 'react';
import { collection, doc, deleteDoc, getDocs, query, where, } from "firebase/firestore";
import { txtDB } from "@/firebasedbconfig/dbconfig";
import DeleteTeacherItemsByAdmin from "./DeleteTeacher";

interface TeacherData {
    id?: string;
    name: string;
    email: string;
    department: string;
    isactive: boolean;
}

const DeleteTeacherByAdmin = () => {
    const [teacherDataDelete, setTeacherDataDelete] = useState<TeacherData[]>([]);
    const fetchTeacherDataDelete = async () => {
        try {
            const getData = await getDocs(collection(txtDB, "teacherdatafromadmin"));
            const allData = getData.docs.map((doc) => {
                const data = doc.data() as TeacherData; 
                return {
                    id: doc.id,
                    name: data.name || "No Name",
                    email: data.email || "No Email",
                    department: data.department || "No Department",
                    isactive: data.isactive ?? true, 
                };
            });
            setTeacherDataDelete(allData);
        } catch (error) {
            console.error("Error fetching teacher data: ", error);
        }
    };

    useEffect(() => {
        fetchTeacherDataDelete()
    }, []);
    
    const handleDelete = async (teacherAdminId?: string) => {
        if (teacherAdminId) {
            try {
                const teacherDoc = doc(txtDB, "teacherdatafromadmin", teacherAdminId);
                await deleteDoc(teacherDoc);
                console.log(`Deleted from teacherdatafromadmin: ${teacherAdminId}`);
                // Query and delete from 'users'
                const userQuery = query(
                    collection(txtDB, "users"),
                    where("teacherId", "==", teacherAdminId)
                );
                const userDocs = await getDocs(userQuery);
                const deletePromises = userDocs.docs.map(userDoc => deleteDoc(userDoc.ref));
                await Promise.all(deletePromises);
                console.log(`Deleted related users for teacherAdminId: ${teacherAdminId}`);

                fetchTeacherDataDelete(); // Refresh the teacher data after deletion
            } catch (error) {
                console.error("Error deleting teacher:", error);
            }
        }
    };


    return (
        <div className="flex h-auto gap-3">

            <div className="flex-1 ">
                <h1 className="text-2xl font-bold px-1 py-4">Teacher List for Delete </h1>
                <table className="w-full text-sm text-gray-700">
                    <thead className="text-lg bg-gray-400 text-left uppercase ">
                        <tr className="w-full">
                            <th scope="col" className="px-6 py-2">Name</th>
                            <th scope="col" className="px-6 py-2">Department</th>
                            <th scope="col" className="px-6 py-2">Email</th>
                            <th scope="col" className="px-6 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            teacherDataDelete.map((Data, index) => {
                                return <DeleteTeacherItemsByAdmin
                                    key={index}
                                    name={Data.name}
                                    department={Data.department}
                                    email={Data.email}
                                    isactive={Data.isactive}
                                    onDelete={() => handleDelete(Data.id)}
                                />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DeleteTeacherByAdmin
