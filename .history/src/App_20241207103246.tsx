// import { Home } from 'lucide-react'
// import { Sidebar } from 'lucide-react'
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import necessary components from react-router-dom

import './App.css'
// import AdminLayout from './Components/AdminLayout'
import { AuthProvider } from './Contexts/AuthContext'
// import SideBar from './Components/Sidebar'
// import { ActiveItemProvider } from './Contexts/ActiveItemsContext'
// import NavBar from './Components/NavBar'
// import Homes from './Pages/Home'
// import Dashboard from './Pages/Admin/Dashboard'
// import Layout from './Admin/Layout'
// import MainPage from './Pages/mainPage/MainPage'
// import LoginForm from './Components/LoginForm'
// import Dashboard from './Pages/Admin/Dashboard'
// import AddTeacher from './Admin/AddTeacher/AddTeacher'
// import MainPageItems from './Pages/mainPage/MainPageItems'
// import LoginForm from './Components/LoginForm'
// import AdminLayout from '../../.history/fms-4-ts/src/Components/AdminLayout_20241106225639';
// import AddTeacher from '../../.history/fms-4-ts/Admin/AddTeacher/AddTeacher_20241108112218';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import SignUp from './Components/SignUp';
// import DeleteTeacher from './Admin/DeleteTeacher/DeleteTeacher';
import EditTeacher from './Admin/EditTeacher/EditTeacher';
import MainPageItems from './Pages/mainPage/MainPageItems';
import AdminLayout from './Components/AdminLayout';
import AddTeacher from './Admin/AddTeacher/AddTeacher';
import { BrowserRouter as Routes, Route, Navigate, } from 'react-router-dom';
// import Dashboard from './Pages/Admin/Dashboard';
import LoginForm from './Components/LoginForm';
import MainPage from './Pages/mainPage/MainPage';
import EditTeacherByAdmin from './Admin/EditTeacher';
// import DeleteTeacherByAdmin from './Admin/DeleteTeacher';
import SideBar from './Components/Sidebar';
// import EditTeacherItemsByAdmin from './Admin/EditTeacher/EditTeacherItemsByAdmin';
import NavBar from './Components/NavBar';
import SignUp from './Components/SignUp';
// import ProtectedRoute from './Components/ProtectedRoute';
import AllTeacherDataByAdmin from './Admin/AllTeacherDataByAdmin';
import AllTeacherDataPanelByAdmin from './Admin/AllTeacherDataByAdmin/AllTeacherDataPanelByAdmin';
import DeleteTeacherByAdmin from './Admin/DeleteTeacher';
// import DeleteTeacher from './Admin/DeleteTeacher/DeleteTeacher';
// import { Routes } from 'react-router-dom';
// import ProtectedRoute from "./ProtectedRoute";

function App() {

  return (


    <div className='bg-emerald-300 p-1' >
      <ToastContainer />
      <AuthProvider>

        {/* <Routes>
        <Route path="/" element={<MainPage />} />
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
