import React from 'react'
import InputField from '../Components/InputField'

const Priority = ({ handleChange }) => {
    return (
        <div>
            <h4 className="text-lg font-medium mb-2">Priority type</h4>
            <div>
                <label className="sidebar-label-container">
                    <input onChange={handleChange} type="radio" value="" name="test" />
                    <span className="checkmark"></span>All
                </label>
                <InputField
                    handleChange={handleChange}
                    value="High"
                    title="High"
                    name="test"
                />
                <InputField
                    handleChange={handleChange}
                    value="Medium"
                    title="Medium"
                    name="test"
                />
                <InputField
                    handleChange={handleChange}
                    value="Low"
                    title="Low"
                    name="test"
                />
            </div>
        </div>
    )
}

export default Priority