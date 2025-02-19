import MainPageItems from "./MainPageItems"
import '@/App.css';
import '@/index.css';
import TeacherNavbar from "./TeacherNavbar";
import { useEffect, useRef } from "react";

const MainPage = () => {

    const sidebarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (sidebarRef.current) {
            sidebarRef.current.style.display = 'none';
        }
    }, []);

    return (
        <div className='flex  '>

            <div className='w-full mx-1'>
                <div className="bg-slate-200 fixed top-0 left-0 z-50 shadow-gray-600 shadow-md  w-full rounded-lg flex items-center justify-between" >
                    <TeacherNavbar />
                </div>
                <div className="flex items-center mt-[90px] gap-6 justify-center" >
                    <MainPageItems />
                </div>
            </div>
        </div>
    )
}

export default MainPage