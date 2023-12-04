import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UpdateCreatedSurvejs = () => {

    const [datee, setDatee] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const today = new Date();
        today.setDate(today.getDate());
        const tomorrow = today.toISOString().split('T')[0];
        setDatee(tomorrow)
    }, [setDatee])

    const params = useParams();
    const axiosPrivate = useAxiosPrivate();

    const { data: survey, refetch } = useQuery({
        queryKey: ["survey", params.id],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/surveydetails/${params.id}`)
            return res.data;
        }
    });

    const handleSurveyUpdate = e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const question = form.question.value;
        const category = form.category.value;
        const expDate = new Date(form.date.value).toISOString();
        const modifiedData = { title, description, question, category, expDate };
        axiosPrivate.patch(`/updatecreatedsurvey/${params.id}`, modifiedData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your survey updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                    navigate("/dashboard/alladdedsurveys");
                }
            })
    }

    return (
        <div>
            <h2 className="text-3xl font-bold font-lobster mb-5">Update the Survey</h2>
            <form onSubmit={handleSurveyUpdate} className="space-y-2">
                <div className="form-control flex-1">
                    <label className="label">
                        <span className="label-text font-bold">Title</span>
                    </label>
                    <input defaultValue={survey?.title} type="text" placeholder="write survey title" name="title" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                </div>
                <div className="form-control flex-1">
                    <label className="label">
                        <span className="label-text font-bold">Survey Description</span>
                    </label>
                    <textarea defaultValue={survey?.description} name="description" placeholder="write description on your survey" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-32 pt-2" required />
                </div>
                <div className="form-control flex-1">
                    <label className="label">
                        <span className="label-text font-bold">Ask Question</span>
                    </label>
                    <input defaultValue={survey?.question} type="text" placeholder="ask survey question" name="question" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                </div>
                <div className="form-control flex-1">
                    <label className="label">
                        <span className="label-text font-bold">Survey Category</span>
                    </label>
                    <input defaultValue={survey?.category} type="text" placeholder="write survey category" name="category" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                </div>
                <div className="form-control flex-1">
                    <label className="label">
                        <span className="label-text font-bold">Deadline</span>
                    </label>
                    <input defaultValue={survey?.expDate.toString().split('T')[0]} type="date" min={datee} name="date" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                </div>
                <div className="flex justify-start">
                    <input className="btn px-12 my-6 bg-[#1d794b] text-white rounded-none" type="submit" value="Update" />
                </div>
            </form>
        </div>
    );
};

export default UpdateCreatedSurvejs;