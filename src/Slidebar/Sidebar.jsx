import React from 'react';
import IssuePostingData from './IssuePostingData';
import Priority from './Priority';
import Category from './Category';
import Status from './Status';

const Sidebar = ({ handleChange }) => {
    return (
        <div className='space-y-5'>
            <h3 className='text-lg font-bold mb-2'>Filters</h3>
            <Priority handleChange={handleChange} />
            <IssuePostingData handleChange={handleChange} />
            <Category handleChange={handleChange} />
            <Status handleChange={handleChange}/>
        </div>
    );
};

export default Sidebar;
