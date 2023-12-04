import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import useAuth from "../../../../hooks/useAuth";

const SurveyorSurveyResponses = () => {

    const axiosPrivate = useAxiosPrivate();

    const { user } = useAuth();

    const { data: aresponses } = useQuery({
        queryKey: ["aresponses"],
        queryFn: async () => {
            if (user.email) {
                const res = await axiosPrivate.get(`/surveyorsurveyresponses/${user.email}`);
                return res.data;
            }
        }
    })

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

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Email</th>
                            <th>Time</th>
                            <th>Voted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            aresponses?.map((r, index) => {
                                return <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{r.addedName}</td>
                                    <td>{r.title}</td>
                                    <td>{r.addedby}</td>
                                    <td>{r.addedDate}</td>
                                    <td>{r.total}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="w-full mt-10 overflow-hidden">
                <div className="overflow-y-auto">
                    <BarChart
                        width={500}
                        height={300}
                        data={aresponses}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="title" />
                        <YAxis />
                        <Bar dataKey="total" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {aresponses?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
            </div>
        </div>
    );
};

export default SurveyorSurveyResponses;