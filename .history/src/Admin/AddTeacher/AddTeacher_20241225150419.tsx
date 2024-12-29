import { useState } from "react";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { txtDB } from "@/firebasedbconfig/dbconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebasedbconfig/dbconfig";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { ToastContainer } from "react-toastify";

const AddTeacher = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const 
  interface TeacherFormData {
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
    role: string;
    isactive: boolean;
  }

  const [data, setData] = useState<TeacherFormData>({
    name: "",
    age: "",
    cnic: "",
    email: "",
    contactno: "",
    department: "",
    dateofjoining: "",
    latestacademicdegree: "",
    expertise: "",
    password: "",
    landlineno: "",
    role: "",
    isactive: true,
  });

  const validateForm = () => {
    if (!data.email.includes("@")) {
      alert("Please enter a valid email");
      return false;
    }
    if (data.password.length < 4) {
      alert("Password must be at least 4 characters");
      return false;
    }
    return true;
  };

  let name, value;
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    name = event.target.name;
    value = event.target.value;
    setData({ ...data, [name]: value });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true); // Enable loader
      try {
        const teacherDocRef = await addDoc(collection(txtDB, "teacherdatafromadmin"), {
          name: data.name,
          age: data.age,
          cnic: data.cnic,
          email: data.email,
          contactno: data.contactno,
          department: data.department,
          dateofjoining: data.dateofjoining,
          latestacademicdegree: data.latestacademicdegree,
          expertise: data.expertise,
          password: data.password,
          landlineno: data.landlineno,
          timestamp: new Date(),
          role: data.role,
          isactive: true,
        });

        const userCrd = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = auth.currentUser;
        await setDoc(doc(txtDB, "users", userCrd.user.uid), {
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
          isactive: true,
          teacherId: teacherDocRef.id,
        });

        alert("Teacher added successfully");
        // Reset form
        setData({
          name: "",
          age: "",
          cnic: "",
          email: "",
          contactno: "",
          department: "",
          dateofjoining: "",
          latestacademicdegree: "",
          expertise: "",
          password: "",
          landlineno: "",
          role: "teacher",
          isactive: true,
        });
      } catch (error) {
        console.error("Error adding teacher:", error);
        toast.error("Failed to add teacher");
      } finally {
        setIsSubmitting(false); // Disable loader
      }
    }
  };

  return (
    <div className="w-full bg-slate-200 rounded-lg mt-1 pb-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold px-2 py-3">Add Teacher</h2>
      <form className="w-full px-2" onSubmit={onSubmitHandler} method="POST">
        <div className="w-full flex">
          <div className="w-1/2 flex flex-col">
            <label htmlFor="name" className="text-lg pt-2 pb-1 font-medium cursor-pointer">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={(e) => onChangeHandler(e)}
              value={data.name}
              id="name"
              className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg"
            />

            <label htmlFor="age" className="text-lg pt-2 pb-1 font-medium cursor-pointer">
              Age
            </label>
            <input
              type="text"
              name="age"
              onChange={onChangeHandler}
              value={data.age}
              id="age"
              className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg"
            />
            {/* Other input fields */}
          </div>

          <div className="w-1/2 flex flex-col">
            {/* Other input fields */}
          </div>
        </div>

        <div className="w-full flex flex-col mt-4">
          {/* Radio buttons */}
        </div>

        <button
          className={`${
            isSubmitting ? "bg-gray-400" : "bg-blue-500"
          } text-white px-2 py-2 mt-5 mx-3 rounded-lg`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddTeacher;
