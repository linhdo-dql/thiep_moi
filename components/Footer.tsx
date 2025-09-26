import React, { useRef, useEffect, useState } from 'react';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const top = footerRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight) {
          setOffset((windowHeight - top) * 0.2); 
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="text-center text-white relative overflow-hidden"
    >
      <img 
        src="https://i.postimg.cc/0NZFy3bc/bghead.jpg" 
        alt="Sảnh cưới lộng lẫy trang trí hoa"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: `translateY(-${offset}px) scale(1.1)`,
        }}
      />
      <div className="relative bg-black bg-opacity-50 py-20">
        <h2 className="font-dancing text-5xl mb-4">Trân trọng cảm ơn!</h2>
        <p className="font-cormorant text-2xl mb-6">Cảm ơn bạn đã là một phần trong câu chuyện của chúng tôi.</p>
        <div className="flex items-center justify-center gap-4 font-dancing text-3xl">
          <div className="md:hidden text-center leading-tight">
            <span>Quang</span><br/>
            <span>Linh</span>
          </div>
          <span className="hidden md:inline">Quang Linh</span>
          
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>

          <div className="md:hidden text-center leading-tight">
            <span>Thanh</span><br/>
            <span>Loan</span>
          </div>
          <span className="hidden md:inline">Thanh Loan</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;