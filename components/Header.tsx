import React from 'react';
import AnimatedSection from './AnimatedSection';

const Header: React.FC = () => {
  return (
    <header className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
      <img 
        src="https://picsum.photos/id/1028/1920/1080" 
        alt="Couple"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 p-4">
        <AnimatedSection>
            <h2 className="font-cormorant text-4xl md:text-5xl mb-4">Trân trọng báo tin</h2>
            <h1 className="font-dancing text-7xl md:text-9xl font-bold mb-2">Quang Minh & Thuỳ Anh</h1>
            <p className="font-cormorant text-xl md:text-2xl mt-4">Sắp về chung một nhà</p>
            <p className="text-lg md:text-xl mt-2">18.12.2025</p>
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