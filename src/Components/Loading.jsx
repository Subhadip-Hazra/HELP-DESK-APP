import React from 'react';
import '../App.css' // Import CSS file for styling

const Loading = () => {
    return (
        // website loading component
        <div className="loading-spinner-container animate-spin">
            <div className="loading-spinner"></div>
        </div>
    );
};

export default Loading;
