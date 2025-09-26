import React, { useState, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';

const Header: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
      <img 
        src="https://i.imgur.com/gJZ438W.jpeg" 
        alt="Sảnh cưới lộng lẫy trang trí hoa"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: `translateY(${offsetY * 0.5}px) scale(1.1)` }}
        loading="eager"
      />
      <div className="relative z-20 p-4">
        <AnimatedSection>
            <h2 className="font-cormorant text-2xl md:text-3xl mb-4">Trân trọng báo tin</h2>
            <h1 className="font-dancing text-5xl md:text-7xl font-bold mb-2 flex items-center justify-center gap-4 md:gap-8">
              <div className="md:hidden text-center leading-tight">
                <span>Quang</span><br/>
                <span>Linh</span>
              </div>
              <span className="hidden md:inline">Quang Linh</span>

              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              
              <div className="md:hidden text-center leading-tight">
                <span>Thanh</span><br/>
                <span>Loan</span>
              </div>
              <span className="hidden md:inline">Thanh Loan</span>
            </h1>
            <p className="font-cormorant text-lg md:text-xl mt-4">Sắp về chung một nhà</p>
            <p className="text-2xl md:text-2xl mt-4">13.11.2025</p>
        </AnimatedSection>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </header>
  );
};

export default Header;