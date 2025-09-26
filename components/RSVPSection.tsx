import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';
import Divider from './Divider';
import GiftModal from './GiftModal';

const RSVPSection: React.FC = () => {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('attending');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save message to localStorage
    const existingMessages = JSON.parse(localStorage.getItem('guestMessages') || '[]');
    const newMessage = { 
      name, 
      message, 
      attendance,
      date: new Date().toISOString() 
    };
    const updatedMessages = [newMessage, ...existingMessages];
    localStorage.setItem('guestMessages', JSON.stringify(updatedMessages));

    setIsSubmitted(true);

    // Show the gift modal if attending
    if (attendance === 'attending') {
        setTimeout(() => {
            setIsModalOpen(true);
        }, 1500);
    }
  };
  
  return (
    <section id="rsvp" className="py-20 px-6 bg-white text-center">
      <div className="max-w-2xl mx-auto">
        <AnimatedSection>
          <h2 className="font-dancing text-5xl text-[#a1887f]">Gửi Lời Chúc & Xác Nhận</h2>
          <Divider />
        </AnimatedSection>
        <AnimatedSection>
          {!isSubmitted ? (
            <>
              <p className="text-lg mb-8">
                Sự hiện diện của bạn là món quà quý giá nhất. Vui lòng gửi lời chúc và xác nhận tham dự trước ngày <strong>10.12.2025</strong> nhé!
              </p>
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Tên của bạn</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#a1887f] focus:outline-none"
                    placeholder="Ví dụ: Nguyễn Văn A"
                  />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Bạn sẽ tham dự chứ?</label>
                   <div className="flex items-center space-x-6">
                        <label className="flex items-center cursor-pointer">
                            <input type="radio" name="attendance" value="attending" checked={attendance === 'attending'} onChange={(e) => setAttendance(e.target.value)} className="h-4 w-4 text-[#8d6e63] focus:ring-[#a1887f] border-gray-300"/>
                            <span className="ml-2 text-gray-700">Chắc chắn sẽ tham dự</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input type="radio" name="attendance" value="not_attending" checked={attendance === 'not_attending'} onChange={(e) => setAttendance(e.target.value)} className="h-4 w-4 text-[#8d6e63] focus:ring-[#a1887f] border-gray-300"/>
                            <span className="ml-2 text-gray-700">Rất tiếc không thể tham dự</span>
                        </label>
                   </div>
                </div>
                 <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Lời chúc của bạn</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#a1887f] focus:outline-none"
                    placeholder="Gửi gắm yêu thương..."
                  ></textarea>
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-[#8d6e63] text-white font-bold py-3 px-8 rounded-full hover:bg-[#a1887f] transition-colors duration-300 shadow-lg"
                    >
                        Gửi Lời Chúc
                    </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center p-8 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-2xl font-semibold text-green-800">Cảm ơn bạn đã phản hồi!</h3>
                <p className="mt-2 text-green-700">Lời chúc của bạn đã được ghi lại trong sổ lưu bút của chúng tôi.</p>
                <Link to="/guestbook" className="inline-block mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded-full hover:bg-green-700 transition-colors">
                    Xem Sổ Lưu Bút
                </Link>
            </div>
          )}
        </AnimatedSection>
      </div>
      <GiftModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default RSVPSection;