import { Link, NavLink, } from "react-router-dom"

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
                        <li className="cursor-pointer py-1 px-3 border-1-4 border-black rounded bg-gray-200 text-black hover:bg-gray-100">
                            <NavLink
                                to="/admin/add-teacher"
                                className={({ isActive }) =>
                                    ` ${isActive ? " bg-gray-100 w-[100%]" : ""}`
                                }
                            >
                                Add Tea
                            </NavLink>
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
