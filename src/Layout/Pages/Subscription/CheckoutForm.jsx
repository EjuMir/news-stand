import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthFirebase } from "../../../Authentication/Firebase";
import useAxiosSecure from "../../../Hooks/useAxiosSecure"
import { PriceOfSub } from "./Subscription";


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

    console.log(price);

    useEffect(() => {
        if(price>0){
        axiosSecure.post('/create-payment-intent', { price: price})
            .then(res => {
                console.log(res.data.clientSecret);
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
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
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
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);
                
                const payment = {
                    email: user.email,
                    price: price,
                    transactionId: paymentIntent.id,
                    date: new Date(), 
                    status: 'pending'
                }
                const res = await axiosSecure.post('/payments', payment);
                console.log(res.data);
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
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
        </div>
    );
};

export default CheckoutForm;