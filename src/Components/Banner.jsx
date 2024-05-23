import {FiSearch } from "react-icons/fi";

const Banner = ({ handleInputChange, query }) => {
    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 md:py-20 py-14 px-4">
            <h1 className="text-5xl font-bold text-primary mb-3">
                Manage and resolve <span className="text-blue">issues</span> efficiently
            </h1>
            <p className="text-lg text-black/70 mb-8">
                Streamline your workflow with our comprehensive help desk solution.
            </p>

            <form className="">
                <div className="flex justify-start md:flex-row flex-col md:gap-0 gap-4">
                    <div className="flex md:rounded-s-md rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Search for an issue..."
                            onChange={handleInputChange}
                            value={query}
                        />
                        <FiSearch className="absolute mt-2.5 ml-2 text-gray-400" />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue py-2 px-8 text-white md:rounded-e-md md:rounded-s-none rounded"
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Banner;
