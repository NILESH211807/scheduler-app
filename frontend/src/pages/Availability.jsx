import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const Availability = () => {

    const [userEmail, setUserEmail] = useState(
        localStorage.getItem("email")
    );

    const startTimeRef = useRef(null);
    const endTimeRef = useRef(null);
    const durationRef = useRef(null);

    const handleSubmit = async () => {

        const toastId = toast.loading("Please wait...", {
            autoClose: false
        })

        const formData = {
            email: userEmail,
            start: startTimeRef.current.value,
            end: endTimeRef.current.value,
            duration: durationRef.current.value
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_URI}/api/availability`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (response.ok) {
                if (result.message == "availability added successfully") {
                    // alert(result.message);
                    toast.update(toastId, {
                        isLoading: false,
                        render: result.message,
                        type: "success",
                        autoClose: 3000
                    })
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
    };

    return (
        <div className='w-full h-screen flex items-center flex-col'>
            <h2 className='text-2xl font-bold uppercase tracking-wide mt-10 mb-10'>Availability Scheduler</h2>
            <div className='w-full md:w-[550px] px-7'>

                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder='Enter Your Email Address'
                    className='w-full h-[55px] px-5 rounded-md bg-white shadow-sm border-2 outline-none focus:border-teal-600 duration-500 font-bold tracking-wide'
                    autoComplete='off'
                    value={userEmail}
                    required
                    onChange={(e) => setUserEmail(e.target.value)}
                    readOnly={true}
                />

                <label htmlFor="" className='font-bold mx-2'>Start Time</label>
                <input type="datetime-local" name="startTime" id=""
                    className='w-full h-[55px] px-5 rounded-md bg-white shadow-sm border-2 outline-none focus:border-teal-600 duration-500 font-bold tracking-wide mt-2'
                    ref={startTimeRef}
                />

                <label htmlFor="" className='font-bold mx-2'>End Time</label>
                <input type="datetime-local" name="endTime" id=""
                    className='w-full h-[55px] px-5 rounded-md bg-white shadow-sm border-2 outline-none focus:border-teal-600 duration-500 font-bold tracking-wide mt-2'
                    ref={endTimeRef}
                />

                <label htmlFor="" className='font-bold mx-2'>Duration (Minutes)</label>
                <input
                    type="number"
                    name="duration"
                    id="duration"
                    placeholder='Duration (Minutes)'
                    className='w-full h-[55px] px-5 mt-2 rounded-md bg-white shadow-sm border-2 outline-none focus:border-teal-600 duration-500 font-bold tracking-wide'
                    autoComplete='off'
                    defaultValue="30"
                    required
                    ref={durationRef}
                />

                <input
                    type="button"
                    value="Submit Availability"
                    className='w-full h-[55px] px-5 rounded-md bg-teal-600 text-white shadow-sm border-2 outline-none focus: duration-500 font-bold my-5 cursor-pointer hover:bg-teal-800 uppercase tracking-wide'
                    onClick={handleSubmit}
                />
            </div>
        </div>
    )
}

export default Availability
