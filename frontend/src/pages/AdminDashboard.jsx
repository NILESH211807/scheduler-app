import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const seletedEmail = useRef(null)
    const selectedAvailability = useRef(null);
    const [availability, setAvailability] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URI}/api/get-all-user`, {
                method: "GET",
            });
            const result = await response.json();
            if (response.ok) {
                if (result.message == "success") {
                    setUsers(result.data);
                } else {
                    toast.error(result.message);
                    // alert(result.message);
                }
            } else {
                toast.error(result.message || "please try again");
                // alert(result.message || "please try again")
            }

        } catch (error) {
            toast.error(error.message);
            // alert(error.message)
        }

    }
    useEffect(() => {
        fetchUsers();
    }, [])

    const viewAvailability = async () => {
        const userEmail = seletedEmail.current.value;
        try {
            const response = await fetch(`${import.meta.env.VITE_URI}/api/get-availability`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userEmail })
            });

            const result = await response.json();
            if (response.ok) {
                if (result.message == "success" && result.data.length > 0) {
                    setAvailability(result.data);
                    // console.log(result.data);
                } else {
                    toast.error("Availability not found");
                    // alert("Availability not found")
                }
            } else {
                toast.error(result.message || "please try again");
                // alert(result.message || "please try again")
            }
        } catch (error) {
            toast.error(error.message);
            // alert(error.message);
        }
    }

    const handleScheduleSession = async () => {

        const availability = JSON.parse(selectedAvailability.current.value)

        const toastId = toast.loading("Please wait...", {
            autoClose: false
        })

        const ScheduleData = {
            email: seletedEmail.current.value,
            start: availability.start,
            end: availability.end
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_URI}/api/session`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ScheduleData)
            })

            const result = await response.json();
            if (response.ok) {
                if (result.message == "session schedule successfully") {
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
                }
            } else {
                toast.update(toastId, {
                    isLoading: false,
                    render: result.message || "please try again",
                    type: "error",
                    autoClose: 3000
                })
            }

        } catch (error) {
            toast.update(toastId, {
                isLoading: false,
                render: error.message,
                type: "error",
                autoClose: 3000
            })
        }
    };

    return (
        <div className='w-full h-screen flex items-center flex-col'>
            <h2 className='text-2xl font-bold uppercase tracking-wide mt-10 mb-10'>Admin Dashboard</h2>
            <div className='w-full md:w-[550px] px-7'>
                <select name="email" ref={seletedEmail} id="email" className='w-full h-[55px] px-5 rounded-md bg-white shadow-sm border-2 outline-none focus:border-teal-600 duration-500 font-bold tracking-wide'>
                    <option value="">Select User</option>
                    {
                        users.map((item, index) => (<option key={index} value={item.email}>{item.email}</option>))
                    }
                </select>

                <input
                    type="button"
                    value="View Availability"
                    className='w-full h-[55px] px-5 rounded-md bg-teal-600 text-white shadow-sm border-2 outline-none focus: duration-500 font-bold my-5 cursor-pointer hover:bg-teal-800 uppercase tracking-wide'
                    onClick={viewAvailability}
                />
            </div>
            {
                availability.length > 0 && (
                    <div className='w-full md:w-[550px] px-7 mt-10'>
                        <select name="availability" ref={selectedAvailability} id="availability" className='w-full h-[55px] px-5 rounded-md bg-white shadow-sm border-2 outline-none focus:border-teal-600 duration-500 font-bold tracking-wide'>
                            <option value="">Select Slot</option>

                            {
                                availability.map((item, index) => (<option key={index} value={JSON.stringify(item)}>{item.start} - {item.end}</option>))

                            }

                        </select>
                        <input
                            type="button"
                            value="Schedule Session"
                            className='w-full h-[55px] px-5 rounded-md bg-teal-600 text-white shadow-sm border-2 outline-none focus: duration-500 font-bold my-5 cursor-pointer hover:bg-teal-800 uppercase tracking-wide'
                            onClick={handleScheduleSession}
                        />
                    </div>
                )
            }
        </div >
    )
}

export default AdminDashboard
