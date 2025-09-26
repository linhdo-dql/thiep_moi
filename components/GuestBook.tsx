import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';
import Divider from './Divider';

interface GuestMessage {
    name: string;
    message: string;
    attendance: 'attending' | 'not_attending';
    date: string;
}

const GuestBook: React.FC = () => {
  const [messages, setMessages] = useState<GuestMessage[]>([]);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('guestMessages') || '[]');
    setMessages(storedMessages);
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);

  return (
    <div className="py-20 px-6 bg-[#fdfaf6] min-h-screen">
      <div className="max-w-3xl mx-auto text-center">
        <AnimatedSection>
            <h1 className="font-dancing text-6xl text-[#a1887f]">Sổ Lưu Bút</h1>
            <p className="mt-4 text-lg">Những lời chúc phúc từ những người thân yêu.</p>
            <Divider />
        </AnimatedSection>
        
        <div className="space-y-6">
            {messages.length > 0 ? (
                messages.map((msg, index) => (
                    <AnimatedSection key={index}>
                        <div className="bg-white p-6 rounded-lg shadow-md text-left border-l-4 border-[#a1887f]">
                            <p className="font-cormorant text-xl italic text-gray-700">"{msg.message}"</p>
                            <p className="text-right mt-4 font-bold text-md text-[#8d6e63]">- {msg.name}</p>
                            <p className="text-right text-xs text-gray-400 mt-1">
                                {new Date(msg.date).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </AnimatedSection>
                ))
            ) : (
                <p>Chưa có lời chúc nào được gửi.</p>
            )}
        </div>

        <div className="mt-12">
            <Link to="/" className="bg-[#8d6e63] text-white font-bold py-3 px-8 rounded-full hover:bg-[#a1887f] transition-colors duration-300 shadow-lg">
                Trở Về Thiệp Mời
            </Link>
        </div>
      </div>
    </div>
  );
};

export default GuestBook;