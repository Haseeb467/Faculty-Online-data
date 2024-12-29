import React from 'react';
import SideBar from './Sidebar';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = () => {
    return (
        <div className=" bg-gray-100">
            <div className="flex">
                <div className="min-h-screen">
                    <SideBar />
                </div>
                <div className="flex-1">
                    <div className="p-4">
                        <NavBar />
                        <main className="mt-4">
                            <Outlet />
                        </main>
                    </div>
                </div>
            </div>
        </div>

        //  <div className=" bg-gray-100">
        //     <div className="flex">
        //         <div className="w-60 fixed h-screen">
        //             <SideBar />
        //         </div>
        //         <div className="mi-60 flex-1">
        //             <div className="p-4">
        //                 <NavBar />
        //                 <main className="mt-4">
        //                     <Outlet />
        //                 </main>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default AdminLayout;
