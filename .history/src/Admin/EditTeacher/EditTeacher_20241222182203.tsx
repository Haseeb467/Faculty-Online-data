"use client"
import { useEffect, useState, useCallback } from 'react';
import { txtDB, auth } from '@/firebasedbconfig/dbconfig';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Added getDocs import
import SideBar from '@/Components/Sidebar';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-hot-toast';

interface TeacherData {
    id: string;
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
}

const EditTeacher = () => {
    const navigate = useNavigate();
    const { teacherId } = useParams<{ teacherId: string }>();
    const [teacherData, setTeacherData] = useState<TeacherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updateLoading, setUpdateLoading] = useState(false);
    const fetchTeacherData = useCallback(async (teacherId: string) => {
        try {
            setLoading(true);
            console.log("Fetching data for teacherId:", teacherId);
            const teacherRef = doc(txtDB, "teacherdatafromadmin", teacherId);
            const teacherSnapShot = await getDoc(teacherRef);
            // const getData = await getDoc(doc(txtDB, "teacherdatafromadmin", teacherId));
            // const teacherDoc = getData.data(); 
            if (teacherSnapShot.exists()) {
                const teacherDoc = teacherSnapShot.data();
                console.log("Fetched teacher data:", teacherDoc);
                setTeacherData({
                    id: teacherSnapShot.id,
                    name: teacherDoc.name || '',
                    age: teacherDoc.age || '',
                    cnic: teacherDoc.cnic || '',
                    email: teacherDoc.email || '',
                    contactno: teacherDoc.contactno || '',
                    department: teacherDoc.department || '',
                    dateofjoining: teacherDoc.dateofjoining || '',
                    latestacademicdegree: teacherDoc.latestacademicdegree || '',
                    expertise: teacherDoc.expertise || '',
                    password: teacherDoc.password || '',
                    landlineno: teacherDoc.landlineno || '',
                    role: teacherDoc.role || '',
                } as TeacherData);
            } else {
                console.log("No teacher document found");
                setError('Teacher not found');
                setLoading(false);
                alert('Teacher not found');
            }
        } catch (err) {
            console.error("Error fetching teacher data:", err);
            setError('Error fetching teacher data');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (teacherId) {
            console.log("UseEffect triggered with teacherId:", teacherId);
            fetchTeacherData(teacherId);
        } else {
            setError("Invalid teacher id");
            setLoading(false);
        }
    }, [teacherId, fetchTeacherData]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!teacherData) return;
        setUpdateLoading(true);

        try {
            const teacherRef = doc(txtDB, "teacherdatafromadmin", teacherData.id);

            // Update teacher data
            await updateDoc(teacherRef, {
                name: teacherData.name,
                age: teacherData.age,
                cnic: teacherData.cnic,
                email: teacherData.email,
                contactno: teacherData.contactno,
                department: teacherData.department,
                dateofjoining: teacherData.dateofjoining,
                latestacademicdegree: teacherData.latestacademicdegree,
                expertise: teacherData.expertise,
                password: teacherData.password,
                landlineno: teacherData.landlineno,
                role: teacherData.role,
                // image: teacherData.image
            });

            // Update auth user profile if it exists
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: teacherData.name,
                    photoURL: teacherData.image as any || null,
                });
            }

            toast.success('Teacher updated successfully!');
            navigate('/admin/EditTeacherByAdmin');
        } catch (err) {
            console.error("Error updating teacher:", err);
            toast.error('Error updating teacher');
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // setTeacherData(prev => prev ? { ...prev, [name]: value } : null);
        if (teacherData) {
            setTeacherData({ ...teacherData, [name]: value });
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
    if (!teacherData) return <div className="text-center p-4">No teacher data found</div>;

    return (
        <div className="w-full flex mx-auto p-1">
            <div className="">
                <SideBar />
            </div>

            <div className='w-full mx-auto'>
                <h1 className="text-2xl font-bold ml-9 mb-4 mt-4">Edit Teacher</h1>
                {/* <form onSubmit={handleSubmit} className="space-y-4 w- px-11">
                <div>
                    {/* <div className="flex flex-col">
                        <label className="mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={teacherData?.name}
                            onChange={handleInputChange}
                            className="border p-2 rounded"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1">Gender</label>
                        <input
                            type="text"
                            name="gender"
                            value={teacherData?.age}
                            onChange={handleInputChange}
                            className="border p-2 rounded"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1">CNIC</label>
                        <input
                            type="text"
                            name="cnic"
                            value={teacherData?.cnic}
                            onChange={handleInputChange}
                            className="border p-2 rounded"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1">Department</label>
                        <input
                            type="text"
                            name="department"
                            value={teacherData?.department}
                            onChange={handleInputChange}
                            className="border p-2 rounded"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1">Latest Academic Degree</label>
                        <input
                            type="text"
                            name="latestacademicdegree"
                            value={teacherData?.latestacademicdegree}
                            onChange={handleInputChange}
                            className="border p-2 rounded"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={teacherData?.email}
                            onChange={handleInputChange}
                            className="border p-2 rounded"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1">Contact No</label>
                        <input
                            type="text"
                            name="contactno"
                            value={teacherData?.contactno}
                            onChange={handleInputChange}
                            className="border p-2 rounded"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1">Landline No</label>
                        <input
                            type="text"
                            name="landlineno"
                            value={teacherData?.landlineno}
                            onChange={handleInputChange}
                            className="border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1">Password</label>
                        <input
                            type="text"
                            name="password"
                            value={teacherData?.password}
                            onChange={handleInputChange}
                            className="border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1">Role</label>
                        <input
                            type="text"
                            name="role"
                            value={teacherData?.role}
                            onChange={handleInputChange}
                            className="border p-2 rounded"
                        />
                    </div>
                    {/* <div className="flex flex-col">
                        <label className="mb-1">Image</label>
                        <input
                            type="text"
                            name="image"
                            value={teacherData?.image ? teacherData.image.name : ''}
                            onChange={handleInputChange}
                            className="border p-2 rounded"
                        />
                    </div> 
                    <div className="flex flex-col">
                        <label className="mb-1">Date of Joining</label>
                        <input
                            type="text"
                            name="dateofjoining"
                            value={teacherData?.dateofjoining}
                            onChange={handleInputChange}
                            className="border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1">Expertise</label>
                        <input
                            type="text"
                            name="expertise"
                            value={teacherData?.expertise}
                            onChange={handleInputChange}
                            className="border p-2 rounded"
                        />
                    </div> 


                    <div className="flex gap-4">
                        <button
                            type="submit"
                            // onSubmit={() => { handleSubmit }}
                            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                        >
                            Update Teacher
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/mainPage')}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
                </form> 
                */}
                <form onSubmit={handleSubmit} className="space-y-4 w-1/2 px-11">
                    <h2 className="text-xl font-bold">Editing Teacher with ID: {teacherId}</h2>

                    {[
                        { label: "Name", name: "name", type: "text" },
                        { label: "Age", name: "age", type: "text" },
                        { label: "CNIC", name: "cnic", type: "text" },
                        { label: "Department", name: "department", type: "text" },
                        { label: "Latest Academic Degree", name: "latestacademicdegree", type: "text" },
                        { label: "Email", name: "email", type: "email" },
                        { label: "Contact No", name: "contactno", type: "text" },
                        { label: "Landline No", name: "landlineno", type: "text" },
                        { label: "Password", name: "password", type: "text" },
                        { label: "Role", name: "role", type: "text" },
                        { label: "Date of Joining", name: "dateofjoining", type: "text" },
                        { label: "Expertise", name: "expertise", type: "text" },
                    ].map((field) => (
                        <div key={field.name} className="flex flex-col">
                            <label className="mb-1 font-medium">{field.label}</label>
                            <input
                                type={field.type}
                                name={field.name}
                                value={(teacherData as any)[field.name] || ""}
                                onChange={handleInputChange}
                                className="border p-2 rounded focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    ))}



                    {/* <input
                        type="text"
                        name="name"
                        value={teacherData?.name || ""}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                    /> */}



                    {/* Form Buttons */}
                    <div className="flex gap-4 mt-6">
                        <button
                            type="submit"
                            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
                            disabled={updateLoading}
                        // onClick={() => navigate("/admin/EditTeacherByAdmin")}
                        >
                            {updateLoading ? "Updating..." : "Update Teacher"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/admin/EditTeacherByAdmin")}
                            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default EditTeacher