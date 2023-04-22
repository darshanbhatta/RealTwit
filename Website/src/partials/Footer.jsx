import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer>
            <div className='max-w-6xl mx-auto px-4 sm:px-6'>
                {/* Bottom area */}
                <div className='md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200'>
                    {/* <a href="mailto:<email here>" className="text-sm text-gray-400 mr-4"><email here></a> */}

                    <ul className='flex mb-4 md:order-1 md:ml-4 md:mb-0'>
                        <li>
                            <Link
                                to='https://twitter.com/darshanbX'
                                className='flex justify-center items-center text-gray-400 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out'
                                aria-label='Twitter'
                            >
                                <svg
                                    className='w-8 h-8 fill-current'
                                    viewBox='0 0 32 32'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path d='M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z' />
                                </svg>
                            </Link>
                        </li>
                    </ul>

                    {/* Copyrights note */}
                    {/* <div className="text-sm text-gray-400 mr-4">
            © {new Date().getFullYear()} <company name>. All rights reserved.
          </div> */}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
