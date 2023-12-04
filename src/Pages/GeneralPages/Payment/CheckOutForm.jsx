import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckOutForm = () => {

    const { user } = useAuth();

    const axiosPrivate = useAxiosPrivate();

    const [error, setError] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const totalPrice = 10;
        axiosPrivate.post("/create-payment-intent", { price: totalPrice })
            .then(res => {
                // console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosPrivate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        });
        if (error) {
            // console.log('payment error: ', error);
            setError(error.message)
        }
        else {
            console.log('paymentMethod ', paymentMethod);
            setError('')
        }
        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous"
                }
            }
        });

        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('paymentIntent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // set payment to database
                const payment = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    transactionId: paymentIntent.id,
                    price: 10,
                    date: moment(new Date()).utc(),
                    status: 'pro user'
                }
                axiosPrivate.post(`/payments/${user.email}`, payment)
                    .then(res => {
                        console.log(res.data);
                        card.clear();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Payment Successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate("/");
                    })
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="w-full h-10 text-white bg-green-600 mt-8" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {
                transactionId && <p className="text-green-500">Your transaction id {transactionId}</p>
            }
        </form>
    );
};

export default CheckOutForm;