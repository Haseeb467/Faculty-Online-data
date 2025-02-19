import { Link, } from "react-router-dom"

const SideBar = () => {

    return (
        <div className="h-full rounded-lg bg-blue-400 w-60 text-white p-4">
            <div>
                <h1 className="font-bold text-3xl">
                    Menu Bar
                </h1>
            </div>
            <div className="link ">
                <nav className="mt-8">
                    <ul className="space-y-4">
                        <li className="cursor-pointer py-1  px-3 rounded hover:text-black hover:bg-gray-100 $  text-black border-l-4 border-black bg-gray-200  ">
                            <Link to="/admin/add-teacher" >
                                Add Teacher
                            </Link>
                        </li>

                        <li className="cursor-pointer py-1  px-3 rounded hover:text-black hover:bg-gray-100 $  text-black border-l-4 border-black bg-gray-200  ">
                            <Link to="EditTeacherByAdmin" className="w-full">Edit Teacher </Link>
                        </li>
                        <li className="cursor-pointer py-1  px-3 rounded hover:text-black hover:bg-gray-100 $  text-black border-l-4 border-black bg-gray-200  ">
                            <Link to="DeleteTeacherByAdmin"> Delete Teacher </Link>
                        </li>
                        <li className="cursor-pointer py-1  px-3 rounded hover:text-black hover:bg-gray-100 $  text-black border-l-4 border-black bg-gray-200  ">
                            <Link to="AllTeacherDataPanelByAdmin"> All Teacher </Link>
                        </li>
                        <li className="cursor-pointer py-1  px-3 rounded hover:text-black hover:bg-gray-100 $  text-black border-l-4 border-black bg-gray-200  ">
                            <Link to="userReport"> Report </Link>
                        </li>

                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default SideBar
