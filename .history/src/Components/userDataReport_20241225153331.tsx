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
  role?: string;
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

    // Teacher Table
    const teacherTableColumn = ["Name", "Department", "Email", "Contact No", "Status"];
    const teacherTableRows: any[] = [];

    filteredTeachers.forEach((teacher) => {
      teacherTableRows.push([
        teacher.name,
        teacher.department,
        teacher.email,
        teacher.contactno,
        teacher.isactive ? "Active" : "Inactive",
      ]);
    });

    doc.text("Teacher Details", 14, 40);
    doc.autoTable({
      head: [teacherTableColumn],
      body: teacherTableRows,
      startY: 50,
    });

    // User Role Table
    const roleTableColumn = ["Name", "Email", "Role", "Status"];
    const roleTableRows: any[] = [];

    filteredTeachers.forEach((teacher) => {
      roleTableRows.push([
        teacher.name,
        teacher.email,
        teacher.role ? teacher.role.charAt(0).toUpperCase() + teacher.role.slice(1) : "Teacher",
        teacher.isactive ? "Active" : "Inactive",
      ]);
    });

    doc.text("User Roles", 14, doc.lastAutoTable.finalY + 10);
    doc.autoTable({
      head: [roleTableColumn],
      body: roleTableRows,
      startY: doc.lastAutoTable.finalY + 20,
    });

    doc.save("Teacher_Report.pdf");
  };

  return (
    <div className="w-full bg-slate-200 rounded-lg mt-1 pb-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold px-2 py-3">Teacher Management</h2>

      {/* Filter Buttons */}
      <div className="flex gap-4 px-2 py-3">
        <button
          className={`${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          } px-4 py-2 rounded-lg`}
          onClick={() => filterTeachers("all")}
        >
          All Teachers
        </button>
        <button
          className={`${
            filter === "active" ? "bg-green-500 text-white" : "bg-gray-200"
          } px-4 py-2 rounded-lg`}
          onClick={() => filterTeachers("active")}
        >
          Active Teachers
        </button>
        <button
          className={`${
            filter === "inactive" ? "bg-red-500 text-white" : "bg-gray-200"
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
          {/* Table rendering logic */}
        </div>
      )}
    </div>
  );
};

export default AddTeacher;
