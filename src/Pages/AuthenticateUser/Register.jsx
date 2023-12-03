import { FcGoogle } from "react-icons/fc";
import { LuMessagesSquare } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
// console.log(imageHostingKey);

const Register = () => {

    const [loadingg, setLoadingg] = useState(false);

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { createUser, updateUserProfile, logoutUser, googleSignIn } = useAuth();

    const handleRegister = async (event) => {
        event.preventDefault();
        setLoadingg(true);
        const form = event.target;
        // console.log(form);
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const picture = form.picture.files[0];
        const imageFile = { image: picture };
        // console.log(picture);
        const res = await axiosPublic.post(imageHostingApi, imageFile, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })
        if (res.data.success) {
            // console.log(res.data.data.display_url);
            const profilePicture = res.data.data.display_url
            createUser(email, password)
                .then(() => {
                    updateUserProfile(name, profilePicture)
                        .then(() => {
                            const newUser = { name, email, profilePicture, role: "user" };
                            // console.log(newUser);
                            axiosPublic.post("/user", newUser)
                                .then(res => {
                                    // console.log(res.data);
                                    if (res.data.insertedId) {
                                        form.reset();
                                        Swal.fire({
                                            position: "center",
                                            icon: "success",
                                            title: "Your registered successfully",
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                        logoutUser();
                                        setLoadingg(false);
                                        navigate("/login");
                                    }
                                })
                        })
                        .catch(error => {
                            console.log(error);
                        })
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    const handleGoogleAccount = () => {
        googleSignIn()
            .then(r => {
                console.log(r.user);
                const newUser = { name: r.user.displayName, email: r.user.email, profilePicture: r.user.photoURL, role: "user" };
                axiosPublic.post("/user", newUser)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.insertedId || res.data.message === "user already exists") {
                            navigate("/");
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
                        <h1 className="text-3xl font-bold font-lobster">opinion register</h1>
                    </div>
                    <div className="flex justify-center">
                        <form onSubmit={handleRegister} className="w-full lg:w-10/12">
                            <div className="mt-2 mb-2">
                                <label className="label font-bold font-lobster">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input className="border border-[#15768d] w-full py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#15768d] placeholder:text-slate-400" type="text" name="name" placeholder="Mr. John" required />
                            </div>
                            <div className="mb-2">
                                <label className="label font-bold font-lobster">
                                    <span className="label-text">Email Address</span>
                                </label>
                                <input className="border border-[#15768d] w-full py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#15768d] placeholder:text-slate-400" type="email" name="email" placeholder="mrjohn@gmail.com" required />
                            </div>
                            <div className="mb-2">
                                <label className="label font-bold font-lobster">
                                    <span className="label-text">Enter a Password</span>
                                </label>
                                <input className="border border-[#15768d] w-full py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#15768d] placeholder:text-slate-400" type="password" name="password" placeholder="$Aa1234" required />
                            </div>
                            <div>
                                <label className="label font-bold font-lobster">
                                    <span className="label-text">Profile Picture</span>
                                </label>
                                <input type="file" name="picture" className="file-input file-input-bordered w-full rounded-none " required />
                            </div>
                            {
                                loadingg ?
                                    <button className="btn w-full rounded-none bg-[#15768d] mt-8 text-white"><span className="loading loading-spinner loading-md"></span></button>
                                    :
                                    <input className="btn w-full rounded-none bg-[#15768d] mt-8 text-white" type="submit" value="Register" />
                            }
                        </form>
                    </div>
                    <div className="divider">OR</div>
                    <div className="flex justify-center">
                        <button onClick={handleGoogleAccount} className="w-full lg:w-10/12 btn border-2 border-[#15768d] rounded-none"><FcGoogle className="text-2xl"></FcGoogle>google</button>
                    </div>
                    <div className="mt-12"><h3 className="text-center font-semibold">Already have an account? <Link to={"/login"}><span className="text-[#15768d] font-bold">Login</span></Link></h3></div>
                </div>
            </div>
        </div>
    );
};

export default Register;