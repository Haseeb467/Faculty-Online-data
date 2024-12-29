import './App.css'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import EditTeacher from './Admin/EditTeacher/EditTeacher';
import MainPageItems from './Pages/mainPage/MainPageItems';
import AdminLayout from './Components/AdminLayout';
import AddTeacher from './Admin/AddTeacher/AddTeacher';
import { Routes, Route, Navigate, } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import MainPage from './Pages/mainPage/MainPage';
import EditTeacherByAdmin from './Admin/EditTeacher';
import SideBar from './Components/Sidebar';
import NavBar from './Components/NavBar';
import SignUp from './Components/SignUp';
import ProtectedRoute from './Components/ProtectedRoute';
import AllTeacherDataPanelByAdmin from './Admin/AllTeacherDataByAdmin/AllTeacherDataPanelByAdmin';
import DeleteTeacherByAdmin from './Admin/DeleteTeacher';
import AuthProvider from './Contexts/AuthContext';
import UserReport from './Components/userDataReport';
import TeacherNavbar from './Pages/mainPage/TeacherNavbar';
import TeacherEdit from './Teacher/TeacherEdit';
// import DeleteTeacher from './Admin/DeleteTeacher/DeleteTeacher';
// import { Router, Routes } from 'react-router-dom';
// import ProtectedRoute from "./ProtectedRoute";

function App() {

  return (


    <div className='bg-emerald-300 p-1' >
      <ToastContainer />
      <AuthProvider >

        <Routes>
          <Route path="/" element={<LoginForm />} />

          <Route path="/admin" element={<ProtectedRoute requiredRole='admin'>
            <AdminLayout children={undefined}
            />
          </ProtectedRoute>
          }>
            <Route index element={<Navigate to="add-teacher" replace />} />
            <Route path="add-teacher" element={<AddTeacher />} />
            <Route path="EditTeacherByAdmin" element={<EditTeacherByAdmin />} />
            <Route path="DeleteTeacherByAdmin" element={<DeleteTeacherByAdmin />} />
            <Route path="AllTeacherDataPanelByAdmin" element={<AllTeacherDataPanelByAdmin />} />
            <Route path="userReport" element={<UserReport />} />

          </Route>


          <Route path="/teacher" element={<ProtectedRoute requiredRole='teacher'>
            <MainPage />
          </ProtectedRoute>
          }>
            <Route path="teacher1" element={<MainPage />} />
          </Route>

          <Route path="MainPage" element={<MainPage />} />
          <Route path="TeacherNavbar" element={<TeacherNavbar />} />
          <Route path="TeacherEdit/:email" element={<TeacherEdit />} />
          {/* <Route path="/" element={<SomeOtherComponent />} />  */}
          <Route path="/EditTeacher/:teacherId" element={<EditTeacher />} />
          {/* <Route path="AllTeacherDataByAdmin" element={<AllTeacherDataByAdmin />} /> */}


          {/* <Route path="sidebar" element={<SideBar />} /> */}
          {/* <Route path="addTeacher" element={<AddTeacher />} /> */}
          {/* <Route path="DeleteTeacher" element={<DeleteTeacher name="" department="" email="" onDelete={() => { }} />} /> */}
          {/* <Route path="DeleteTeacherByAdmin" element={<DeleteTeacherByAdmin />} /> */}
          {/* <Route path="EditTeacher" element={<EditTeacher />} /> */}
          {/* <Route path="EditTeacherByAdmin" element={<EditTeacherByAdmin />} /> */}
          {/* <Route path="EditTeacherItemsByAdmin" element={<EditTeacherItemsByAdmin name="" department="" email="" teacherId="" />} /> */}
          <Route path="MainPageItems" element={<MainPageItems />} />
          {/* <Route path="LoginForm" element={<LoginForm />} /> */}
          <Route path="NavBar" element={<NavBar />} />
          <Route path="SideBar" element={<SideBar />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="AdminLayout" element={<AdminLayout children={undefined} />} />

        </Routes>



        {/* <h1>Hello</h1> */}
        {/* <Homes />
          {/* <NavBar /> */}
        {/* <SideBar /> */}
        {/* <AddTeacher /> */}
        {/* <AdminLayout children={undefined} /> */}
        {/* <Dashboard /> */}
        {/* <LoginForm /> */}
        {/* <Layout/> */}
        {/* <MainPage /> */}
        {/* <MainPageItems /> */}
        {/* <EditTeacher /> */}
        {/* <EditTeacherByAdmin /> */}
        {/* <DeleteTeacherB yAdmin /> */}





      </AuthProvider>
    </ div >
    // {/* </Router> */}
  )
}

export default App
