import React from 'react';

import Header from '../partials/Header';
import HeroHome from '../partials/HeroHome';
import Footer from '../partials/Footer';

function Home() {
    return (
        <div className='bg-black flex flex-col min-h-screen overflow-hidden'>
            {/*  Site header */}
            <Header />

            {/*  Page content */}
            <main className='flex-grow'>
                <HeroHome />
            </main>

            {/*  Site footer */}
            <Footer />
        </div>
    );
}

export default Home;
