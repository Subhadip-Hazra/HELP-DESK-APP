import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { correct } from '../assets/icons';

const TrackStatus = () => {
    const { id } = useParams();
    const [issue, setIssue] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`https://help-desk-backend-6ob3.onrender.com/all-issues/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setIssue(data);
                setIsLoading(false);
            });
    }, [id]);

    const getProgress = (status) => {
        switch (status) {
            case 'Pending':
                return { width: '10%', text: 'Pending', background: 'red' };
            case 'Processing':
                return { width: '50%', text: 'In Progress', background: 'blue' };
            case 'Solved':
                return { width: '100%', text: 'Solved', background: '#3bd63c' };
            default:
                return { width: '0%', text: 'Pending', background: 'red' };
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const progress = getProgress(issue.issueStatus);

    return (
        <div>

            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Track Issue Status</h1>
                <div className="w-3/4 rounded-full h-6 mb-4 bg-gray-300">
                    <div
                        className="h-6 rounded-full flex items-center justify-center"
                        style={{ width: progress.width, background: progress.background }}
                    >
                        <span className="text-black mt-12 font-bold">{progress.text}</span>
                    </div>
                </div>
                {progress.width === '100%' && (
                    <div className="text-green-600 font-bold flex items-center">
                        <img src={correct} alt='correct' />
                    </div>
                )}
            </div>
            <div className='p-4 sm:p-20 mt-10'>
                <h1 className='my-4 text-xl font-bold'>Pending</h1>
                <p>Pending means that the admin has not yet viewed your issue. Please wait for the admin to review and take action.</p>
                <h1 className='my-4 text-xl font-bold'>Processing</h1>
                <p>Processing means that we are currently working on your issue. We are actively investigating and taking steps to resolve it.</p>
                <h1 className='my-4 text-xl font-bold'>Solved</h1>
                <p>Solved means that your query has been resolved. If you have any further questions or issues, please feel free to raise a new ticket.</p>
            </div>
        </div>
    );
};

export default TrackStatus;
