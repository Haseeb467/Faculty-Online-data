"use client"

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { txtDB } from '@/firebasedbconfig/dbconfig';

interface TeacherData {
    id?: string;
    name: string;
    age: string;
    cnic: string;
    email: string;
    contactno: string;
    department: string;
    dateofjoining: string;
    latestacademicdegree: string;
    expertise: string;
    password: string;
    landlineno: string;
    image?: File | null;
    role: string;
    isactive: boolean;
}

const MainPageItems = () => {
    const [gdata, setGdata] = useState<TeacherData[]>([]);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        try {
            setLoading(true);
            const activeUserQuery = query(collection(txtDB, "teacherdatafromadmin"), where("isactive", "==", true));
            const dataDb = await getDocs(activeUserQuery);
            const allData = dataDb.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            })) as TeacherData[];
            setGdata(allData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    console.log(gdata, "gdata here");

    if (loading) {
        return <div><h1>Loading...</h1></div>;
    }

    if (gdata.length === 0) {
        return <div><h1>No data found</h1></div>;
    }

    return (
        <div className="w-full mt-auto flex flex-wrap justify-center gap-6 p-3">
            {gdata.map((gdata, index) => (
                <div key={index} className="flex flex-col min-w-[350px] px-4 py-5 border-2 border-orange-500 rounded-md h-[380px]">
                    <div className="flex">
                        <div className="data space-y-1">
                            <h3> <span className='font-semibold '> Name: </span>&emsp; {gdata.name}</h3>
                            <p><span className='font-semibold '> Age: </span>&emsp; {gdata.age}</p>
                            <p><span className='font-semibold '> CNIC: </span>&emsp; {gdata.cnic}</p>
                            <h4><span className='font-semibold '> Department: </span>&emsp; {gdata.department}</h4>
                            <h4><span className='font-semibold '> Degree: </span>&emsp; {gdata.latestacademicdegree}</h4>
                            <h5><span className='font-semibold '> Email: </span>&emsp; {gdata.email}</h5>
                            <h5><span className='font-semibold '> Password: </span>&emsp; {gdata.password}</h5>
                            <h5><span className='font-semibold '> Date of Joinning: </span>&emsp; {gdata.dateofjoining}</h5>
                            <h5><span className='font-semibold '> Expertise: </span>&emsp;{gdata.expertise}</h5>
                            <h5><span className='font-semibold '> Contact: </span>&emsp;{gdata.contactno}</h5>
                            <h5><span className='font-semibold '> Landline: </span>&emsp; {gdata.landlineno}</h5>
                            <h5><span className='font-semibold '> Role: </span>&emsp; {gdata.role}</h5>
                        </div>
                    </div>
                    {/* <div className="flex justify-around items-center mt-2">
                            <button
                                className="bg-orange-500 text-white px-4 py-2 rounded-md"
                                onClick={() => navigate(`/admin/editTeacher?id=${gdata.id}`)} // Using navigate for React Router
                            >
                                Edit
                            </button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                        </div> */}
                </div>
            ))}
        </div>
    );
};

export default MainPageItems;
