// import upload from "@/assets/upload.jpg";
import { useState } from "react";
import { toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { txtDB } from "@/firebasedbconfig/dbconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebasedbconfig/dbconfig";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { ToastContainer } from "react-toastify";

const AddTeacher = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);

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
  })

  const validateForm = () => {
    if (!data.email.includes('@')) {
      alert('Please enter a valid email');
      return false;
    }
    if (data.password.length < 4) {
      alert('Password must be at least 4 characters');
      return false;
    }
    return true;
  }
  let name, value;
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    name = event.target.name;
    value = event.target.value;
    setData({ ...data, [name]: value });
    console.log(data);
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form is valid');
      setIsSubmitting(true);

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
          // image: imageUrl,
          isactive: true,
        });

        const userCrd = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = auth.currentUser;
        console.log(user);
        await setDoc(doc(txtDB, "users", userCrd.user.uid), {
          name: data.age,
          email: data.email,
          password: data.password,
          role: data.role,
          isactive: true,
          teacherId: teacherDocRef.id,
        });
        alert("Data Add Successfully");
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
        // toast.success("Teacher added successfully");
      } catch (error) {
        console.error("Error adding document: ", error);
        toast.error("Failed to add teacher");
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <div className="w-full bg-slate-200 rounded-lg mt-1  pb-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold px-2 py-3">Add Teacher</h2>
      <form className="w-full px-2"
        onSubmit={onSubmitHandler}
        method="POST"
      >
        <div className="w-full flex ">
          <div className="w-1/2 flex flex-col  ">
            <label htmlFor="name" className="text-lg pt-2 pb-1 font-medium cursor-pointer">Name. </label>
            <input type="text" name="name" onChange={
              (e) => {
                onChangeHandler(e);
                setData({ ...data, name: e.target.value });
              }
            }
              value={data.name} id="name" className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg" />

            <label htmlFor="age" className="text-lg pt-2 pb-1 font-medium cursor-pointer">Age. </label>
            <input type="text" name="age" onChange={onChangeHandler} value={data.age} id="age" className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg" />
            <label htmlFor="cnic" className="text-lg pt-2 pb-1 font-medium cursor-pointer">CNIC. </label>
            <input type="text" name="cnic" onChange={onChangeHandler} value={data.cnic} id="cnic" className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg" />
          </div>

          <div className="w-1/2 flex flex-col">

            <label htmlFor="latestacademicdegree" className="text-lg pt-2 pb-1 font-medium cursor-pointer">Latest Academic Degree. </label>
            <input type="text" name="latestacademicdegree" onChange={onChangeHandler} value={data.latestacademicdegree} id="latestacademicdegree" className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg" />

            <label htmlFor="expertise" className="text-lg pt-2 pb-1 font-medium cursor-pointer">Expertise (subjects/areas). </label>
            <input type="text" name="expertise" onChange={onChangeHandler} value={data.expertise} id="expertise" className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg" />

            <label htmlFor="password" className="text-lg pt-2 pb-1 font-medium cursor-pointer">Password. </label>
            <input type="text" name="password" onChange={onChangeHandler} value={data.password} id="password" className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg" />

          </div>
    
        </div>
        <div className="w-full mt-2 flex  ">
          <div className="w-1/2 flex flex-col">
            <label htmlFor="email" className="text-lg pt-2 pb-1 font-medium cursor-pointer">Email ID. </label>
            <input type="text" name="email" onChange={onChangeHandler} value={data.email} id="email" className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg" />

            <label htmlFor="contactno" className="text-lg pt-2 pb-1 font-medium cursor-pointer">Contact No. </label>
            <input type="text" name="contactno" onChange={onChangeHandler} value={data.contactno} id="contactno" className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg" />
          </div>

          <div className="w-1/2 flex flex-col">
            {/* 
              <label htmlFor="latestacademicdegree" className="text-lg pt-2 pb-1 font-medium cursor-pointer">Latest Academic Degree. </label>
              <input type="text" name="latestacademicdegree" onChange={onChangeHandler} value={data.latestacademicdegree} id="latestacademicdegree" className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg" />

              <label htmlFor="expertise" className="text-lg pt-2 pb-1 font-medium cursor-pointer">Expertise (subjects/areas). </label>
              <input type="text" name="expertise" onChange={onChangeHandler} value={data.expertise} id="expertise" className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg" />

              <label htmlFor="password" className="text-lg pt-2 pb-1 font-medium cursor-pointer">Password. </label>
              <input type="text" name="password" onChange={onChangeHandler} value={data.password} id="password" className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg" />

              <label htmlFor="landlineno" className="text-lg pt-2 pb-1 font-medium cursor-pointer">Landline No. </label>
              <input type="text" name="landlineno" onChange={onChangeHandler} value={data.landlineno} id="landlineno" className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg" /> */}

            <label htmlFor="department" className="text-lg pt-2 pb-1 font-medium cursor-pointer">Department. </label>
            <input type="text" name="department" onChange={onChangeHandler} value={data.department} id="department" className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg" />

            <label htmlFor="dateofjoining" className="text-lg pt-2 pb-1 font-medium cursor-pointer">Date of Joining. </label>
            <input type="text" name="dateofjoining" onChange={onChangeHandler} value={data.dateofjoining} id="dateofjoining" className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg" />

          </div>
        </div>

        <div className="w-full flex flex-col mt-4">
          <div className="flex items-center space-x-6">
            <label className="flex items-center" htmlFor="admin">
              <input
                type="radio"
                name="role"
                id="admin"
                value="admin"
                checked={data.role === "admin"}
                onChange={onChangeHandler}
                className="mr-2"
              />
              Admin
            </label>
            <label className="flex items-center" htmlFor="teacher">
              <input
                type="radio"
                name="role"
                id="teacher"
                value="teacher"
                checked={data.role === "teacher"}
                onChange={onChangeHandler}
                className="mr-2"
              />
              Teacher
            </label>
          </div>
        </div>
        <button
          className="bg-blue-500 text-white px-2 py-2 mt-5 mx-3 rounded-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
export default AddTeacher