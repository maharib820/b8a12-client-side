import useAxiosPublic from "../../hooks/useAxiosPublic";
import useRole from "../../hooks/useRole";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaLevelUpAlt } from "react-icons/fa";
import { FaLevelDownAlt } from "react-icons/fa";

const SurveyPage = () => {

    const [getRole, isRolePending] = useRole();
    const [allSurveys, setAllSurveys] = useState(null);
    const [isPending, setIsPending] = useState(true);

    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get("/publishedsurveys")
            .then(res => {
                setAllSurveys(res.data);
                setIsPending(false)
            })
    }, [axiosPublic])

    // const { data: allSurveys, isPending } = useQuery({
    //     queryKey: ["allSurveys"],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get("/publishedsurveys");
    //         return res.data;
    //     }
    // })

    const handleTitleSearch = e => {
        e.preventDefault();
        const text = e.target.search.value;
        axiosPublic.get(`/publishedsurveysfilter?title=${text}`)
            .then(res => {
                setAllSurveys(res.data);
                setIsPending(false)
            })
    }

    const handleCategorySearch = e => {
        e.preventDefault();
        const category = e.target.category.value;
        axiosPublic.get(`/publishedsurveysfilterC?category=${category}`)
            .then(res => {
                setAllSurveys(res.data);
                setIsPending(false)
            })
    }

    const handleLowtoHigh = () => {
        axiosPublic.get(`/publishedsurveysfilterS?value=${1}`)
            .then(res => {
                setAllSurveys(res.data);
                setIsPending(false)
            })
    }

    const handleHightoLow = () => {
        axiosPublic.get(`/publishedsurveysfilterS?value=${0}`)
            .then(res => {
                setAllSurveys(res.data);
                setIsPending(false)
            })
    }

    return (
        <div className="mt-10">
            {
                isPending ? "" :
                    <div>
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <form onSubmit={handleTitleSearch} className="flex items-center">
                                    <input type="text" placeholder="search by title" name="search" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12 w-full" />
                                    <input className="btn rounded-none" type="submit" value="Search" />
                                </form>
                            </div>
                            <div>
                                <form onSubmit={handleCategorySearch} className="flex items-center">
                                    <input type="text" placeholder="search by category" name="category" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12 w-full" />
                                    <input className="btn rounded-none" type="submit" value="Search" />
                                </form>
                            </div>
                            <div className="flex gap-4">
                                <div><button onClick={handleLowtoHigh}><FaLevelUpAlt></FaLevelUpAlt></button></div>
                                <div><button onClick={handleHightoLow}><FaLevelDownAlt></FaLevelDownAlt></button></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            {
                                allSurveys?.map(survey => {
                                    return <div key={survey._id} className="space-y-5 bg-[#eeeeee] shadow-xl p-10 rounded-xl flex flex-col">
                                        <h1 className="text-2xl font-bold">{survey.title}</h1>
                                        <div className="flex-grow">
                                            {
                                                survey?.description.length > 400 ?
                                                    <div>
                                                        {survey.description.substring(0, 400)} <Link to={`/surveydetails/${survey._id}`}><span className="text-red-600">Read more</span></Link>
                                                    </div>
                                                    :
                                                    survey.description
                                            }
                                        </div>
                                        <p className="font-bold">{survey.category}</p>
                                        <div className="flex justify-between font-bold">
                                            <p className="text-green-600">Yes: {survey.yes}</p>
                                            <p className="text-red-600">No: {survey.no}</p>
                                        </div>
                                        <h2 className="font-bold text-lg">Total votes: {survey.total}</h2>
                                        <div>
                                            {
                                                isRolePending ? <span className="loading loading-ball loading-lg"></span> :
                                                    getRole?.role === "admin" || getRole?.role === "surveyor" ? (
                                                        <button className="btn text-center bg-green-500 text-white" disabled>
                                                            Vote Now
                                                        </button>
                                                    ) : (
                                                        <Link to={`/surveydetails/${survey._id}`}><button className="btn bg-green-500 text-white">Vote Now</button></Link>
                                                    )
                                            }
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
            }
        </div>
    );
};

export default SurveyPage;