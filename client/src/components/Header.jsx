import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';

export default function Header() {
    const Links = [
        { name: "Home", link: "/Home" },
        { name: "Documents", link: "/publicdocuments" },

    ];

    const CurrentUser = useSelector(state => state.user.CurrentUser);
    let [open, setOpen] = useState(false);

    useEffect(() => {
        console.log("CurrentUser:", CurrentUser);
    }, [CurrentUser]);

    return (
        <div className='shadow-md w-full fixed top-0 left-0 z-50'>
            <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
                <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>
                    <img src='https://firebasestorage.googleapis.com/v0/b/my-first-project-6eebf.appspot.com/o/pdfs%2F1.png?alt=media&token=85fd67e1-622c-48b6-93bb-6f57ff84f513' className='w-10 h-10' alt='logo' />
                    <p className="text-gray-800 ">
							Merit<span className="text-blue-600"> Institution</span>
						</p>
                </div>
                <div onClick={() => setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
                    {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
                </div>
                <ul className={`md:flex md:items-center gap-1 md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
                    {Links.map((link, index) => (
                        <li key={index} className='md:ml-8 md:my-0 my-7 font-semibold'>
                            <Link to={link.link} className='text-gray-800 hover:text-blue-400 duration-500'>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                    
                    <Link to='/studentdetails' className='md:my-0 my-7 font-semibold text-gray-800 hover:text-blue-400 duration-500' >
                        {CurrentUser && CurrentUser.role == 'student' ? (
                            <div className="flex items-center">
                            <img
                              className='rounded-full md:ml-8 h-7 w-7 object-cover'
                              src={CurrentUser.avatar || 'https://www.w3schools.com/w3images/avatar2.png'}
                              alt='profile'
                            />
                            <p className='md:ml-8 font-semibold md:hidden'>{CurrentUser.name}</p>
                          </div>
                        ) : (
                            <li className='md:ml-8 font-semibold'>Student's Sign in</li>
                        )}
                    </Link>

                    <Link to='/studentcreation' className=' md:my-0 my-7 font-semibold text-gray-800 hover:text-blue-400 duration-500' >
                        {CurrentUser && CurrentUser.role == 'teacher' ? (
                            <div className="flex items-center">
                            <img
                              className='md:my-0 my-7 rounded-full h-7 w-7 md:ml-8 object-cover'
                              src={CurrentUser.avatar || 'https://www.w3schools.com/w3images/avatar2.png'}
                              alt='profile'
                            />
                            <p className='md:ml-8 md:my-0 my-7 font-semibold md:hidden '>{CurrentUser.username}</p>
                            </div>
                        ) : (
                            <li className='md:ml-8 md:my-0 my-7 font-semibold '>Teacher's Sign in</li>
                        )}
                    </Link>
                </ul>
            </div>
        </div>
    );
}
