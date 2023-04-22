import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import getBrowserUrl from '../getUrl';

function Header() {
    const [top, setTop] = useState(true);

    // detect whether user has scrolled the page down by 10px
    useEffect(() => {
        const scrollHandler = () => {
            window.pageYOffset > 10 ? setTop(false) : setTop(true);
        };
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [top]);

    return (
        <header
            className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
                !top && 'bg-black backdrop-blur-sm shadow-lg'
            }`}
        >
            <div className='max-w-6xl mx-auto px-5 sm:px-6'>
                <div className='flex items-center justify-between h-16 md:h-20'>
                    {/* Site branding */}
                    <div className='flex-shrink-0 mr-4'>
                        {/* Logo */}
                        <Link to='/' className='block'>
                            <div className='flex items-center'>
                                <img src={logo} className='w-8 h-8 rounded-md mr-2'></img>
                                <p className='text-xl font-bold text-white'>RealTwit</p>
                            </div>
                        </Link>
                    </div>

                    {/* Site navigation */}
                    <nav className='flex flex-grow'>
                        <ul className='flex flex-grow justify-end flex-wrap items-center'>
                            <li>
                                <Link
                                    to={getBrowserUrl()}
                                    className='text-white font-bold bg-gradient-to-br from-teal-600 to-blue-500 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
                                >
                                    INSTALL NOW
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
