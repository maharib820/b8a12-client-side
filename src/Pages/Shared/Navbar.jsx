import { LuMessagesSquare } from "react-icons/lu";
import { GoPerson } from "react-icons/go";
import { Link, NavLink, useLocation } from "react-router-dom";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";
import { IoIosMenu } from "react-icons/io";
import { useState } from "react";

const Navbar = () => {

    const location = useLocation()

    const links =
        <>
            <li><NavLink className={location.pathname === "/" ? "bg-[#1c5a69] font-bold lg:py-[5px] lg:px-4 text-red-600 lg:text-white" : ""} to="/">Home</NavLink></li>
            <li><NavLink className={location.pathname === "/surveypage" ? "bg-[#1c5a69] font-bold lg:py-[5px] lg:px-4 text-red-600 lg:text-white" : ""} to="/surveypage">Surveys</NavLink></li>
            <li><NavLink className={location.pathname === "/pricing" ? "bg-[#1c5a69] font-bold lg:py-[5px] lg:px-4 text-red-600 lg:text-white" : ""} to="/pricing">Our Pricing</NavLink></li>
        </>

    const [getRole] = useRole();
    const { user, loading, logoutUser } = useAuth();

    const [view, setView] = useState(false)

    return (
        <div>
            <div className="max-w-7xl  mx-auto flex justify-between items-center h-16 px-2 lg:px-0">
                <div className="flex items-center gap-1 text-[#15768d]">
                    <LuMessagesSquare className="text-3xl"></LuMessagesSquare>
                    <h1 className="text-3xl font-bold font-lobster">opinion</h1>
                </div>
                <div className="flex items-center gap-10">
                    {
                        user && getRole?.role === "admin" && <Link to="/dashboard/manageusers"><button className="m-1 btn text-[#15768d] font-bold bg-[#f2f2f2]">Dashboard</button></Link>
                    }
                    {
                        user && getRole?.role === "surveyor" && <Link to="/dashboard/createsurvey"><button className="m-1 btn text-[#15768d] font-bold bg-[#f2f2f2]">Dashboard</button></Link>
                    }
                    {
                        user && (getRole?.role === "user" || getRole?.role === "pro user") && <button className="m-1 btn text-[#15768d] font-bold bg-[#f2f2f2]">Dashboard</button>
                    }
                    {
                        loading ? <div><span className="loading loading-ring loading-md"></span></div> :
                            user ?
                                <div className="dropdown dropdown-end">
                                    <img tabIndex={0} className="h-10 w-10 rounded-full shadow-lg" src={user.photoURL} alt="" />
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 mt-3 border shadow-md bg-base-100 w-52 space-y-4">
                                        <li className="font-bold">{user.displayName}</li>
                                        <li className="">{user.email}</li>
                                        <li onClick={logoutUser} className="px-4 text-white bg-red-600 btn rounded-none">Logout</li>
                                    </ul>
                                </div>
                                :
                                <Link to="/login">
                                    <div className="flex items-center gap-2 text-[#15768d]">
                                        <GoPerson className="text-3xl"></GoPerson>
                                        <p className="font-bold">
                                            Log in<br></br>
                                            Register
                                        </p>
                                    </div>
                                </Link>
                    }
                </div>
            </div>
            <div className="h-8 bg-[#15768d] hidden lg:flex">
                <div className="max-w-7xl  mx-auto h-full flex items-center">
                    <ul className="flex items-center gap-12 text-white">
                        {links}
                    </ul>
                </div>
            </div>
            <div className="flex justify-center my-5 lg:hidden">
                <div className="text-center">
                    <button onClick={() => setView(!view)}><IoIosMenu className="text-3xl"></IoIosMenu></button>
                    <div className={view ? "bg-black text-white p-5" : "hidden"}>
                        <ul className="space-y-2">
                            {links}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;