"use client";
import { collection, getDocs } from "firebase/firestore";
import { txtDB } from "@/firebasedbconfig/dbconfig";
import { useEffect, useState } from "react";

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

const AllTeacherDataByAdmin = () => {
    const [data, setData] = useState<TeacherData[]>([]);
    const [loading, setLoading] = useState(false);
    const [filter , setFilter ] = useState<"all" | "active" | "inactive " ("all")>
    const getData = async () => {
        try {
            setLoading(true);
            const getDbData = await getDocs(collection(txtDB, "teacherdatafromadmin"));
            const allData = getDbData.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            })) as TeacherData[];
            setData(allData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const filterData = data.filter((teacher) => {
        if (filter === "active") return teacher.isactive;
        if (filter === "inactive") return !teacher.isactive;
        return true;
    })

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className="w-full min-h-full mt-auto flex flex-wrap flex-start items-center gap-2">
            <div className="w-full min-h-full mt-auto">
                {/* Filter Controls */}
                <div className="mb-4 flex gap-4">
                    <button
                        className={`px-4 py-2 border rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={() => setFilter("all")}
                    >
                        All Users
                    </button>
                    <button
                        className={`px-4 py-2 border rounded ${filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={() => setFilter("active")}
                    >
                        Active Users
                    </button>
                    <button
                        className={`px-4 py-2 border rounded ${filter === "inactive" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={() => setFilter("inactive")}
                    >
                        Non-Active Users
                    </button>
                </div>

            {filterdata.map((teacher: TeacherData, index: number) => (
                <div
                    key={index}
                    className={`flex flex-col min-w-[350px] px-4 py-5 mb-5 border-orange-500 rounded-md h-[390px] 
                        ${teacher.isactive
                            ? "border-2  bg-white"
                            : "border-2 bg-red-300 "
                        }`}
                >
                    <div className="flex">
                        <div className="data space-y-1">
                            <h3>
                                <span className="font-semibold">Name:</span> {teacher.name}
                            </h3>
                            <p>
                                <span className="font-semibold">Age:</span> {teacher.age}
                            </p>
                            <p>
                                <span className="font-semibold">CNIC:</span> {teacher.cnic}
                            </p>
                            <h4>
                                <span className="font-semibold">Department:</span>{" "}
                                {teacher.department}
                            </h4>
                            <h4>
                                <span className="font-semibold">Degree:</span>{" "}
                                {teacher.latestacademicdegree}
                            </h4>
                            <h5>
                                <span className="font-semibold">Email:</span> {teacher.email}
                            </h5>
                            <h5>
                                <span className="font-semibold">Password:</span> {teacher.password}
                            </h5>
                            <h5>
                                <span className="font-semibold">Date of Joining:</span>{" "}
                                {teacher.dateofjoining}
                            </h5>
                            <h5>
                                <span className="font-semibold">Expertise:</span> {teacher.expertise}
                            </h5>
                            <h5>
                                <span className="font-semibold">Contact:</span> {teacher.contactno}
                            </h5>
                            <h5>
                                <span className="font-semibold">Landline:</span> {teacher.landlineno}
                            </h5>
                            <h5>
                                <span className="font-semibold">Role:</span> {teacher.role}
                            </h5>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllTeacherDataByAdmin;
