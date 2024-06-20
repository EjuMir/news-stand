import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Controller, useForm } from "react-hook-form";
import Select from 'react-select';
import { createContext, useState } from "react";

export const PriceOfSub = createContext(1);

const stripeTest = loadStripe(import.meta.env.VITE_apiKeyPKtest)

const Subscription = () => {
    const { control, handleSubmit, reset } = useForm();
    const [open, setOpen] = useState(false);
    const [check, setCheck] = useState(false);
    const [priceFix, setPriceFix] = useState(0);

    const handleSub = () => {
        setOpen(true)
    }
    const handleBack = () => {
        setOpen(false)
    }

    const pricing = [
        { value: 1, label: '1 Minute' },
        { value: 10, label: '5 Days' },
        { value: 15, label: '10 Days' },
    ];


    const onSubmit = (data) => {
        console.log(data.pricing);
        setPriceFix(data.pricing)
        setCheck(true)

    }

    const handleBackToPrev = () => {
        setCheck(false)
    }

    return (
        <div>{

            check ? <div><Elements stripe={stripeTest}>
                <PriceOfSub.Provider value={priceFix}>
                    <CheckoutForm />
                </PriceOfSub.Provider>
            </Elements>
                <div className="text-center"><button onClick={handleBackToPrev} className="btn btn-error text-center mx-auto">Back</button></div></div> : <div>{
                    open ? <div className="border-2 w-1/3 bg-black rounded-md h-60 mx-auto my-14 p-8">
                        <div className="form-control w-full my-2">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label className="label">
                                        <span className="label-text font-bold text-lg text-white">Take Subscription For</span>
                                    </label>
                                    <Controller
                                        control={control}
                                        defaultValue={pricing.map(c => c.value[0])}
                                        name="pricing"
                                        render={({ field: { onChange, ref } }) => (
                                            <Select
                                                inputRef={ref}
                                                value={pricing.value}
                                                onChange={val => onChange(val.value)}
                                                options={pricing}
                                                required
                                            />
                                        )}
                                    />
                                </div>
                                <div className="flex justify-evenly">
                                    <div className="my-7">
                                        <button onClick={handleBack} className="btn">Go Back</button>
                                    </div>
                                    <div className="my-7">
                                        <input className="btn btn-accent" type="submit" value="Submit" />
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                        :
                        <div onClick={handleSub}>
                            <div className="flex flex-col border-2 lg:w-1/3 bg-black rounded-lg mx-auto my-14 hover:bg-gray-500 hover:cursor-pointer">
                                <h2 className=" font-bold text-center text-4xl p-4 text-orange-500">Premium</h2>
                                <hr />
                                <div>
                                    <h2 className="text-center font-bold text-xl my-7 text-green-500">Key Features :</h2>
                                </div>
                                <div className="flex flex-col gap-5 text-white p-2">
                                    <p>&#x2705; You can access <span className="font-bold text-md text-cyan-500">All articles</span></p>
                                    <p>&#x2705; You can post <span className="font-bold text-md text-cyan-500">Unlimited Articles</span></p>
                                    <p>&#x2705; <span className="font-bold text-md text-cyan-500">Unlimited</span> Usage</p>
                                    <p>&#x2705; Get Recognized By Renowned <span className="font-bold text-md text-cyan-500">Publishers</span></p>
                                </div>
                                <div>
                                    <h2 className="text-white text-center my-4 font-bold text-xl">Click For Subscription</h2>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                }</div>


        }


        </div>
    );

};

export default Subscription;

