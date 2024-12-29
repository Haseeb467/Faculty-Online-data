import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { txtDB } from "@/firebasedbconfig/dbconfig";
import { collection, getDocs } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
interface TeacherData {
    id: string;
    name: string;
    age: string;
    email: string;
    contactno: string;
    department: string;
    isactive: boolean;
    role: string;
}

const AddTeacher = () => {
    const [teachers, setTeachers] = useState<TeacherData[]>([]);
    const [filteredTeachers, setFilteredTeachers] = useState<TeacherData[]>([]);
    const [filter, setFilter] = useState<string>("all");
    const [isLoading, setIsLoading] = useState(false);

    // Fetch all teacher data from Firestore
    const fetchTeachers = async () => {
        setIsLoading(true); // Start loader
        try {
            const snapshot = await getDocs(collection(txtDB, "teacherdatafromadmin"));
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as TeacherData[];
            setTeachers(data);
            setFilteredTeachers(data); // Default is all teachers
        } catch (error) {
            console.error("Error fetching teacher data:", error);
            toast.error("Failed to fetch teachers");
        } finally {
            setIsLoading(false); // Stop loader
        }
    };

    // UseEffect to fetch teacher data on component load
    useEffect(() => {
        fetchTeachers();
    }, []);

    // Filter function
    const filterTeachers = (status: string) => {
        setFilter(status); // Update the filter state
        if (status === "all") {
            setFilteredTeachers(teachers);
        } else if (status === "active") {
            setFilteredTeachers(teachers.filter((teacher) => teacher.isactive));
        } else if (status === "inactive") {
            setFilteredTeachers(teachers.filter((teacher) => !teacher.isactive));
        }
    };

    // Generate PDF Report
    const generatePDF = () => {
        const doc = new jsPDF();

        // Add Title
        doc.setFontSize(18);
        doc.text("Teacher Report", 14, 20);

        // Add Subtitle
        const subtitle =
            filter === "all"
                ? "All Teachers"
                : filter === "active"
                    ? "Active Teachers"
                    : "Inactive Teachers";
        doc.setFontSize(14);
        doc.text(`Filtered By: ${subtitle}`, 14, 30);

        // Define Table Headers
        const tableColumn = ["Name", "Department", "Email", "Contact No", "Role" , "Status"];
        const tableRows: any[] = [];

        // Add Data to Rows
        filteredTeachers.forEach((teacher) => {
            const teacherData = [
                teacher.name,
                teacher.department,
                teacher.email,
                teacher.role,
                teacher.contactno,
                teacher.isactive ? "Active" : "Inactive",
            ];
            tableRows.push(teacherData);
        });

        // Add Table to PDF
        // doc.autoTable({
        //     head: [tableColumn],
        //     body: tableRows,
        //     startY: 40,
        // });

        // Save the PDF
        doc.save("Teacher_Report.pdf");
    };

    return (
        <div className="w-full bg-slate-200 rounded-lg mt-1 pb-6">
            <ToastContainer />
            <h2 className="text-2xl font-bold px-2 py-3">Teacher Management</h2>

            {/* Filter Buttons */}
            <div className="flex gap-4 px-2 py-3">
                <button
                    className={`${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
                        } px-4 py-2 rounded-lg`}
                    onClick={() => filterTeachers("all")}
                >
                    All Teachers
                </button>
                <button
                    className={`${filter === "active" ? "bg-green-500 text-white" : "bg-gray-200"
                        } px-4 py-2 rounded-lg`}
                    onClick={() => filterTeachers("active")}
                >
                    Active Teachers
                </button>
                <button
                    className={`${filter === "inactive" ? "bg-red-500 text-white" : "bg-gray-200"
                        } px-4 py-2 rounded-lg`}
                    onClick={() => filterTeachers("inactive")}
                >
                    Inactive Teachers
                </button>
                <button
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg"
                    onClick={generatePDF}
                >
                    Download PDF
                </button>
            </div>

            {/* Loader */}
            {isLoading ? (
                <div className="text-center py-4">
                    <span className="text-lg font-medium">Loading...</span>
                </div>
            ) : (
                <div className="px-2">
                    <h3 className="text-xl font-medium mt-4 mb-2">
                        {filter.charAt(0).toUpperCase() + filter.slice(1)} Teachers
                    </h3>
                    <table className="w-full text-sm text-gray-700">
                        <thead className="bg-gray-400 text-left uppercase">
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Department</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Role
                                </th>
                                <th className="px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTeachers.map((teacher) => (
                                <tr key={teacher.id} className="border-b">
                                    <td className="px-4 py-2">{teacher.name}</td>
                                    <td className="px-4 py-2">{teacher.department}</td>
                                    <td className="px-4 py-2">{teacher.email}</td>
                                    <td className="px-4 py-2">{teacher.role}</td>
                                    <td className="px-4 py-2">
                                        {teacher.isactive ? (
                                            <span className="text-green-500 font-medium">Active</span>
                                        ) : (
                                            <span className="text-red-500 font-medium">Inactive</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* No Data */}
                    {filteredTeachers.length === 0 && (
                        <div className="text-center py-4 text-gray-500">
                            No teachers found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AddTeacher;
