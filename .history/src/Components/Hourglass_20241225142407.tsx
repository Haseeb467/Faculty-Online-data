

const Hourglass = () => {
    return (
        <div className="relative bg-gray-700 h-32 w-32 rounded-full mx-auto my-8">
            <div className="absolute top-8 left-10 w-12 h-16 animate-hourglass-rotate">
                {/* Hourglass Curves */}
                <div className="relative">
                    <div className="absolute top-8 left-[3.5rem] w-1.5 h-1.5 bg-gray-800 rounded-full animate-hourglass-hide"></div>
                    <div className="absolute top-8 left-[7rem] w-1.5 h-1.5 bg-gray-800 rounded-full animate-hourglass-hide"></div>
                </div>

                {/* Top Cap */}
                <div className="absolute w-full h-2.5 bg-gray-800 rounded-t-xl"></div>

                {/* Hourglass Glass Top */}
                <div className="absolute top-[-4px] left-0 w-11 h-11 bg-gray-400 rounded-full rotate-x-90"></div>

                {/* Hourglass Glass */}
                <div className="absolute top-8 left-5 w-2.5 h-1.5 bg-gray-400 opacity-50"></div>

                {/* Sand */}
                <div className="absolute">
                    {/* Filling Sand */}
                    <div className="absolute left-1.5 w-[2.4rem] h-[2.4rem] bg-white rounded-b-[50%] animate-sand-fillup"></div>
                    {/* Depleting Sand */}
                    <div className="absolute top-[1rem] w-[3rem] h-[1rem] bg-white rounded-t-[50%] animate-sand-deplete"></div>
                </div>

                {/* Sand Stream */}
                <div className="absolute left-[6rem] w-0.5 bg-white animate-sand-stream"></div>
            </div>
        </div>
    );
};

export default Hourglass;
