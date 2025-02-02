import SideBar from '@/Components/Sidebar'

const Layout = () => {
    return (
        <div className='flex '>
            <div>
                <SideBar />
            </div>
            <div className='w-full mx-1'>
                <div className="bg-slate-200  w-full rounded-lg flex items-center justify-between">
                    <div style={{ marginLeft: "20px", padding: "20px", width: "100%" }}>
                        
                        <h2>add teacher</h2>
                    </div>
                    <div className="px-3 profile-section flex items-center gap-8">
                        <div className="profile-info text-right">
                            <p className="font-semibold">Admin Name</p>
                            <p className="text-sm text-gray-500">admin@example.com</p>
                        </div>
                        <div className="profile-pic w-10 h-10 rounded-full bg-gray-300">
                        </div>
                        <button
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