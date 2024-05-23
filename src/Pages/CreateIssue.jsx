/* eslint-disable react/no-unknown-property */
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from 'sweetalert2'
import { AuthContext } from "../context/AuthProvider";
import { PageHeader } from "../Components";

const Createissue = () => {
    const { user } = useContext(AuthContext);

    const [currentLocation,setCurrentLocation] = useState(' ');
    const currentDate = new Date().toISOString().split('T')[0];

    useEffect(() => {
        // Fetch user's current location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Convert coordinates to human-readable location
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`)
                .then(response => response.json())
                .then(data => setCurrentLocation(data.address.state))
                .catch(error => console.error('Error fetching current location:', error));
            },
            (error) => {
                console.error('Error getting current location:', error);
            }
        );
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (data) => {
        fetch("https://help-desk-backend-6ob3.onrender.com/post-issue", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        .then((res) => res.json())
        .then((result) => {
            if (result.acknowledged === true) {
                swal.fire({
                    title: 'Success!',
                    text: 'Issue Raised successfully.',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'OK',
                    confirmButtonColor: "#05fb4b",
                    cancelButtonColor: "red",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = 'http://localhost:5173/'; // Redirect user
                    }
                });
                reset(); // Reset the form
            }
        });

        // console.log(data)
    };


    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <PageHeader title={"Post a Issue"} path={"Create issue ticket"} />

            {/* form */}
            <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/*hidden row */}
                <div className="lg:w-1/2 w-full hidden">
                            <label className="mb-2 text-lg hidden">Profile Url <span className=" text-red-500">*</span></label>
                            <input
                                {...register("profileURL")}
                                value={user?.photoURL}
                                required
                            />
                        </div>
                        <div className="lg:w-1/2 w-full hidden">
                            <label className="block mb-2 text-lg">Full Name <span className=" text-red-500">*</span></label>
                            <input
                                placeholder="Ex: John Doe"
                                {...register("yourName")}
                                value={user?.displayName}
                                required
                            />
                        </div>
                    {/* 1st row */}

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Issue Title</label>
                            <input
                                placeholder="Raised your issue"
                                {...register("issueTitle")}
                                required
                                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Issue Type</label>
                            <select {...register("issueType")} required className="create-issue-input">
                                <option value="">Choose your issue</option>
                                <option value="Technical Issue">Technical issue</option>
                                <option value="Payment related issue">Payment related issue</option>
                                <option value="Others">Others</option>
        
                            </select>
                        </div>
                        <div className="lg:w-1/2 w-full hidden">
                            <label className="block mb-2 text-lg">Status</label>
                            <input
                                value="Pending"
                                {...register("issueStatus")}
                                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {/* 2nd row */}
                    <div className="create-issue-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Priority Type</label>
                            <select {...register("priorityType")} required className="create-issue-input">
                                <option value="">Choose priority level</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Your Location</label>
                            <input
                                placeholder="Ex: New York"
                                {...register("userLocation")}
                                className="create-issue-input"
                                value={currentLocation}
                            />
                        </div>
                    </div>

                    {/* 4th row */}
                    <div className="create-issue-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Issue Posting Date</label>
                            <input
                                className="create-issue-input"
                                {...register("issueDate")}
                                placeholder="Ex: 2024-05-22"
                                type="date"
                                value={currentDate}
                            />
                        </div>
                    </div>
                    {/* 7th row */}
                    <div className="w-full">
                        <label className="block mb-2 text-lg">Issue Description</label>
                        <textarea
                            className="w-full pl-3 py-1.5 focus:outline-none"
                            rows={6}
                            required
                            {...register("description")}
                            placeholder="Issue description"
                        />
                    </div>

                    {/* last row */}
                    <div className="w-full">
                        <label className="block mb-2 text-lg">Issue Posted by</label>
                        <input
                            type="email"
                            className="w-full pl-3 py-1.5 focus:outline-none"
                            {...register("postedBy")}
                            placeholder="your email"
                            value={user?.email}
                        />
                    </div>

                    <input
                        type="submit"
                        className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
                    />
                </form>
            </div>
        </div>
    );
};

export default Createissue;
