import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { AuthContext } from "../context/AuthProvider";
import { GoIssueReopened } from "react-icons/go";
import { GrStatusGood } from "react-icons/gr";
import { MdTopic } from "react-icons/md";
import { Loading, PageHeader } from "../Components";

const IssueDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [issue, setIssue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchIssueDetails();
    }, [id, user]);

    const fetchIssueDetails = async () => {
        try {
            const issueRes = await fetch(`https://help-desk-backend-6ob3.onrender.com/all-issues/${id}`).then(res => res.json());
            if (!issueRes || issueRes.error) {
                throw new Error(issueRes ? issueRes.error : "Error fetching issue details");
            }
            setIssue(issueRes);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const updateIssueStatus = async (status) => {
        try {
            const response = await fetch(`https://help-desk-backend-6ob3.onrender.com/update-issue/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ issueStatus: status })
            });
            const result = await response.json();
            if (result.modifiedCount > 0) {
                setIssue(prevIssue => ({ ...prevIssue, issueStatus: status }));
            }
        } catch (error) {
            console.error("Error updating issue status:", error);
        }
    };

    if (loading) return <Loading />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <PageHeader title="Issue Details Page" path="Single Issue" />
            <div className="flex gap-4 flex-col w-full sm:flex-row">
                <div className="mt-2 sm:mt-10 w-full">
                    {issue ? (
                        <div className="my-4 space-y-2">
                            <h1 className="text-md font-sans mb-2">{issue.issueTitle}</h1>
                            <div className="flex items-center gap-5">
                                <p className="text-sm font-sans mb-2 flex items-center gap-2">
                                    <MdTopic className="text-orange-500" />{issue.issueType}
                                </p>
                                <p className="text-sm font-sans mb-2 flex items-center gap-2">
                                    <GrStatusGood className="text-orange-500" />{issue.issueStatus}
                                </p>
                                <p className="text-sm font-sans mb-2 flex items-center gap-2">
                                    <GoIssueReopened className="text-orange-500" />{issue.priorityType}
                                </p>
                            </div>
                            <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
                                <span className="flex items-center gap-2">
                                    <FiMapPin className="text-orange-500" />{issue.userLocation}
                                </span>
                                <span className="flex items-center gap-2">
                                    <FiCalendar className="text-orange-500" />{issue.issueDate}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <Loading />
                    )}
                    <div className="text-primary/75 mt-6 my-5 sm:mt-16 space-y-6 text-justify text-align-last-justify first-letter:capitalize first-letter:text-5xl">
                        {issue && <p>{issue.description}</p>}
                    </div>
                    <div className="flex items-center gap-2 mb-10 mt-12 sm:mt-14">
                        <div className="flex -space-x-2 overflow-hidden">
                            {issue.profileURL ? (
                                <img
                                    title="issue profile"
                                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                    src={issue.profileURL}
                                    alt="profile image"
                                />
                            ) : (
                                <img
                                    title="issue profile"
                                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="default profile image"
                                />
                            )}
                        </div>
                        <h3 className="text-primary italic font-serif underline">~ By  {issue?.yourName}</h3>
                    </div>
                    <div className="flex gap-5 mt-4 justify-end my-10">
                        {issue.issueStatus !== "Solved" && (
                            <>
                                <button
                                    className={`bg-blue text-white px-4 py-2 rounded ${issue.issueStatus === "Processing" ? "cursor-not-allowed opacity-50" : ""}`}
                                    onClick={() => updateIssueStatus("Processing")}
                                    disabled={issue.issueStatus === "Processing"}
                                >
                                    {issue.issueStatus === "Processing" ? "Marked as Read" : "Mark as Read"}
                                </button>
                                <button
                                    className={`bg-blue text-white px-4 py-2 rounded ${issue.issueStatus === "Solved" ? "cursor-not-allowed opacity-50" : ""}`}
                                    onClick={() => updateIssueStatus("Solved")}
                                    disabled={issue.issueStatus === "Solved"}
                                >
                                    {issue.issueStatus === "Solved" ? "Issue Resolved" : "Resolve Issue"}
                                </button>
                            </>
                        )}
                        {issue.issueStatus === "Solved" && (
                            <button
                                className="bg-blue text-white px-4 py-2 rounded"
                                onClick={() => updateIssueStatus("Pending")}
                            >
                                Reopen Issue
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssueDetails;
