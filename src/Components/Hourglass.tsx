import "./Loader.css"; // Place the CSS in a separate file or inline

const Loader = () => {
    return (
        <div className="hourglassBackground">
            <div className="hourglassContainer">
                <div className="hourglassCurves"></div>
                <div className="hourglassCapTop"></div>
                <div className="hourglassGlassTop"></div>
                <div className="hourglassSand"></div>
                <div className="hourglassSandStream"></div>
                <div className="hourglassCapBottom"></div>
                <div className="hourglassGlass"></div>
            </div>
        </div>
    );
};

export default Loader;
