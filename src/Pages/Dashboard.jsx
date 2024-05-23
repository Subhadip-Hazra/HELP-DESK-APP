import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import { PageHeader } from '../Components';

const Dashboard = () => {
    const [issueStats, setIssueStats] = useState({
        total: 0,
        pending: 0,
        processing: 0,
        solved: 0,
    });
    const [priorityStats, setPriorityStats] = useState({
        high: 0,
        medium: 0,
        low: 0,
    });
    const [issueCountsByDate, setIssueCountsByDate] = useState([]);

    useEffect(() => {
        fetchIssueData();
    }, []);

    const fetchIssueData = async () => {
        try {
            const { data } = await axios.get('https://help-desk-backend-6ob3.onrender.com/issue-stats');
            setIssueStats(data.issueStats);
            setPriorityStats(data.priorityStats);
            setIssueCountsByDate(data.issueTypes);
        } catch (error) {
            console.error("Error fetching issue data:", error);
        }
    };

    const issueCountData = {
        labels: ['Total Issues', 'Pending Issues', 'Processing Issues', 'Solved Issues'],
        datasets: [
            {
                label: 'Issue Counts',
                data: [issueStats.total, issueStats.pending, issueStats.processing, issueStats.solved],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    const priorityData = {
        labels: ['High Priority', 'Medium Priority', 'Low Priority'],
        datasets: [
            {
                label: 'Priority Counts',
                data: [priorityStats.high, priorityStats.medium, priorityStats.low],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const issueTypeData = {
        labels: issueCountsByDate.map(item => item.date),
        datasets: [
            {
                label: 'Daily Issue Counts',
                data: issueCountsByDate.map(item => item.count),
                borderColor: '#FF6384',
                fill: false,
            },
        ],
    };

    return (
        <div className="container mx-auto p-10">
            <PageHeader title="Dashboard" path="dashboard" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white shadow-lg rounded-lg sm:p-28 p-4">
                    <h2 className="text-xl font-semibold mb-2">Issue Counts</h2>
                    <Bar data={issueCountData} />
                </div>
                <div className="bg-white shadow-lg rounded-lg sm:p-28 p-4">
                    <h2 className="text-xl font-semibold mb-2">Priority Counts</h2>
                    <Bar data={priorityData} />
                </div>
                <div className="bg-white shadow-lg rounded-lg sm:p-40 p-4 col-span-1 md:col-span-2">
                    <h2 className="text-xl font-semibold mb-2">Daily Issue Counts</h2>
                    <Line data={issueTypeData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
