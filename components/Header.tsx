import React, { useState, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';

const Header: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const scrollToInvitation = () => {
    const invitationSection = document.getElementById('invitation');
    if (invitationSection) {
      invitationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 z-10"></div>
      <img 
        src="/images/5.JPG" 
        alt="Sảnh cưới lộng lẫy trang trí hoa"
        className="absolute inset-0 w-full h-full object-cover "
        style={{ 
          transform: `translateY(${offsetY * 0.5}px) scale(1.1)`, 
          objectPosition: isDesktop ? '15% 20%' : '20% 20%' 
        } }
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30 z-15"></div>
      <div className="relative z-20 p-4 md:p-6 w-full max-w-full mx-auto overflow-visible" style={{ textRendering: 'optimizeLegibility', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
        <AnimatedSection>
            <div className="mb-4 md:mb-6 px-2">
              <p className="font-cormorant text-base md:text-xl lg:text-2xl text-[#FFE5B4] tracking-[0.15em] md:tracking-[0.2em] uppercase font-light mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] break-words pb-4 relative" style={{ textRendering: 'optimizeLegibility' }}>Trân trọng báo tin</p>
              <div className="w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto relative -mt-6 md:-mt-8 z-0"></div>
            </div>
            <h1 className="font-dancing text-3xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 flex flex-wrap items-center justify-center gap-2 md:gap-4 lg:gap-10 drop-shadow-2xl px-4 md:px-8 overflow-visible" style={{ textRendering: 'optimizeLegibility', WebkitFontSmoothing: 'antialiased' }}>
              <div className="md:hidden text-center leading-tight overflow-visible" style={{ padding: '0 4px' }}>
                <span className="bg-gradient-to-b from-white via-[#FFE5B4] to-[#D4AF37] bg-clip-text text-transparent inline-block header-name-text" style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Quang</span><br/>
                <span className="bg-gradient-to-b from-white via-[#FFE5B4] to-[#D4AF37] bg-clip-text text-transparent inline-block header-name-text" style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Linh</span>
              </div>
              <span className="hidden md:inline bg-gradient-to-b from-white via-[#FFE5B4] to-[#D4AF37] bg-clip-text text-transparent inline-block overflow-visible header-name-text" style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Quang Linh</span>

              <img 
                src="/images/ring.png" 
                alt="Nhẫn cưới" 
                className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 drop-shadow-lg object-contain flex-shrink-0"
                loading="eager"
                onError={(e) => {
                  console.error('Error loading ring image:', e);
                  e.currentTarget.style.display = 'none';
                }}
              />
              
              <div className="md:hidden text-center leading-tight overflow-visible" style={{ padding: '0 4px' }}>
                <span className="bg-gradient-to-b from-white via-[#FFE5B4] to-[#D4AF37] bg-clip-text text-transparent inline-block header-name-text" style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Thanh</span><br/>
                <span className="bg-gradient-to-b from-white via-[#FFE5B4] to-[#D4AF37] bg-clip-text text-transparent inline-block header-name-text" style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Loan</span>
              </div>
              <span className="hidden md:inline bg-gradient-to-b from-white via-[#FFE5B4] to-[#D4AF37] bg-clip-text text-transparent inline-block overflow-visible header-name-text" style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Thanh Loan</span>
            </h1>
            <p className="font-cormorant text-base md:text-xl lg:text-2xl mt-4 md:mt-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] italic px-2 break-words" style={{ textRendering: 'optimizeLegibility' }}>Sắp về chung một nhà</p>
            <div className="mt-6 md:mt-8 flex items-center justify-center gap-2 md:gap-3 px-2 flex-wrap">
              <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
              <p className="text-xl md:text-3xl lg:text-4xl font-numbers text-[#FFE5B4] font-semibold tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap" style={{ textRendering: 'optimizeLegibility' }}>13.11.2025</p>
              <div className="w-8 md:w-12 h-px bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
            </div>
        </AnimatedSection>
      </div>
      <button 
        onClick={scrollToInvitation}
        className="absolute bottom-10 left-[45%] md:left-[48%] z-20 animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] rounded-full p-2"
        aria-label="Scroll to invitation section"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/80 hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <style>{`
        .header-name-text {
          padding: 10px !important;
        }
      `}</style>
    </header>
  );
};

export default Header;