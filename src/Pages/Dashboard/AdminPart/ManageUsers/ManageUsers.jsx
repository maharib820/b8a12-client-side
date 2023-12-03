import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
// import useFilterUsers from "../../../hooks/useFilterUsers";

const ManageUsers = () => {

    const [newAllUsers, setNewAllUsers] = useState(null);
    const [userRole, setUserRole] = useState(null);

    const axiosPrivate = useAxiosPrivate();

    const { data: allUsers, refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosPrivate.get("/users");
            return res.data;
        }
    })
    // console.log(allUsers);

    const handleRole = (id, role, name) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to set ${name} as ${role}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, set ${role}`
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(id, role, name);
                axiosPrivate.patch(`/user/${id}`, { userRole: role })
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            if (newAllUsers) {
                                if (userRole) {
                                    axiosPrivate.get(`/users/${userRole}`)
                                        .then(res => {
                                            setNewAllUsers(res.data);
                                        })
                                }
                            } else {
                                refetch();
                            }
                            Swal.fire({
                                title: "Updated",
                                text: "Role updated successfully",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleDeleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(id);
                axiosPrivate.delete(`/user/${id}`)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.deletedCount) {
                            if (newAllUsers) {
                                if (userRole) {
                                    axiosPrivate.get(`/users/${userRole}`)
                                        .then(res => {
                                            setNewAllUsers(res.data);
                                        })
                                }
                            } else {
                                refetch();
                            }
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                        else if (res.data.message) {
                            Swal.fire({
                                position: "center",
                                icon: "question",
                                title: `${res.data.message}`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        });
    }

    const handleFilter = (event) => {
        console.log(event.target.value);
        setUserRole(event.target.value)
        // useFilterUsers(event.target.value)
        axiosPrivate.get(`/users/${event.target.value}`)
            .then(res => {
                setNewAllUsers(res.data);
            })
    }
    // console.log(newAllUsers);

    return (
        <div className="overflow-x-auto w-full">
            <h2 className="mb-8 text-2xl font-bold font-lobster">Manage Users</h2>
            <div className="form-control w-full max-w-xs mb-8">
                <label className="label">
                    <span className="label-text">Filter using role</span>
                </label>
                <select onChange={handleFilter} defaultValue={"selected"} className="select select-bordered">
                    <option value="selected" disabled>select</option>
                    <option>surveyor</option>
                    <option>pro user</option>
                    <option>user</option>
                </select>
            </div>
            <table className="table w-full">
                {/* head */}
                <thead>
                    <tr className="border-black">
                        <th>#</th>
                        <th>Profile Picture</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Manage Role</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        newAllUsers ?
                            newAllUsers?.map((user, index) => {
                                return <tr key={user?._id} className="border-black">
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.profilePicture} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user?.name}
                                    </td>
                                    <td>{user?.email}</td>
                                    <td>
                                        {user?.role}
                                    </td>
                                    <td>
                                        <div className={`dropdown dropdown-left dropdown-end`}>
                                            {
                                                user?.role === "admin" ? "" :
                                                    <button tabIndex={0} className="m-1 flex items-center gap-2">
                                                        <FaUsers className="text-2xl text-[#15768d]"></FaUsers>
                                                    </button>
                                            }
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 w-52 rounded-none space-y-2">
                                                <li><button onClick={() => handleRole(user?._id, "admin", user?.name)} className="rounded-none px-2 bg-[#eeeeee] text-left">admin</button></li>
                                                <li><button onClick={() => handleRole(user?._id, "surveyor", user?.name)} className="rounded-none px-2 bg-[#eeeeee] text-left">surveyor</button></li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(user?._id)} className="btn btn-ghost btn-xs">
                                            <FaTrashAlt className="text-red-600 text-xl"></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>
                            })
                            :
                            allUsers?.map((user, index) => {
                                return <tr key={user?._id} className="border-black">
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.profilePicture} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user?.name}
                                    </td>
                                    <td>{user?.email}</td>
                                    <td>
                                        {user?.role}
                                    </td>
                                    <td>
                                        <div className={`dropdown dropdown-left dropdown-end`}>
                                            {
                                                user?.role === "admin" ? "" :
                                                    <button tabIndex={0} className="m-1 flex items-center gap-2">
                                                        <FaUsers className="text-2xl text-[#15768d]"></FaUsers>
                                                    </button>
                                            }
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 w-52 rounded-none space-y-2">
                                                <li><button onClick={() => handleRole(user?._id, "admin", user?.name)} className="rounded-none px-2 bg-[#eeeeee] text-left">admin</button></li>
                                                <li><button onClick={() => handleRole(user?._id, "surveyor", user?.name)} className="rounded-none px-2 bg-[#eeeeee] text-left">surveyor</button></li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(user?._id)} className="btn btn-ghost btn-xs">
                                            <FaTrashAlt className="text-red-600 text-xl"></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>
                            })
                    }
                </tbody>

            </table>
        </div>
    );
};

export default ManageUsers;