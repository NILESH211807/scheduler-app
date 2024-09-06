import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

    const navigate = useNavigate();
    const inputRef = useRef(null);

    // handleSubmit
    const handleSubmit = async () => {
        // input value 
        const inputValues = { email: inputRef.current.value }

        const toastId = toast.loading("Please wait...", {
            autoClose: false
        })

        try {
            const response = await fetch(`${import.meta.env.VITE_URI}/api/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputValues)
            });

            const result = await response.json();
            if (response.ok) {
                if (result.message == "login successfully") {
                    localStorage.setItem("email", result.data.email)
                    // alert(result.message);
                    toast.update(toastId, {
                        isLoading: false,
                        render: result.message,
                        type: "success",
                        autoClose: 3000
                    })
                    navigate('/dashboard');
                } else {
                    toast.update(toastId, {
                        isLoading: false,
                        render: result.message,
                        type: "error",
                        autoClose: 3000
                    })
                    // alert(result.message)
                }
            } else {
                toast.update(toastId, {
                    isLoading: false,
                    render: result.message || "please try again",
                    type: "error",
                    autoClose: 3000
                })
                // alert(result.message || "please try again")
            }

            // console.log(result);

        } catch (error) {
            toast.update(toastId, {
                isLoading: false,
                render: error.message,
                type: "error",
                autoClose: 3000
            })
            // alert(error.message)
        }
    }

    return (
        <div className='w-full h-screen flex items-center flex-col'>
            <h2 className='text-2xl font-bold uppercase tracking-wider mt-28 mb-10'>Login</h2>
            <div className='w-full md:w-[550px] px-7'>
                <input
                    ref={inputRef}
                    type="email"
                    name="email"
                    id="email"
                    placeholder='Enter Your Email Address'
                    className='w-full h-16 px-5 rounded-md bg-white shadow-sm border-2 outline-none focus:border-teal-600 duration-500 font-bold tracking-wide'
                    autoComplete='off'
                    required
                />
                <input
                    type="button"
                    value="Submit"
                    className='w-full h-16 px-5 rounded-md bg-teal-600 text-white shadow-sm border-2 outline-none focus: duration-500 font-bold my-5 cursor-pointer hover:bg-teal-800 uppercase tracking-wider'
                    onClick={handleSubmit}
                />
            </div>
        </div>
    )
}

export default Login
