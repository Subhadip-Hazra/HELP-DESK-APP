import React from 'react'

const Issues = ({ result }) => {
    return (
        <>
            <div>
                <h3 className='text-lg font-bold mb-2'>{result.length} Issues</h3>
            </div>
            <section className="card-container">{result}</section>
        </>
    );
};

export default Issues;