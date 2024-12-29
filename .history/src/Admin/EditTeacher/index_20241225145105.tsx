"use client"

import EditTeacherItemsByAdmin from "@/Admin/EditTeacher/EditTeacherItemsByAdmin"
import { useState, useEffect } from 'react';
import { collection, getDocs, } from 'firebase/firestore';
import { txtDB } from "@/firebasedbconfig/dbconfig";
import Loader from "@/Components/Hourglass";
interface TeacherData {
    id?: string;
    name: string;
    email: string;
    department: string;
    isactive: boolean;
}

const EditTeacherByAdmin = () => {
    const [teacherDataEdit, setTeacherDataEdit] = useState<TeacherData[]>([]);
    const [loading, setLoading] = useState(false)
    const fetchTeacherDataEdits = async () => {
        
        const getData = await getDocs(collection(txtDB, "teacherdatafromadmin"));
        const allData = getData.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        })) as TeacherData[];
        setTeacherDataEdit(allData);
    }

    useEffect(() => {
        fetchTeacherDataEdits()
    }, []);

    if (loading) {
        return <div className="h-screen flex justify-center items-center"><Loader /></div>;
    }

    return (
        <div className="flex h-auto gap-3">
            <div className="flex-1 ">
                <h1 className="text-2xl font-bold px-1 py-4">Teacher List for Edit </h1>
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
                            teacherDataEdit.map((Data, index) => {
                                return <EditTeacherItemsByAdmin
                                    key={index}
                                    name={Data.name}
                                    department={Data.department}
                                    email={Data.email}
                                    teacherId={Data.id || ""}
                                    isactive={Data.isactive ?? true}
                                />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EditTeacherByAdmin
