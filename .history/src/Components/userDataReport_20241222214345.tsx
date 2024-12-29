
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebasedbconfig/dbconfig";
import jsPDF from "jspdf";

const UserReport = () => {
    const fetchAllUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "teacherdatafromadmin"));
            const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log("Fetched users:", users);
            return users;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    };

    // const generatePDF = (users: Array<{ id: string; [key: string]: any }>) => {
    //     const doc = new jsPDF();
    //     doc.setFontSize(12);

    //     // Add title
    //     doc.text("User Data Report", 10, 10);

    //     // Add table headers
    //     let y = 20;
    //     doc.text("ID", 10, y);
    //     doc.text("Name", 50, y);
    //     doc.text("Email", 100, y);
    //     doc.text("Role", 150, y);
    //     y += 10;

    //     // Add user data to the PDF
    //     users.forEach(user => {
    //         doc.text(user.id, 10, y);
    //         doc.text(user.name || "N/A", 50, y);
    //         doc.text(user.email || "N/A", 100, y);
    //         doc.text(user.role || "N/A", 150, y);
    //         y += 10;
    //         if (y > 280) { // Prevent content from overflowing
    //             doc.addPage();
    //             y = 20;
    //         }
    //     });

    //     // Save the PDF
    //     doc.save("UserDataReport.pdf");
    // };

    const generateTeacherPDF = (teachers: Array<{ id: string;[key: string]: any }>) => {
        const doc = new jsPDF();
        doc.setFontSize(12);

        teachers.forEach((teacher, index) => {
            // Add a page for each teacher
            if (index > 0) doc.addPage();
            const srNo = index + 1;

            // Add title and teacher ID
            doc.text(`Sr.No: ${srNo}`, 10, 10);
            doc.text(`Teacher Name - ${teacher.name || "N/A"}`, 20, 20);
            doc.text(`ID: ${teacher.id}`, 20, 30);

            // Display teacher details
            let y = 40; // Initial Y position
            Object.keys(teacher).forEach(key => {
                if (key !== "id") { // Skip the ID field
                    doc.text(`${key}: ${teacher[key]}`, 20, y);
                    y += 10;
                    if (y > 280) { 
                        doc.addPage();
                        y = 20;
                    }
                }
            });
        });

        // Save the PDF
        doc.save("TeacherDataReport.pdf");
    };

    const handleGenerateTeacherPDF = async () => {
        try {
            const teachers = await fetchAllUsers();
            generateTeacherPDF(teachers);
            console.log("PDF generated successfully!");
        } catch (error) {
            console.error("Failed to generate PDF:", error);
        }
    };

    return (
        <div className="report-generator ">

            <div className="text-2xl font-bold mb-4">
                For all User Report in PDF form 
            </div>

            <button
                onClick={handleGenerateTeacherPDF}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
                Generate PDF
            </button>
        </div>
    );
};

export default UserReport;