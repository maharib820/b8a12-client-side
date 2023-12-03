import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import moment from "moment";

const PaymentHistory = () => {

    const axiosPrivate = useAxiosPrivate();

    const { data: allPaymentHistory } = useQuery({
        queryKey: ["allPaymentHistory"],
        queryFn: async () => {
            const res = await axiosPrivate.get("/paymenthistory");
            return res.data;
        }
    })

    // console.log(allPaymentHistory);

    return (
        <div>
            <h2 className="mb-8 text-2xl font-bold font-lobster">Payment History: Pro Users</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    #
                                </label>
                            </th>
                            <th>Identification</th>
                            <th>Paid</th>
                            <th>Tranzaction ID</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allPaymentHistory?.map((payment, index) => {
                                return <tr key={payment._id}>
                                    <th>
                                        <label>
                                            {index + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={payment.photo} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{payment.name}</div>
                                                <div className="text-sm opacity-50">{payment.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        ${payment.price}
                                    </td>
                                    <td>{payment.transactionId}</td>
                                    <th>
                                        {moment(payment.date).format('YYYY-MM-DD HH:mm:ss')}
                                    </th>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;