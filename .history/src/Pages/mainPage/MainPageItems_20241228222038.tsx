"use client"

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { txtDB } from '@/firebasedbconfig/dbconfig';

interface TeacherData {
    id?: string;
    name: string;
    email: string;
    department: string;
    latestacademicdegree: string;
    expertise: string;
    role: string;
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
                <div key={index} className="flex flex-col min-w-[350px] px-4 py-5 border-2 border-orange-500 rounded-md h-[300px]">
                    <div className="flex  items-center">
                        <div className="data space-y-3">
                            <h3> <span className='font-semibold '> Name: </span>&emsp; {gdata.name}</h3>
                            <h4><span className='font-semibold '> Department: </span>&emsp; {gdata.department}</h4>
                            <h4><span className='font-semibold '> Degree: </span>&emsp; {gdata.latestacademicdegree}</h4>
                            <h5><span className='font-semibold '> Email: </span>&emsp; {gdata.email}</h5>
                            <h5><span className='font-semibold '> Expertise: </span>&emsp;{gdata.expertise}</h5>
                            <h5><span className='font-semibold '> Role: </span>&emsp; {gdata.role}</h5>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MainPageItems;
