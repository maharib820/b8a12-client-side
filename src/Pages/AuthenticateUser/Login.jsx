import { FcGoogle } from "react-icons/fc";
import { LuMessagesSquare } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {

    const [loadingg, setLoadingg] = useState(false);

    const { loginUser, googleSignIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleLogin = (event) => {
        event.preventDefault();
        setLoadingg(true);
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        loginUser(email, password)
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your logged in successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                form.reset();
                setLoadingg(false);
                navigate(location?.state ? location.state : "/")
            })
            .catch(error => {
                console.log(error);
                setLoadingg(false)
            })
    }

    const handleGoogleAccount = () => {
        googleSignIn()
            .then(r => {
                // console.log(r.user);
                const newUser = { name: r.user?.displayName, email: r.user?.email, profilePicture: r.user?.photoURL, role: "user" };
                axiosPublic.post("/user", newUser)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.insertedId || res.data.message === "user already exists") {
                            navigate(location?.state ? location.state : "/")
                        }
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="mb-10">
            <div className="flex justify-center">
                <div className="w-full lg:w-3/5 xl:w-1/3 border rounded-2xl mt-14 p-5 lg:pt-10">
                    <div className="flex justify-center items-center gap-1 text-[#15768d] mb-8">
                        <LuMessagesSquare className="text-3xl"></LuMessagesSquare>
                        <h1 className="text-3xl font-bold font-lobster">opinion login</h1>
                    </div>
                    <div className="flex justify-center">
                        <form onSubmit={handleLogin} className="w-full lg:w-10/12">
                            <div className="mb-2">
                                <label className="label font-bold font-lobster">
                                    <span className="label-text">Email Address</span>
                                </label>
                                <input className="border border-[#15768d] w-full py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#15768d] placeholder:text-slate-400" type="email" name="email" placeholder="mrjohn@gmail.com" />
                            </div>
                            <div className="">
                                <label className="label font-bold font-lobster">
                                    <span className="label-text">Enter your Password</span>
                                </label>
                                <input className="border border-[#15768d] w-full py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#15768d] placeholder:text-slate-400" type="password" name="password" placeholder="$Aa1234" />
                            </div>
                            {
                                loadingg ?
                                    <button className="btn w-full rounded-none bg-[#15768d] mt-8 text-white"><span className="loading loading-spinner loading-md"></span></button>
                                    :
                                    <input className="btn w-full rounded-none bg-[#15768d] mt-8 text-white" type="submit" value="Login" />
                            }
                        </form>
                    </div>
                    <div className="divider">OR</div>
                    <div className="flex justify-center">
                        <button onClick={handleGoogleAccount} className="w-full lg:w-10/12 btn border-2 border-[#15768d] rounded-none"><FcGoogle className="text-2xl"></FcGoogle>google</button>
                    </div>
                    <div className="mt-12"><h3 className="text-center font-semibold">Do not have an account? <Link to={"/register"}><span className="text-[#15768d] font-bold">Register</span></Link></h3></div>
                </div>
            </div>
        </div>
    );
};

export default Login;