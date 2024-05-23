import React, { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { About } from '../assets/images';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Help, Testimonils } from '../constants';
import { AuthContext } from '../context/AuthProvider';
import { admin } from "../constants";
import { Footer } from '../Components';


const Home = () => {
    const testimonialsRef = useRef(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const testimonials = testimonialsRef.current;
        const clone = testimonials.innerHTML;
        testimonials.innerHTML += clone;
    }, []);

    const isAdmin = user && admin.some(({ adminEmail }) => adminEmail === user.email);


    return (
        <div className="font-DM-Sans">
            <div className="relative w-full h-96 ">
                <img
                    src={About}
                    alt="Header"
                    className="w-full h-96 object-cover "
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-100 bg-black bg-opacity-50">
                    <h1 className="text-5xl font-bold text-center">Welcome to Help Desk App</h1>
                    <p className="text-xl mt-4">We are here to assist you</p>
                    <div className="mt-6 flex items-center gap-3 text-white" >
                        {!user ?
                            <>
                                <Link to={"/lgin"}><button className='mt-16 boxer bg-indigo-700 text-white rounded-md' style={{ fontSize: '18px', fontWeight: 'inherit', padding: '10px 30px 10px 30px' }}><span>{"Login"}</span> </button></Link>
                                <Link to={"/sign-up"}><button className='btn mt-16 boxer bg-indigo-700 text-white rounded-md' style={{ fontSize: '18px', fontWeight: 'inherit', padding: '10px 30px 10px 30px' }}><span>{"Sign up"}</span> </button></Link>
                            </>
                            :
                            (isAdmin ? <Link to={"/admin"}><button className='btn mt-16 boxer bg-indigo-700 text-white rounded-md' style={{ fontSize: '18px', fontWeight: 'inherit',padding: '10px 30px 10px 30px' }}><span>{"Explore"}</span> </button></Link>

                                : <Link to={"/my-issues"}><button className='btn mt-16 boxer bg-indigo-700 text-white rounded-md' style={{ fontSize: '18px', fontWeight: 'inherit', padding: '10px 30px 10px 30px' }}><span>{"Explore"}</span> </button></Link>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="flex justify-around my-6">
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full border-8 animate-pulse text-black border-blue flex items-center justify-center text-2xl">500</div>
                    <p className="mt-2">Total Users</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full border-8 animate-pulse border-red-500 flex items-center justify-center text-black text-2xl">200</div>
                    <p className="mt-2">Total Agents</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full border-8 animate-pulse border-green-500 flex items-center justify-center text-black text-2xl">1500</div>
                    <p className="mt-2">Reviews</p>
                </div>
            </div>
            <div className='w-full h-full text-black p-4 sm:px-20'>
                <h2 className='text-2xl font-semibold my-7'>
                    Introducing Our Help Desk App: Streamlining Issue Management
                </h2>
                <p className='text-md my-5 font-small'>
                    {"In today's fast-paced technological landscape, efficient issue management is crucial for businesses to maintain smooth operations and provide excellent customer service. Our Help Desk App is a comprehensive solution designed to streamline issue tracking and resolution processes, empowering organizations to effectively manage and resolve a wide range of issues across various domains."}
                </p>
                <h2 className='text-2xl font-semibold my-7'>
                    Efficient Issue Tracking and Management
                </h2>
                <p className='text-md my-5 font-small'>
                    With our Help Desk App, organizations can effortlessly track and manage issues reported by customers, employees, or stakeholders. The app provides a centralized platform where all reported issues are logged, categorized, and assigned to the appropriate team or individual for resolution. Through intuitive interfaces and customizable workflows, teams can prioritize, track, and resolve issues efficiently, ensuring timely resolutions and minimizing disruptions to business operations.
                </p>
                <h2 className='text-2xl font-semibold my-7'>
                    Robust Ticketing System
                </h2>
                <p className='text-md my-5 font-small'>
                    At the core of our Help Desk App is a robust ticketing system that enables seamless communication and collaboration among team members. Each reported issue is assigned a unique ticket, containing essential details such as issue description, priority level, status, and assigned personnel. Team members can communicate, share updates, and collaborate on issue resolution directly within the ticket, ensuring transparency and accountability throughout the process.
                </p>

            </div>
            <div className="mx-auto w-full px-4 sm:px-20 my-6 mt-16">
                <h2 className="text-2xl font-bold mb-4 ">How Our App Works</h2>
                <div className="my-16 flex text-black">
                    <VerticalTimeline lineColor='#a491f5'>
                        {Help.map((help) => (
                            <VerticalTimelineElement
                                key={help.title}
                                icon={
                                    <div className="flex justify-center items-center w-full h-full">
                                        <img src={help.icon} alt={help.title} className="w-[50%] h-[50%] object-contain" />
                                    </div>
                                }
                                iconStyle={{ background: help.iconBg }}
                                contentStyle={{
                                    borderBottom: '8px',
                                    borderStyle: 'solid',
                                    borderBottomColor: help.iconBg,
                                    background: '#e4dffb',
                                    boxShadow: 'rgba(200, 200, 200, .8) 2px 2px 3px 0px, rgba(200,200, 200, .8) 2px 6px 6px 0px'
                                }}
                                contentArrowStyle={{ borderRight: '7px solid  rgb(0, 0, 0)' }}
                            >
                                <div>
                                    <h3 className="text-xl text-black font-poppins font-semibold">
                                        {help.title}
                                    </h3>
                                </div>
                                <ul className="my-5 list-disc text-black ml-5 space-y-2 list-inside">
                                    {help.points.map((point, index) => (
                                        <li key={`experience-point-${index}`} className="text-black font-normal pl-1 text-sm sm:text-md">
                                            {point}
                                        </li>
                                    ))}
                                </ul>

                            </VerticalTimelineElement>
                        ))}
                    </VerticalTimeline>
                </div>
            </div>

            <div className="mx-auto w-full p-4 sm:px-20 mt-6">
                <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
                <div className="scrolling-wrapper">
                    <div className="infinite-scroll" ref={testimonialsRef}>
                        {Testimonils.map((testimonial, index) => (
                            <div key={index} className="bg-[#eeebfc] p-5 mb-5 rounded-lg shadow-md flex flex-col text-slate-200 card-border min-w-[300px]">
                                <div className="flex justify-start gap-3">
                                    <img src={testimonial.imageUrl} alt={testimonial.heading} className="w-10 h-10 p-1 border-2 border-black-500 rounded-full mb-4" style={{ objectFit: 'cover' }} />
                                    <h4 className="text-primary text-center text-xl">{testimonial.heading}</h4>
                                </div>
                                <p className="text-base text-primary/70"><span className='text-blue text-3xl'>{`"  `}</span> {testimonial.text} <span className='text-3xl text-blue'>{` "`}</span></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex justify-center dot-container'>
                <p className='dot text-8xl text-green-500'>.</p>
                <p className='dot text-8xl text-red-600'>.</p>
                <p className='dot text-8xl text-blue'>.</p>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
