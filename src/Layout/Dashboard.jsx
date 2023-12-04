import { LuMessagesSquare } from "react-icons/lu";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { FaHome, FaUsers } from "react-icons/fa";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { GrDocumentPerformance } from "react-icons/gr";
import useRole from "../hooks/useRole";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { MdFeedback } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";

const Dashboard = () => {

    const location = useLocation();
    const [show, setShow] = useState(false)

    const [getRole, isRolePending] = useRole();
    // console.log(getRole?.role);

    return isRolePending ?
        <div className="w-full h-screen flex justify-center items-center"><span className="loading loading-ring loading-lg"></span>
        </div>
        :
        (
            <div className="max-w-full lg:max-w-7xl h-screen mx-auto bg-[#ffffff] flex">
                <div className="w-80 bg-[#15768d] shadow-md px-4 pt-6 relative hidden lg:flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-1 text-white">
                            <LuMessagesSquare className="text-2xl"></LuMessagesSquare>
                            <h1 className="text-2xl font-bold font-lobster">opinion</h1>
                        </div>
                        <div className="w-full h-[1px] bg-white mt-6"></div>
                        <div>
                            <ul className="text-white pt-9 space-y-2">
                                {
                                    getRole?.role === "admin" &&
                                    <>
                                        <li>
                                            <NavLink to={"/dashboard/manageusers"} className={`flex items-center gap-4 py-3 hover:bg-[#1c5a69] pl-2 ${location.pathname === "/dashboard/manageusers" ? "bg-[#1c5a69]" : ""}`}><FaUsers className="text-xl"></FaUsers>Manage Users</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"/dashboard/managesurveystatus"} className={`flex items-center gap-4 py-3 hover:bg-[#1c5a69] pl-2 ${location.pathname === "/dashboard/managesurveystatus" ? "bg-[#1c5a69]" : ""}`}><MdOutlineManageAccounts className="text-xl"></MdOutlineManageAccounts>Manage Surveys Status</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"/dashboard/paymenthistory"} className={`flex items-center gap-4 py-3 hover:bg-[#1c5a69] pl-2 ${location.pathname === "/dashboard/paymenthistory" ? "bg-[#1c5a69]" : ""}`}><MdOutlinePayments className="text-xl"></MdOutlinePayments>Payment Details</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"/dashboard/adminsurveyresponses"} className={`flex items-center gap-4 py-3 hover:bg-[#1c5a69] pl-2 ${location.pathname === "/dashboard/adminsurveyresponses" ? "bg-[#1c5a69]" : ""}`}><GrDocumentPerformance className="text-xl"></GrDocumentPerformance>Survey Responses</NavLink>
                                        </li>
                                    </>
                                }
                                {
                                    getRole?.role === "surveyor" &&
                                    <>
                                        <li>
                                            <NavLink to={"/dashboard/createsurvey"} className={`flex items-center gap-4 py-3 hover:bg-[#1c5a69] pl-2 ${location.pathname === "/dashboard/createsurvey" ? "bg-[#1c5a69]" : ""}`}><FaUsers className="text-xl"></FaUsers>Create New Survey</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"/dashboard/alladdedsurveys"} className={`flex items-center gap-4 py-3 hover:bg-[#1c5a69] pl-2 ${location.pathname === "/dashboard/alladdedsurveys" ? "bg-[#1c5a69]" : ""}`}><MdOutlineManageAccounts className="text-xl"></MdOutlineManageAccounts>All Added Survey</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"/dashboard/surveyorsurveyresponses"} className={`flex items-center gap-4 py-3 hover:bg-[#1c5a69] pl-2 ${location.pathname === "/dashboard/surveyorsurveyresponses" ? "bg-[#1c5a69]" : ""}`}><MdOutlinePayments className="text-xl"></MdOutlinePayments>Survey Responses</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"/dashboard/adminfeedback"} className={`flex items-center gap-4 py-3 hover:bg-[#1c5a69] pl-2 ${location.pathname === "/dashboard/adminfeedback" ? "bg-[#1c5a69]" : ""}`}><MdFeedback className="text-xl"></MdFeedback>Admin Responses</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"/dashboard/usersfeedback"} className={`flex items-center gap-4 py-3 hover:bg-[#1c5a69] pl-2 ${location.pathname === "/dashboard/usersfeedback" ? "bg-[#1c5a69]" : ""}`}><VscFeedback className="text-xl"></VscFeedback>Admin Responses</NavLink>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="mb-5 border-t-2">
                        <ul className="text-white pt-5 space-y-2">
                            <li>
                                <Link to={"/"} className={`flex items-center gap-4 py-3 w-full pl-2`}>
                                    <FaHome className="text-xl"></FaHome>Home
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-full text-center">
                    <button className="mt-8 lg:hidden" onClick={() => setShow(!show)}><IoIosMenu className="text-3xl"></IoIosMenu></button>
                    <div className={show ? "w-full lg:hidden" : "hidden"}>
                        <div className="bg-slate-400">
                            <ul className="text-white pt-9 space-y-2">
                                {
                                    getRole?.role === "admin" &&
                                    <>
                                        <li>
                                            <NavLink to={"/dashboard/manageusers"} className={`flex items-center gap-4 py-3 hover:bg-[#1c5a69] pl-2 ${location.pathname === "/dashboard/manageusers" ? "bg-[#1c5a69]" : ""}`}><FaUsers className="text-xl"></FaUsers>Manage Users</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"/dashboard/managesurveystatus"} className={`flex items-center gap-4 py-3 hover:bg-[#1c5a69] pl-2 ${location.pathname === "/dashboard/managesurveystatus" ? "bg-[#1c5a69]" : ""}`}><MdOutlineManageAccounts className="text-xl"></MdOutlineManageAccounts>Manage Surveys Status</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"/dashboard/paymenthistory"} className={`flex items-center gap-4 py-3 hover:bg-[#1c5a69] pl-2 ${location.pathname === "/dashboard/paymenthistory" ? "bg-[#1c5a69]" : ""}`}><MdOutlinePayments className="text-xl"></MdOutlinePayments>Payment Details</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"/dashboard/bookings"} className={`flex items-center gap-4 py-3 hover:bg-[#1c5a69] pl-2 ${location.pathname === "/dashboard/bookings" ? "bg-[#1c5a69]" : ""}`}><GrDocumentPerformance className="text-xl"></GrDocumentPerformance>Survey Responses</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"/"} className={`flex items-center gap-4 py-3 hover:bg-[#1c5a69] pl-2`}><FaHome className="text-xl"></FaHome>Home</NavLink>
                                        </li>
                                    </>
                                }
                                {
                                    getRole?.role === "surveyor" &&
                                    <>
                                        <li>
                                            <NavLink to={"/dashboard/createsurvey"} className={`flex items-center gap-4 py-3 hover:bg-[#1c5a69] pl-2 ${location.pathname === "/dashboard/createsurvey" ? "bg-[#1c5a69]" : ""}`}><FaUsers className="text-xl"></FaUsers>Create New Survey</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"/dashboard/alladdedsurveys"} className={`flex items-center gap-4 py-3 hover:bg-[#1c5a69] pl-2 ${location.pathname === "/dashboard/alladdedsurveys" ? "bg-[#1c5a69]" : ""}`}><MdOutlineManageAccounts className="text-xl"></MdOutlineManageAccounts>All Added Survey</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"/dashboard/bookings"} className={`flex items-center gap-4 py-3 hover:bg-[#1c5a69] pl-2 ${location.pathname === "/dashboard/bookings" ? "bg-[#1c5a69]" : ""}`}><MdOutlinePayments className="text-xl"></MdOutlinePayments>Survey Responses</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"/"} className={`flex items-center gap-4 py-3 hover:bg-[#1c5a69] pl-2`}><FaHome className="text-xl"></FaHome>Home</NavLink>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="px-5 pt-6 w-full">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        )
};

export default Dashboard;