import MainPageItems from "./MainPageItems"
import '@/App.css';
import '@/index.css';
import TeacherNavbar from "./TeacherNavbar";

const MainPage = () => {
    return (
        <div className='flex  '>

            <div className='w-full mx-1'>
                <div className="bg-slate-200 fixed top-0 left-0 z-50 shadow-gray-600 shadow-md  w-full rounded-lg flex items-center justify-between" >
                    <TeacherNavbar />
                </div>

                <div className="flex items-center mt-[90px] gap-6 justify-center" >
                    {/* <div className="min-w-[350px] p-2 border border-2 border-orange-500 rounded-md">

                    </div>
                    <div className="min-w-[350px] p-2 border border-2 border-orange-500 rounded-md">asdk</div>
                    <div className="min-w-[350px] p-2 border border-2 border-orange-500 rounded-md">asdk</div> */}
                    <MainPageItems />
                </div>
            </div>
        </div>
    )
}

export default MainPage