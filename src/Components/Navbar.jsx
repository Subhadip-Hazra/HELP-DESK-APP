import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";
import logo from '../assets/logo.svg';
import '../App.css';
import { admin } from "../constants"; // Make sure the path to admin data is correct

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const isAdmin = user && admin.some(({ adminEmail }) => adminEmail === user.email);

    const navItems = [
        { path: "/", title: "Home" },
        ...(isAdmin ? [{path:"/admin",title:"All Tickets" },
            {path: "/dashboard", title: "Dashboard"}
        ] : [
            { path: "/my-issues", title: "My tickets" },
            { path: "/post-issue", title: "Raised new tickets" },
        ]),
    ];

    return (
        <header className="max-w-screen-2xl container mx-auto xl:px-24 px-2">
            <nav className="flex justify-between items-center py-6">
                <a href="/" className="flex items-center gap-2 text-2xl">
                    <img title="logo image" src={logo} alt="logo" className="w-10 h-12 mb-3" />
                    <span className="mb-3"><span className="bg-black p-1 text-slate-50 rounded-s">Help</span><span className="text-slate-950 p-1 rounded-e bg-blue">Desk</span></span>
                </a>

                {/* nav items */}
                <ul className="hidden md:flex gap-12">
                    {navItems.map(({ path, title }) => (
                        <li key={path} className="text-base text-primary">
                            <NavLink
                                to={path}
                                className={({ isActive }) => (isActive ? "active" : "")}
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div className="relative hidden text-base text-primary font-medium space-x-5 lg:block">
                    {/* User is logged in */}
                    {user ? (
                        <div className="group">
                            {/* Profile picture and logout button */}
                            <div className="flex gap-4 items-center cursor-pointer">
                                <div className="flex -space-x-2 overflow-hidden">
                                    {user?.photoURL ? (
                                        <img
                                            title="photo url"
                                            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                            src={user?.photoURL}
                                            alt="User profile"
                                        />
                                    ) : (
                                        <img
                                            title="default photo url"
                                            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt="Default user profile"
                                        />
                                    )}
                                </div>

                            </div>
                            {/* Additional options */}
                            <div className="absolute z-10 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition duration-300">
                                <Link onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Log out</Link>
                            </div>
                        </div>
                    ) : (
                        // User is not logged in
                        <>
                            <Link to="/login" className="py-2 px-5 border rounded">
                                Log in
                            </Link>
                            <Link to="/sign-up" className="bg-blue py-2 px-5 text-white rounded">
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
                {/* mobile menu */}
                <div className="md:hidden block">
                    <button onClick={handleMenuToggler}>
                        {isMenuOpen ? (
                            <FaXmark className="w-5 h-5 text-primary/75" />
                        ) : (
                            <FaBarsStaggered className="w-5 h-5 text-primary/75" />
                        )}
                    </button>
                </div>
            </nav>

            {/* mobile menu items */}
            <div className={`flex justify-center text-center bg-black py-5 absolute z-10 w-full rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
                <ul>
                    {navItems.map(({ path, title }) => (
                        <li
                            key={path}
                            className="text-base text-white first:text-white py-1"
                        >
                            <NavLink
                                onClick={handleMenuToggler}
                                to={path}
                                className={({ isActive }) => (isActive ? "active" : "")}
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))}
                    {!user ? (
                        <>
                            <li className="text-white py-1" onClick={handleMenuToggler}>
                                <Link to="/login">Log in</Link>
                            </li>
                            <li className="text-white py-1" onClick={handleMenuToggler}>
                                <Link to="/sign-up">Sign up</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="text-white py-1" onClick={handleMenuToggler}>
                                <Link onClick={handleLogout}>Log Out</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
