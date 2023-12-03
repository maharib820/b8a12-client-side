import { Link } from "react-router-dom";
import useRole from "../../hooks/useRole";
import { IoIosStar } from "react-icons/io";

const Pricing = () => {

    const [getRole, isRolePending] = useRole();
    // console.log(getRole?.role);

    return isRolePending ?
        <div className="w-full h-screen flex justify-center items-center"><span className="loading loading-ring loading-lg"></span></div>
        :
        (
            <div className="flex justify-center gap-10">
                <div className="shadow-2xl text-center w-60 h-72 relative mt-5 pt-5">
                    <div className="h-7 w-full mx-auto flex justify-center">
                        <IoIosStar className="text-2xl"></IoIosStar>
                    </div>
                    <h2 className="font-bold text-xl">Normal User</h2>
                    <ul className="font-bold my-5">
                        <li>Vote</li>
                        <li>Like</li>
                    </ul>
                    <p>Price: Free</p>
                    {
                        getRole?.role === "user" || getRole?.role === "admin" || getRole?.role === "surveyor" ?
                            <div className="w-full h-12 bg-green-500 text-white flex justify-center items-center absolute bottom-0">
                                <p>Enjoying</p>
                            </div>
                            :
                            <div className="h-12 w-full bg-red-500 text-white flex justify-center items-center absolute bottom-0">
                                <p>Not Available</p>
                            </div>
                    }
                </div>
                <div className="shadow-2xl text-center w-60 h-68 mt-5 pt-5 relative">
                    <div className="h-7 w-full mx-auto flex justify-center">
                        <IoIosStar className="text-2xl"></IoIosStar>
                        <IoIosStar className="text-2xl"></IoIosStar>
                    </div>
                    <h2 className="font-bold text-xl">Pro User</h2>
                    <ul className="font-bold my-5">
                        <li>Vote</li>
                        <li>Like</li>
                        <li>Comment</li>
                    </ul>
                    <p>Price: $10</p>
                    {
                        getRole?.role === "user" ?
                            <Link to="/payment">
                                <button className="btn rounded-none w-full h-12 bg-orange-500 text-white flex justify-center items-center absolute bottom-0">
                                    <p>Buy Now</p>
                                </button>
                            </Link>
                            :
                            (getRole?.role === "pro user" ?
                                <div className="h-12 w-full bg-green-500 text-white flex justify-center items-center absolute bottom-0">
                                    <p>Enjoying</p>
                                </div> :
                                <div className="h-12 w-full bg-red-500 text-white flex justify-center items-center absolute bottom-0">
                                    <p>Not Available</p>
                                </div>)

                    }
                </div>
            </div>
        );
};

export default Pricing;