import upload from "@/assets/upload.jpg";
import { useState } from "react";
// import axios from "axios";
import { toast } from 'react-hot-toast';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { txtDB } from "@/firebasedbconfig/dbconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebasedbconfig/dbconfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// import { writeBatch,  } from "firebase/firestore";

// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import { auth, db } from '@/firebasedbconfig/dbconfig'; // adjust path as needed


// import { getDatabase, ref, set } from "firebase/database";


import { collection, addDoc, setDoc, doc } from "firebase/firestore";

const AddTeacher = () => {

  const [image, setImage] = useState<File | false>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const roles = ["Teacher", "Admin"];
  // const [txt, setTxt] = useState("");

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
    image?: File | null;
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
    image: null,
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
    // if (!data.role) {
    //   alert('Please select a role');
    //   return false;
    // } 
    // Add more validations as needed
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

  const storage = getStorage();

  const uploadImage = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `teacherImages/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    // event: React.FormEvent<HTMLFormElement>
    e.preventDefault();
    if (validateForm()) {
      console.log('Form is valid');
      setIsSubmitting(true);

      // with mongo db but not work

      // const formData = new FormData();
      // formData.append("name", data.name);
      // formData.append("age", data.age);
      // formData.append("cnic", data.cnic);
      // formData.append("email", data.email);
      // formData.append("contactno", data.contactno);
      // formData.append("department", data.department);
      // formData.append("dateofjoining", data.dateofjoining);
      // formData.append("latestacademicdegree", data.latestacademicdegree);
      // formData.append("expertise", data.expertise);
      // formData.append("password", data.password);
      // formData.append("landlineno", data.landlineno);
      // if (image) {
      //   formData.append("image", image);
      // }
      // const response = await axios.post("http://localhost:5173/EditTeacher.tsx", formData);
      // if (response.data.success) {
      //   toast.success(response.data.msg);
      // } else {
      //   toast.error(response.data.msg);
      // }

      // with firebase db realtime database and work
      // const { name, age, cnic, email, contactno, department, dateofjoining, latestacademicdegree, expertise, password, landlineno } = data;

      // if (name && age && cnic && email && contactno && department && dateofjoining && latestacademicdegree && expertise && password && landlineno) {

      //   const res = await fetch("https://fms-4-ts-default-rtdb.firebaseio.com/teacherdatafromadmin.json", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify({
      //       name, age, cnic, email, contactno, department, dateofjoining, latestacademicdegree, expertise, password, landlineno
      //     }
      //     )
      //   });
      // const data = await res.json();
      //   console.log(data);
      //   if (res.ok) {
      //     setData({
      //       name: "",
      //       age: "",
      //       cnic: "",
      //       email: "",
      //       contactno: "",
      //       department: "",
      //       dateofjoining: "",
      //       latestacademicdegree: "",
      //       expertise: "",
      //       password: "",
      //       landlineno: "",
      //     })
      //     toast.success("Teacher added successfully");
      //   } else {
      //     toast.error("Failed to add teacher");
      //   }
      //   setIsSubmitting(false);
      // } else {
      //   alert("Please fill all the fields");
      // }


      // with firebase db firestore and databese  and
      // const valref = collection(txtDB, "teacherdatafromadmin");
      // const docSnap = await valref.get();

      // Fire store submission 

      try {
        // const valref = collection(txtDB, "teacherdatafromadmin");
        // const teacherDocRef =
        let imageUrl = null;
        if (data.image && data.image instanceof File) {
          imageUrl = await uploadImage(data.image); // Upload and get URL
        }
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
          role: data.role, // or "admin" depending on the user being added
          image: imageUrl,
          isactive: true,
        });

        alert(
          "data add"
        )

        // Add a document to the users collection with email, password, and role only

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
          image: null,
          isactive: true,
        });

        toast.success("Teacher added successfully");
      } catch (error) {
        console.error("Error adding document: ", error);
        toast.error("Failed to add teacher");
      } finally {
        setIsSubmitting(false);
      }


      // if (addDoc.exists) {
      //   console.log(addDoc.teacherdatafromadmin());
      // } else {
      //   console.log("No such document!");
      // }
    }

    // try {
    //   // First create auth user
    //   const userCredential = await createUserWithEmailAndPassword(
    //     auth,
    //     data.email,  // your form state
    //     data.password // your form state
    //   );

    //   // Then save teacher data to Firestore
    //   await setDoc(doc(db, "teachers", userCredential.user.uid), {
    //     name: data.name,
    //     email: data.email,
    //     // other teacher fields...
    //     role: 'teacher'
    //   });

    //   alert('Teacher added successfully');
    //   // Reset form or redirect
    // } catch (error) {
    //   console.error(error);
    //   alert('Error adding teacher');
    // }
    // const batch = writeBatch(txtDB);
    // const teacherRef = doc(collection(txtDB, "teacherdatafromadmin"));
    // const userRef = doc(collection(txtDB, "users"), auth.currentUser.uid);

    // batch.set(teacherRef, { ...teacherData });
    // batch.set(userRef, { email: teacherData.email, role: teacherData.role });

    // await batch.commit();
    // console.log("Teacher and user data saved successfully");
  }


  return (
    <div className="w-full bg-slate-200 rounded-lg mt-1  pb-6">
      {/* <ToastContainer theme="dark" /> */}
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




          <div className="w-1/2 flex flex-col  items-center ">
            <p className="text-xl   py-2">Upload Thumbnail</p>
            <label htmlFor="image" className="cursor-pointer w-[110px]">
              <img src={!image ? upload : image instanceof File ? URL.createObjectURL(image) : upload} alt="Upload thumbnail" className="ml-2  m-1 w-[100px] h-[100px] object-cover" />
            </label>
            <input
              onChange={(e) => {
                const files = e.target.files
                if (files && files.length > 0) {
                  setImage(files[0]);
                  setData({ ...data, image: files[0] });
                }
              }}
              type="file"
              id="image" hidden className="px-2 py-2" />
          </div>

        </div>

        <div className="w-full mt-2 flex  ">
          <div className="w-1/2 flex flex-col">

            <label htmlFor="email" className="text-lg pt-2 pb-1 font-medium cursor-pointer">Email ID. </label>
            <input type="text" name="email" onChange={onChangeHandler} value={data.email} id="email" className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg" />

            <label htmlFor="contactno" className="text-lg pt-2 pb-1 font-medium cursor-pointer">Contact No. </label>
            <input type="text" name="contactno" onChange={onChangeHandler} value={data.contactno} id="contactno" className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg" />

            <label htmlFor="department" className="text-lg pt-2 pb-1 font-medium cursor-pointer">Department. </label>
            <input type="text" name="department" onChange={onChangeHandler} value={data.department} id="department" className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg" />

            <label htmlFor="dateofjoining" className="text-lg pt-2 pb-1 font-medium cursor-pointer">Date of Joining. </label>
            <input type="text" name="dateofjoining" onChange={onChangeHandler} value={data.dateofjoining} id="dateofjoining" className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg" />
          </div>

          <div className="w-1/2 flex flex-col">

            <label htmlFor="latestacademicdegree" className="text-lg pt-2 pb-1 font-medium cursor-pointer">Latest Academic Degree. </label>
            <input type="text" name="latestacademicdegree" onChange={onChangeHandler} value={data.latestacademicdegree} id="latestacademicdegree" className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg" />

            <label htmlFor="expertise" className="text-lg pt-2 pb-1 font-medium cursor-pointer">Expertise (subjects/areas). </label>
            <input type="text" name="expertise" onChange={onChangeHandler} value={data.expertise} id="expertise" className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg" />

            <label htmlFor="password" className="text-lg pt-2 pb-1 font-medium cursor-pointer">Password. </label>
            <input type="text" name="password" onChange={onChangeHandler} value={data.password} id="password" className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg" />

            <label htmlFor="landlineno" className="text-lg pt-2 pb-1 font-medium cursor-pointer">Landline No. </label>
            <input type="text" name="landlineno" onChange={onChangeHandler} value={data.landlineno} id="landlineno" className="w-10/12 px-2 py-2 bg-transparent border-2 border-zinc-500 rounded-lg" />

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
          {/* <div className="mt-4">
            <label className="mr-3">Status: </label>
            <select
              name="isactive"
              value={data.isactive ? "true" : "false"} // Ensure value matches the options
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  isactive: e.target.value === "true", // Update the state properly
                }))
              }
              required
            >
              <option value="false">Inactive</option>
              <option value="true">Active</option>
            </select>
          </div> */}
        </div>

        {/* <button className="bg-blue-500 text-white px-2 py-2 mt-5 mx-3 rounded-lg" type="submit">submit</button> */}

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