import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { PageHeader } from "../Components";

const MyIssues = () => {
    const { user } = useContext(AuthContext);
    const [issues, setIssues] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://help-desk-backend-6ob3.onrender.com/myIssues/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                setIssues(data);
                setIsLoading(false);
            });
    }, [searchText, user]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentIssues = issues.slice(indexOfFirstItem, indexOfLastItem);

    const handleSearch = () => {
        const filter = issues.filter(
            (issue) =>
                issue.issueTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        );
        setIssues(filter);
        setIsLoading(false);
    };

    const nextPage = () => {
        if (indexOfLastItem < issues.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            iconColor: "red",
            confirmButtonColor: "#05fb4b",
            cancelButtonColor: "red",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://help-desk-backend-6ob3.onrender.com/issue/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.acknowledged === true) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Ticket has been deleted.",
                                icon: "success",
                                iconColor: "#05fb4b",
                                confirmButtonColor: "#05fb4b",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.href = '/my-issues';
                                }
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting:', error);
                        Swal.fire({
                            title: "Error",
                            text: "Failed to delete the ticket.",
                            icon: "error",
                            iconColor: "red",
                        });
                    });
            }
        });
    };

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <PageHeader title={"All tickets"} path={"all tickets"} />
            <div className="my-issues-container">
                <h1 className="text-center p-4 ">ALL My Tickets</h1>
                <div className="search-box p-2 text-center mb-2">
                    <input
                        onChange={(e) => setSearchText(e.target.value)}
                        type="text"
                        className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4"
                    >
                        Search
                    </button>
                </div>

                <section className="py-1 bg-blueGray-50">
                    <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                            <div className="rounded-t mb-0 px-4 py-3 border-0">
                                <div className="flex md:flex-row gap-4 flex-col items-center">
                                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                        <h3 className="font-semibold text-base text-blueGray-700">
                                            All Tickets
                                        </h3>
                                    </div>
                                    <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                        <Link
                                            to="/post-issue"
                                            className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        >
                                            Raised new tickets
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="block w-full overflow-x-auto scrollbar">
                                <table className="items-center bg-transparent w-full border-collapse ">
                                    <thead>
                                        <tr>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                No.
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Title
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Type
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Priority
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Status
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Track your ticket
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Edit
                                            </th>
                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    {isLoading ? (
                                        <div className="flex items-center justify-center h-20">
                                            <p>loading......</p>
                                        </div>
                                    ) : (
                                        <tbody>
                                            {currentIssues.map((issue, index) => (
                                                <tr key={index}>
                                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                        {index + 1}
                                                    </th>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                        {issue.issueTitle}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        {issue.issueType}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        {issue.priorityType}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        {issue.issueStatus}
                                                    </td>
                                                    <td className="border-t-0 px-6 text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 underline text-blue">
                                                        <Link className="text-blue" to={`/track-status/${issue._id}`}>
                                                            Track
                                                        </Link>
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        <button><Link to={`/edit-issue/${issue?._id}`}>Edit</Link></button>
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        <button className="bg-red-700 py-2 px-6 text-white rounded-sm" onClick={() => handleDelete(issue._id)}>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    )}
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center text-black space-x-8">
                        {currentPage > 1 && (
                            <button onClick={prevPage} className="hover:underline">
                                Previous
                            </button>
                        )}
                        {indexOfLastItem < issues.length && (
                            <button onClick={nextPage} className="hover:underline">
                                Next
                            </button>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MyIssues;
