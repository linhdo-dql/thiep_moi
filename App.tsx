import React from 'react';
import Header from './components/Header';
import InvitationSection from './components/InvitationSection';
import StorySection from './components/StorySection';
import GallerySection from './components/GallerySection';
import RSVPSection from './components/RSVPSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-[#fdfaf6] text-gray-700 font-cormorant">
      <Header />
      <main>
        <InvitationSection />
        <StorySection />
        <GallerySection />
        <RSVPSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
