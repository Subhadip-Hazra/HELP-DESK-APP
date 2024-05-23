import React, { useEffect, useState } from "react";
import Sidebar from "../Slidebar/Sidebar";
import Issues from "./Issues";
import { Banner, Card, Loading, Newsletter } from "../Components";

const AdminPanel = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [issues, setIssues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");

    useEffect(() => {
        setIsLoading(true);
        fetch("https://help-desk-backend-6ob3.onrender.com/all-issues")
            .then((res) => res.json())
            .then((data) => {
                setIssues(data);
                setIsLoading(false);
            });
    }, []);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
        console.log(event.target.value);
    };

    const filteredData = (issues, selectedCategory, query) => {
        let filteredIssues = issues;
        // console.log(filteredIssues);

        if (query) {
            filteredIssues = filteredIssues.filter(
                (issue) => issue.issueTitle && issue.issueTitle.toLowerCase().includes(query.toLowerCase())
            );
        }

        if (selectedCategory) {
            if (selectedCategory === 'High' || selectedCategory === 'Medium' || selectedCategory === 'Low') {
                filteredIssues = filteredIssues.filter(issue => issue.priorityType === selectedCategory);
            }else if (selectedCategory === 'Pending' || selectedCategory === 'Processing' || selectedCategory === 'Solved') {
                filteredIssues = filteredIssues.filter(issue => issue.issueStatus === selectedCategory);
            }
            else if (selectedCategory === 'Technical Issue' || selectedCategory === 'Payment related issue') {
                filteredIssues = filteredIssues.filter(issue => issue.issueType === selectedCategory);
            } else if (selectedCategory === 'Last 24 hours' || selectedCategory === 'Last 7 days' || selectedCategory === 'Last 30 days') {
                const currentDate = new Date();
                const selectedDate = new Date();
                if (selectedCategory === 'Last 24 hours') {
                    selectedDate.setDate(selectedDate.getDate() - 1);
                } else if (selectedCategory === 'Last 7 days') {
                    selectedDate.setDate(selectedDate.getDate() - 7);
                } else if (selectedCategory === 'Last 30 days') {
                    selectedDate.setDate(selectedDate.getDate() - 30);
                }
                filteredIssues = filteredIssues.filter(issue => new Date(issue.issueDate) >= selectedDate && new Date(issue.issueDate) <= currentDate);
            }
        }

        return filteredIssues.map((data, i) => <Card key={i} data={data} />);
    };

    const result = filteredData(issues, selectedCategory, query);
    console.log(result);

    return (
        <div>
            <Banner query={query} handleInputChange={handleInputChange} />

            <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
                <div className="bg-white p-4 rounded">
                    <Sidebar handleChange={handleChange} />
                </div>
                <div className="col-span-2 bg-white p-4 rounded">
                    {isLoading ? (
                        <Loading />
                    ) : result.length > 0 ? (
                        <Issues result={result} />
                    ) : (
                        <>
                            <h3 className="text-lg font-bold mb-2">{result.length} Issues</h3>
                            <p>No data found</p>
                        </>
                    )}
                </div>
                <div className="bg-white p-4 rounded">
                    <Newsletter />
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
