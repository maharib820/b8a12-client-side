import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";

const AllAddedSurveys = () => {

    const { user } = useAuth();

    const axiosPrivate = useAxiosPrivate();

    const { data: allAddedSurveys } = useQuery({
        queryKey: ["allAddedSurveys"],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/myaddedsurveys/${user?.email}`);
            return res.data;
        }
    })

    // console.log(typeof allAddedSurveys);

    return (
        <div>
            <h2 className="text-3xl font-bold font-lobster mb-5">My added surveys</h2>
            <div className="grid grid-cols-1 gap-5">
                {
                    allAddedSurveys?.map(survey => {
                        return <div key={survey._id} className="bg-white shadow-xl rounded-lg p-5">
                            <h2 className="font-bold text-xl mb-5">{survey.title}</h2>
                            <p>
                                {survey.description}
                            </p>
                            <h4 className="my-5 font-bold">Category: {survey.category}</h4>
                            <h4 className="my-5 font-bold">Question: {survey.question}</h4>
                            <h4 className="my-5 font-bold">Deadline: {new Date(survey?.addedDate).toDateString()} - {new Date(survey?.expDate).toDateString()}</h4>
                            <Link to={`/dashboard/updatecreatedsurveys/${survey._id}`}>
                                <button className="btn bg-orange-600 text-white">
                                    <CiEdit></CiEdit>
                                    Update
                                </button>
                            </Link>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default AllAddedSurveys;