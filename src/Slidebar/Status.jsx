import React from 'react'
import InputField from '../Components/InputField'

const Status = ({ handleChange }) => {
    return (
        <div>
            <h4 className="text-lg font-medium mb-2">Status</h4>
            <div>
                <label className="sidebar-label-container">
                    <input onChange={handleChange} type="radio" value="" name="test" />
                    <span className="checkmark"></span>All
                </label>
                <InputField
                    handleChange={handleChange}
                    value="Pending"
                    title="Pending"
                    name="test"
                />
                <InputField
                    handleChange={handleChange}
                    value="Processing"
                    title="Processing"
                    name="test"
                />
                <InputField
                    handleChange={handleChange}
                    value="Solved"
                    title="Solved"
                    name="test"
                />
            </div>
        </div>
    )
}

export default Status