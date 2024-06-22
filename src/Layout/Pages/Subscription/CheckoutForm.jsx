import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthFirebase } from "../../../Authentication/Firebase";
import useAxiosSecure from "../../../Hooks/useAxiosSecure"
import { PriceOfSub } from "./Subscription";
import moment from "moment";


const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthFirebase)
    const navigate = useNavigate();
    const price = useContext(PriceOfSub);

    let expired = 0 ;

    if(price == 1){
         expired = new Date().getTime()+60000
    }
    else if (price == 10) {
        expired = new Date().getTime()+432000000;
    }
    else if (price == 15) {
        expired = new Date().getTime()+864000000;
    }

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            // console.log(error);
            setError(error.message);
        }
        else {
            // console.log(paymentMethod)
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            // console.log(paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);
                const payment = {
                    email: user.email,
                    price: price,
                    transactionId: paymentIntent.id,
                    date: moment().format('MMMM Do YYYY, h:mm:ss a'),
                    status: 'success',
                    expiredDate: expired,
                }

                const res = await axiosSecure.post('/payments', payment);
                const makePremium = await axiosSecure.patch(`/users/${user.email}`,{
                     subscript : 'premium',
                     premiumExpiresIn : expired,
                })

                if (res.data?.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Thank you for the Subscription",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/')
                }

            }
        }

    }

    return (
        <div className="w-2/3 mx-auto my-16 border-2 p-4">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '20px',
                                color: '#00000',
                                '::placeholder': {
                                    color: '#00000',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-primary my-10 w-full text-white text-2xl" type="submit" disabled={!stripe || !clientSecret}>
                    Subscribe
                </button>
                <p className="text-red-600">{error}</p>
            </form>
        </div>
    );
};

export default CheckoutForm;