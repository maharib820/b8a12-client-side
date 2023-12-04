import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const MostVoted = () => {

    const axiosPublic = useAxiosPublic();

    const { data: mostVoted } = useQuery({
        queryKey: ["mostVoted"],
        queryFn: async () => {
            const res = await axiosPublic.get("/featured");
            return res.data;
        }
    })

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
                mostVoted?.map(survey => {
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
                    </div>
                })
            }
        </div>
    );
};

export default MostVoted;