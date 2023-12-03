import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import { useState } from "react";

const ManageSurveysStatus = () => {

    const [visible, setVisible] = useState(false);
    const [btnId, setBtnId] = useState(null);

    const axiosPrivate = useAxiosPrivate();

    const { data: allSurveys, refetch } = useQuery({
        queryKey: ["allSurveys"],
        queryFn: async () => {
            const res = await axiosPrivate.get("/allsurveys");
            return res.data;
        }
    })

    // console.log(allSurveys);

    const handlePublishStatus = (id) => {
        // console.log(status);
        const feedback = "";
        const status = "publish";
        const changes = { status, feedback };
        axiosPrivate.patch(`/updatestatus/${id}`, changes)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Status have changed",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
    }

    const handleUnPublish = (id, event) => {
        event.preventDefault();
        const form = event.target;
        const feedback = form.feedback.value;
        const status = "unpublish";
        const changes = { status, feedback };
        axiosPrivate.patch(`/updatestatus/${id}`, changes)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Status have changed",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
    }

    const handleVisible = (id) => {
        setVisible(!visible);
        setBtnId(id)
    }

    return (
        <div>
            <h2 className="mb-8 text-2xl font-bold font-lobster">Manage Surveys</h2>
            <div className="grid grid-cols-1 gap-5">
                {
                    allSurveys?.map(survey => {
                        return <div key={survey._id} className="bg-white shadow-xl rounded-lg p-5">
                            <h2 className="font-bold text-xl mb-5">{survey.title}</h2>
                            <p>
                                {survey.description}
                            </p>
                            <h4 className="my-5 font-bold">Category: {survey.category}</h4>
                            <p className="mb-5 font-bold">Added By: {survey.addedby}</p>
                            <p className="font-bold mb-5">Status: {survey.status}</p>
                            <div>
                                {
                                    survey.status === "publish" &&
                                    <div>
                                        <button onClick={() => handleVisible(survey._id)} className="btn bg-orange-600 text-white">
                                            <CiEdit></CiEdit>
                                            Unpublish
                                        </button>
                                        <form className={`${survey._id===btnId && visible ? "" : "hidden"}`} onSubmit={(event) => handleUnPublish(survey._id, event)}>
                                            <div className={`form-control flex-1`}>
                                                <label className="label">
                                                    <span className="label-text font-bold">Send Feedback</span>
                                                </label>
                                                <textarea name="feedback" placeholder="write reason for unpublish" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-32 pt-2" required />
                                            </div>
                                            <div className="flex justify-start">
                                                <input className="btn px-12 my-6 bg-[#d81414] text-white rounded-none" type="submit" value="Make Unpublish" />
                                            </div>
                                        </form>
                                    </div>
                                }
                                {
                                    survey.status === "unpublish" &&
                                    <button onClick={() => handlePublishStatus(survey._id)} className="btn bg-orange-600 text-white">
                                        <CiEdit></CiEdit>
                                        Publish
                                    </button>
                                }
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default ManageSurveysStatus;