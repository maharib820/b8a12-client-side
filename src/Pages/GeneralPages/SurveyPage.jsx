import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useRole from "../../hooks/useRole";
import { Link } from "react-router-dom";

const SurveyPage = () => {

    const [getRole, isRolePending] = useRole();
    // console.log(getRole);

    const axiosPublic = useAxiosPublic();

    const { data: allSurveys } = useQuery({
        queryKey: ["allSurveys"],
        queryFn: async () => {
            const res = await axiosPublic.get("/publishedsurveys");
            return res.data;
        }
    })

    return (
        <div className="mt-10">
            <div className="grid grid-cols-2 gap-5">
                {
                    allSurveys?.map(survey => {
                        return <div key={survey._id} className="space-y-5 bg-[#eeeeee] shadow-xl p-10 rounded-xl">
                            <h1 className="text-2xl font-bold">{survey.title}</h1>
                            <div>
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
                                            <button className="btn bg-green-500 text-white" disabled>
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
    );
};

export default SurveyPage;