import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";
import moment from "moment";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Swal from "sweetalert2";

const SurveyDetails = () => {

    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [already, setAlready] = useState("null");
    const [getRole, isRolePending] = useRole();

    const [selectedOption, setSelectedOption] = useState(null);
    const [like, setLike] = useState(0);
    const [disLike, setDisLike] = useState(0);

    const { id } = useParams();

    const { data: surveyData, refetch, isPending } = useQuery({
        queryKey: ["surveyData"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/surveydetails/${id}`);
            return res.data;
        }
    })

    useEffect(() => {
        if (surveyData && user?.email) {
            axiosPublic.get(`/getwhoattendsurvey/${surveyData._id}`)
                .then(res => {
                    const check = res?.data?.find(em => em.surveySubmittedBy === user.email);
                    if (check) {
                        setAlready(true);
                    } else {
                        setAlready(false);
                    }
                })
        }
    }, [axiosPublic, surveyData, user?.email, like])

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
            return Swal.fire({
                position: "center",
                icon: "warning",
                title: "Please select an option",
                showConfirmButton: false,
                timer: 1500
            });
        }
        if (like === 0 && disLike === 0) {
            return Swal.fire({
                position: "center",
                icon: "warning",
                title: "Please like or dislike",
                showConfirmButton: false,
                timer: 1500
            });
        }
        if (selectedOption === "Yes") {
            yes = 1;
        } else {
            no = 1;
        }
        const newYes = yes + surveyData.yes;
        const newNo = no + surveyData.no;
        const newTotal = total + surveyData.total;
        const newLike = like + surveyData.like;
        const newDisLike = disLike + surveyData.dislike;
        const surveySubmittedBy = user?.email;
        const submittedSurveyId = surveyData._id;
        const comment = e.target.comment?.value;
        const report = e.target.report?.value;
        let newComments = null;
        let newReports = null;
        if (comment) {
            newComments = [...surveyData.comments, comment];
        } else {
            newComments = surveyData.comments;
        }
        if (report) {
            newReports = [...surveyData.reports, comment];
        } else {
            newReports = surveyData.comments;
        }

        const forUpdate = { newYes, newNo, newTotal, newLike, newDisLike, newComments, newReports };
        const forCheck = { surveySubmittedBy, submittedSurveyId }
        console.log(forUpdate);
        console.log(forCheck);
        // const forResponses = { user: user.email, name: user.displayName, time: new Date(), sid: surveyData[0]._id, vote: selectedOption.toLowerCase() }
        const data = [forCheck, forUpdate]
        axiosPublic.patch(`/surveyaftervote/${submittedSurveyId}`, data)
            .then(res => {
                console.log(res.data[0]);
                if (res.data[0].modifiedCount > 0 && res.data[1].insertedId) {
                    axiosPublic.get(`/getwhoattendsurvey/${surveyData._id}`)
                        .then(() => {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Vote Successful",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            setLike(0);
                            setDisLike(0);
                            setSelectedOption(null);
                            e.target.comment.value = ""
                            e.target.report.value = ""
                            refetch();
                            navigate("/surveypage");
                        })
                }
            })
    }

    // for chart
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    const [showR, setShowR] = useState(false);
    // console.log(getRole.role);

    return <div className="mt-10 overflow-y-auto">
        <div>
            {
                (isPending) ? ""
                    :
                    <div key={surveyData._id}>
                        <div className="flex justify-center">
                            <div className="flex-1 mt-2 pr-20">
                                <div>
                                    <div className="flex items-center gap-5 mb-8">
                                        <img className="h-12 w-12 rounded-full" src={surveyData.surveyorImage} alt="" />
                                        <div>
                                            <h6 className="font-bold">Posted by: {surveyData.name}</h6>
                                            <p>{surveyData.addedby}</p>
                                            <p>Published: {surveyData.expDate.toString().split('T')[0]}</p>
                                            <p>Expires {moment(new Date(surveyData.expDate)).endOf().fromNow()}</p>
                                        </div>
                                    </div>
                                    <img src="https://i.ibb.co/nLXkFGp/svey.webp" alt="" />
                                </div>
                                <div>
                                    <div className="flex justify-start gap-5 mt-5">
                                        <div>
                                            {
                                                like === 0 ?
                                                    <button><AiOutlineLike className="text-2xl text-green-500" onClick={handleLike}></AiOutlineLike></button> :
                                                    <button><AiFillLike className="text-2xl text-green-500" onClick={handleLike}></AiFillLike></button>
                                            }
                                        </div>
                                        <div>
                                            {
                                                disLike === 0 ?
                                                    <button><AiOutlineDislike className="text-2xl text-red-500" onClick={handleDislike}></AiOutlineDislike></button> :
                                                    <button><AiFillDislike className="text-2xl text-red-500" onClick={handleDislike}></AiFillDislike></button>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="shadow-xl mb-10 bg-slate-600 px-5 pb-5 mt-6">
                                    <h2 className="text-base font-bold pt-5 text-white">All added comments</h2>
                                    <div className="h-64 overflow-y-auto mt-4 space-y-5 bg-slate-100 px-5 pt-5">
                                        {
                                            surveyData.comments.map((survey, index) => {
                                                return <h5 className="font-bold bg-slate-400 px-2 py-1" key={index}>{index + 1} {survey}</h5>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 space-y-5">
                                <h2 className="font-bold text-2xl">{surveyData.title}</h2>
                                <p>{surveyData.description}</p>
                                <p className="font-bold">Category: {surveyData.category}</p>
                                <div className="mt-8">
                                    <h2 className="font-bold mt-8 text-lg">Submit your opinion</h2>
                                    <form onSubmit={responseSubmit}>
                                        <h2 className="font-bold mt-8">{surveyData.question}</h2>
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
                                                            <div className="relative mt-10">
                                                                <label className="label">
                                                                    <span className="label-text font-bold">Add Comment</span>
                                                                </label>
                                                                <input type="text" placeholder="write a comment" name="comment" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12 w-full" />
                                                            </div>
                                                        </div>
                                                        : ""
                                            }
                                        </div>
                                        <div className="my-10">
                                            <h5>Do you think survey contains inappropriate content <span onClick={() => setShowR(!showR)} className="text-xl font-bold text-red-600">Report Now</span></h5>
                                            <div className={showR ? "" : "hidden"}>
                                                <input type="text" placeholder="write a report" name="report" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12 w-full mt-4" />
                                            </div>
                                        </div>
                                        {
                                            already === "null" ? ""
                                                :
                                                (new Date(surveyData?.expDate) - new Date() <= 0 || already === true || getRole.role === "admin" || getRole.role === "surveyor") ? "" :
                                                    <input className="btn mt-5 bg-green-500 text-white" type="submit" value="Submit" />
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                        {
                            (new Date(surveyData?.expDate) - new Date() <= 0 || already === true) ?
                                <div>
                                    {refetch}
                                    {
                                        <div className="flex">
                                            <div>
                                                <div>
                                                    <p>Yes Voted: {surveyData.yes}</p>
                                                    <p>No Voted: {surveyData.no}</p>
                                                    <BarChart
                                                        width={500}
                                                        height={300}
                                                        data={[{ name: "yes", uv: surveyData.yes }, { name: "no", uv: surveyData.no }]}
                                                        margin={{
                                                            top: 20,
                                                            right: 30,
                                                            left: 20,
                                                            bottom: 5,
                                                        }}
                                                    >
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="name" />
                                                        <YAxis />
                                                        <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                                                        </Bar>
                                                    </BarChart>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <p>Liked: {surveyData.like}</p>
                                                    <p>Disliked: {surveyData.dislike}</p>
                                                    <BarChart
                                                        width={500}
                                                        height={300}
                                                        data={[{ name: "like", uv: surveyData.like }, { name: "dislike", uv: surveyData.dislike }]}
                                                        margin={{
                                                            top: 20,
                                                            right: 30,
                                                            left: 20,
                                                            bottom: 5,
                                                        }}
                                                    >
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="name" />
                                                        <YAxis />
                                                        <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                                                        </Bar>
                                                    </BarChart>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                :
                                ""
                        }
                    </div>
            }
        </div>
    </div>
};

export default SurveyDetails;