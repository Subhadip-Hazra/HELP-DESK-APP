import React from 'react'
import InputField from '../Components/InputField'

const Category = ({ handleChange }) => {
    return (
        <div>
            <h4 className="text-lg font-medium mb-2">Type of employment</h4>
            <div>
                <label className="sidebar-label-container">
                    <input onChange={handleChange} type="radio" value="" name="test" />
                    <span className="checkmark"></span>All
                </label>
                <InputField
                    handleChange={handleChange}
                    value="Technical Issue"
                    title="Technical Issue"
                    name="test"
                />
                <InputField
                    handleChange={handleChange}
                    value="Payment related issue"
                    title="Payment related Issue"
                    name="test"
                />
            </div>
        </div>
    )
}

export default Category