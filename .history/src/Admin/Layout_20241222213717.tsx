import SideBar from '@/Components/Sidebar'

const Layout = () => {
    return (
        <div className='flex '>
            <div>
                <SideBar />
            </div>
            <div className='w-full mx-1'>
                <div className="bg-slate-200  w-full rounded rounded-lg flex items-center justify-between">
                    <div style={{ marginLeft: "20px", padding: "20px", width: "100%" }}>
                        {/* Display content based on active item */}
                        {/* {activeItem === "Add Teacher" && <h3>Add Teacher Form</h3>}
                {activeItem === "Edit Teacher" && <h3>Edit Teacher Form</h3>}
                {activeItem === "Delete Teacher" && <h3>Delete Teacher Form</h3>} */}
                        <h2>add teacher</h2>
                    </div>
                    <div className="px-3 profile-section flex items-center gap-8">
                        <div className="profile-info text-right">
                            <p className="font-semibold">Admin Name</p>
                            <p className="text-sm text-gray-500">admin@example.com</p>
                        </div>

                        {/* Profile Picture (Placeholder) */}
                        <div className="profile-pic w-10 h-10 rounded-full bg-gray-300">

                        </div>

                        {/* Logout Button */}
                        <button
                            // onClick={handleLogout}
                            className="text-red-500 text-sm font-medium"
                        >
                            Logout
                        </button>
                    </div>

                </div>

                <div>
                    sdkfkl
                </div>
            </div>
        </div>
    )
}

export default Layout