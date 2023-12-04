import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const AdminResponse = () => {

    const axiosPrivate = useAxiosPrivate();

    const { user } = useAuth();

    const { data: aresponse } = useQuery({
        queryKey: ["aresponses"],
        queryFn: async () => {
            if (user.email) {
                const res = await axiosPrivate.get(`/surveyorsurveyresponses/${user.email}`);
                return res.data;
            }
        }
    })

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            aresponse?.map((re, index) => {
                                return <tr key={re._id}>
                                    <th>{index + 1}</th>
                                    <td>{re.title}</td>
                                    <td>{re.status}</td>
                                    <td>
                                        {
                                            re?.status === "publish" ? "" :
                                                <div>
                                                    <button className="bg-red-600 text-white px-4 rounded-xl" onClick={() => document.getElementById('my_modal_1').showModal()}>feedback</button>
                                                    <dialog id="my_modal_1" className="modal">
                                                        <div className="modal-box">
                                                            <h3 className="font-bold text-lg text-center">Feedback</h3>
                                                            <p className="py-4 text-center">{re?.feedback}</p>
                                                            <div className="modal-action">
                                                                <form method="dialog">
                                                                    {/* if there is a button in form, it will close the modal */}
                                                                    <button className="btn">Close</button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </dialog>
                                                </div>
                                        }
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminResponse;