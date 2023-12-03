import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";

const SurveyDetails = () => {

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [already, setAlready] = useState("null");
    const [getRole, isRolePending] = useRole();
    // console.log(getRole);

    const [selectedOption, setSelectedOption] = useState(null);
    const [like, setLike] = useState(0);
    const [disLike, setDisLike] = useState(0);

    const { id } = useParams();
    // console.log(id);

    const { data: surveyData, refetch } = useQuery({
        queryKey: ["allSurveys"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/surveydetails/${id}`);
            return res.data;
        }
    })

    useEffect(() => {
        if (surveyData && user?.email) {
            axiosPublic.get(`/getwhoattendsurvey/${surveyData[0]._id}`)
                .then(res => {
                    // console.log(res.data[0]);
                    // console.log(user.email);
                    const check = res?.data?.find(em => em.surveySubmittedBy === user.email);
                    // console.log(check.surveySubmittedBy, 'check');
                    if (check) {
                        setAlready(true);
                    } else {
                        setAlready(false);
                    }
                })
        }
    }, [axiosPublic, surveyData, user?.email])

    // console.log(already);

    // console.log(surveyData[0]);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleLike = () => {
        if (like === 0) {
            setLike(1);
            setDisLike(0);
        } else {
            setLike(0);
        }
    };

    const handleDislike = () => {
        if (disLike === 0) {
            setDisLike(1);
            setLike(0);
        } else {
            setDisLike(0);
        }
    };

    const responseSubmit = e => {
        e.preventDefault();
        let yes = 0;
        let no = 0;
        let total = 1;
        if (selectedOption === null) {
            return alert("select option");
        }
        if (like === 0 && disLike === 0) {
            return alert("please like or dislike")
        }
        if (selectedOption === "Yes") {
            yes = 1;
        } else {
            no = 1;
        }
        const newYes = yes + surveyData[0].yes;
        const newNo = no + surveyData[0].no;
        const newTotal = total + surveyData[0].total;
        const newLike = like + surveyData[0].like;
        const newDisLike = disLike + surveyData[0].dislike;
        const surveySubmittedBy = user?.email;
        const submittedSurveyId = surveyData[0]._id;
        const comment = e.target.comment?.value;
        let newComments = null;
        if (comment) {
            newComments = [...surveyData[0].comments, comment];
            // console.log([...surveyData[0].comments, comment]);
        } else {
            newComments = surveyData[0].comments;
            // console.log(surveyData[0].comments);
        }

        const forUpdate = { newYes, newNo, newTotal, newLike, newDisLike, newComments };
        const forCheck = { surveySubmittedBy, submittedSurveyId }
        const forResponses = {user: user.email, name: user.displayName, time: new Date(), sid: surveyData[0]._id, vote: selectedOption.toLowerCase()}
        const data = [forCheck, forUpdate]
        axiosPublic.patch(`/surveyaftervote/${submittedSurveyId}`, data)
            .then(res => {
                console.log(res.data[0].modifiedCount, "   ", res.data[1].insertedId);
                if (res.data[0].modifiedCount > 0 && res.data[1].insertedId) {
                    axiosPublic.get(`/getwhoattendsurvey/${surveyData[0]._id}`)
                        .then(() => {
                            refetch();
                        })
                }
            })
    }

    return already === "null" ?
        <div className="w-full h-screen flex justify-center items-center"><span className="loading loading-ring loading-lg"></span></div> :
        already === false ?
            (
                <div className="mt-10 overflow-y-auto">
                    <div>
                        {
                            surveyData?.map(survey => {
                                return <div key={survey._id}>
                                    <div className="flex justify-center">
                                        <div className="flex-1 mt-2">
                                            <img src="https://i.ibb.co/nLXkFGp/svey.webp" alt="" />
                                            <div className="flex items-center gap-5 mt-5">
                                                <img className="h-12 w-12 rounded-full" src={survey.surveyorImage} alt="" />
                                                <div>
                                                    <h6 className="font-bold">Posted by: {survey.name}</h6>
                                                    <p>{survey.addedby}</p>
                                                    <p>Published: {survey.publishDate}</p>
                                                    <p>Expired: {survey.expDate}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className="mt-6">Like or Dislike the survey here</h2>
                                                <div className="flex justify-start gap-20 mt-5">
                                                    <div>
                                                        {
                                                            like === 0 ?
                                                                <button><AiOutlineLike className="text-3xl" onClick={handleLike}></AiOutlineLike></button> :
                                                                <button><AiFillLike className="text-3xl" onClick={handleLike}></AiFillLike></button>
                                                        }
                                                    </div>
                                                    <div>
                                                        {
                                                            disLike === 0 ?
                                                                <button><AiOutlineDislike className="text-3xl" onClick={handleDislike}></AiOutlineDislike></button> :
                                                                <button><AiFillDislike className="text-3xl" onClick={handleDislike}></AiFillDislike></button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold mt-10">All added comments</h2>
                                                <div className="h-32 overflow-y-auto mt-4 space-y-2">
                                                    {
                                                        survey.comments.map((survey, index) => {
                                                            return <h5 className="font-bold" key={index}>{index + 1} {survey}</h5>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-5">
                                            <h2 className="font-bold text-2xl">{survey.title}</h2>
                                            <p>{survey.description}</p>
                                            <p className="font-bold">{survey.category}</p>
                                            <div className="mt-8">
                                                <h2 className="font-bold text-2xl">Submit your opinion</h2>
                                                <form onSubmit={responseSubmit}>
                                                    <p className="font-bold mb-2 mt-5">Answer the question</p>
                                                    <h2 className="text-xl font-bold">{survey.question}</h2>
                                                    <div className="space-y-2 mt-4">
                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type="radio"
                                                                id="radio-yes"
                                                                name="radio-group"
                                                                className="radio radio-success"
                                                                value="Yes"
                                                                checked={selectedOption === 'Yes'}
                                                                onChange={handleOptionChange}
                                                            />
                                                            <label htmlFor="radio-yes">Yes</label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type="radio"
                                                                id="radio-no"
                                                                name="radio-group"
                                                                className="radio radio-success"
                                                                value="No"
                                                                checked={selectedOption === 'No'}
                                                                onChange={handleOptionChange}
                                                            />
                                                            <label htmlFor="radio-no">No</label>
                                                        </div>
                                                        {
                                                            isRolePending ?
                                                                <span className="loading loading-ball loading-lg"></span> :
                                                                getRole.role === "pro user" ?
                                                                    <div className="form-control flex-1">
                                                                        <label className="label">
                                                                            <span className="label-text font-bold">Add Comment</span>
                                                                        </label>
                                                                        <input type="text" placeholder="write a comment" name="comment" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" />
                                                                    </div>
                                                                    : ""
                                                        }
                                                    </div>

                                                    <input className="btn mt-16" type="submit" value="Submit" />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            )
            :
            <div className="w-full flex justify-center items-center"><h2>Already Submitted</h2></div>
};

export default SurveyDetails;