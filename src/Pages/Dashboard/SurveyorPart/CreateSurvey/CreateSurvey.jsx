import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";


const CreateSurvey = () => {

    const [datee, setDatee] = useState(null);

    useEffect(() => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        const tomorrow = today.toISOString().split('T')[0];
        setDatee(tomorrow)
    }, [setDatee])

    const { user } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const handleSurevySubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const question = form.question.value;
        const category = form.category.value;
        const expDate = new Date(form.date.value).toISOString();
        const surveyData = { title, description, question, category, addedby: user.email, addedName: user.displayName, surveyorImage: user.photoURL, status: "publish", expDate: expDate, yes: 0, no: 0, like: 0, dislike: 0, total: 0, comments: [], reports: [] };
        // console.log(surveyData);
        axiosPrivate.post("/createsurvey", surveyData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Survey created successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    form.reset();
                }
            })
    }

    return (
        <div>
            <h2 className="text-3xl font-bold font-lobster mb-5">Post a new survey</h2>
            <div>
                <form onSubmit={handleSurevySubmit} className="space-y-2">
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text font-bold">Title</span>
                        </label>
                        <input type="text" placeholder="write survey title" name="title" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text font-bold">Survey Description</span>
                        </label>
                        <textarea name="description" placeholder="write description on your survey" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-32 pt-2" required />
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text font-bold">Ask Question</span>
                        </label>
                        <input type="text" placeholder="ask survey question" name="question" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text font-bold">Survey Category</span>
                        </label>
                        <input type="text" placeholder="write survey category" name="category" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text font-bold">Deadline</span>
                        </label>
                        <input type="date" min={datee} name="date" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                    </div>
                    <div className="flex justify-start">
                        <input className="btn px-12 my-6 bg-[#1d794b] text-white rounded-none" type="submit" value="Create" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSurvey;