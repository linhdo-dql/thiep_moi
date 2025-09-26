import React, { useState, useRef } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import InvitationSection from './components/InvitationSection';
import StorySection from './components/StorySection';
import GallerySection from './components/GallerySection';
import RSVPSection from './components/RSVPSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import GuestBook from './components/GuestBook';

const MainInvitationPage: React.FC = () => (
  <>
    <Header />
    <main>
      <InvitationSection />
      <StorySection />
      <GallerySection />
      <RSVPSection />
      <ContactSection />
    </main>
    <Footer />
  </>
);

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isSiteEntered, setIsSiteEntered] = useState(false);

  const handleSiteEnter = () => {
    setIsSiteEntered(true);
    const audio = audioRef.current;
    if (audio) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Audio playback failed after interaction:", error);
        setIsPlaying(false);
      });
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-[#fdfaf6] text-gray-700 font-cormorant">
      <audio 
        ref={audioRef} 
        src="https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/dhalius-calm-and-peaceful.mp3" 
        loop 
      />

      {!isSiteEntered && (
        <div className="fixed inset-0 z-[100] bg-[#fdfaf6] flex items-center justify-center text-center p-4">
          <div className="animate-fade-in">
            <h1 className="font-dancing text-5xl md:text-7xl text-[#a1887f] mb-4 flex items-center justify-center gap-4 md:gap-8">
              <div className="md:hidden text-center leading-tight">
                <span>Quang</span><br/>
                <span>Linh</span>
              </div>
              <span className="hidden md:inline">Quang Linh</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#a1887f]" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <div className="md:hidden text-center leading-tight">
                <span>Thanh</span><br/>
                <span>Loan</span>
              </div>
              <span className="hidden md:inline">Thanh Loan</span>
            </h1>
            <p className="font-cormorant text-xl md:text-2xl text-gray-600 mb-12">Trân trọng mời bạn tham dự lễ cưới</p>
            <button
              onClick={handleSiteEnter}
              className="bg-[#8d6e63] text-white font-bold py-4 px-10 rounded-full hover:bg-[#a1887f] transition-colors duration-300 shadow-lg text-lg"
            >
              Mở Thiệp Mời
            </button>
          </div>
          <style>{`
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
              animation: fade-in 1.5s ease-out forwards;
            }
          `}</style>
        </div>
      )}

      {isSiteEntered && (
        <div className="animate-app-fade-in">
          <HashRouter>
            <Routes>
              <Route path="/" element={<MainInvitationPage />} />
              <Route path="/guestbook" element={<GuestBook />} />
            </Routes>
          </HashRouter>

          <button
            onClick={toggleMusic}
            className="fixed bottom-5 right-5 z-50 p-3 bg-white/80 rounded-full shadow-lg backdrop-blur-sm hover:bg-white transition-colors duration-300"
            aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l-4-4m0 4l4-4" />
              </svg>
            )}
          </button>
           <style>{`
            @keyframes app-fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-app-fade-in {
              animation: app-fade-in 1s ease-in;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default App;