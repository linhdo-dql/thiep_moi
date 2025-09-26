import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer 
      className="py-20 text-center text-white"
      style={{
        backgroundImage: "url('https://picsum.photos/id/1060/1920/1080')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="bg-black bg-opacity-50 py-20">
        <h2 className="font-dancing text-5xl mb-4">Trân trọng cảm ơn!</h2>
        <p className="font-cormorant text-2xl mb-6">Cảm ơn bạn đã là một phần trong câu chuyện của chúng tôi.</p>
        <p className="font-dancing text-4xl">Minh & Anh</p>
      </div>
    </footer>
  );
};

export default Footer;