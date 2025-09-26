import React, { useState, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';
import Divider from './Divider';

const CountdownTimer: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft] && timeLeft[interval as keyof typeof timeLeft] !== 0) {
      return;
    }

    timerComponents.push(
      <div key={interval} className="text-center">
        <div className="text-4xl md:text-6xl font-bold text-[#8d6e63]">
            {String(timeLeft[interval as keyof typeof timeLeft]).padStart(2, '0')}
        </div>
        <div className="text-sm uppercase tracking-wider text-gray-500">{interval}</div>
      </div>
    );
  });

  return (
    <div className="flex justify-center space-x-4 md:space-x-8 my-8">
      {timerComponents.length ? timerComponents : <span>Hôn lễ đã diễn ra!</span>}
    </div>
  );
};

const InvitationSection: React.FC = () => {
  const brideHouseMapUrl = "https://maps.app.goo.gl/35Qo8gVj5cy3gPbg8";
  const receptionMapUrl = "https://maps.app.goo.gl/eQNWBQvSyh5jKTap7";

  return (
    <section id="invitation" className="py-20 px-6 bg-[#fdfaf6]">
      <div className="max-w-5xl mx-auto text-center">
        <AnimatedSection>
            <h2 className="font-dancing text-5xl text-[#a1887f] mb-4">Lời Mời Trân Trọng</h2>
            <p className="font-cormorant max-w-2xl mx-auto text-xl italic text-gray-600 mb-12">
            "Tình yêu không phải là nhìn chằm chằm vào nhau, mà là cùng nhau nhìn về một hướng." <br/>- Antoine de Saint-Exupéry
            </p>
        </AnimatedSection>
        
        <AnimatedSection>
            <div className="max-w-4xl mx-auto border-2 border-gray-200 rounded-lg p-12 shadow-sm mb-16">
                <p className="mb-4 text-lg">Trân trọng kính mời bạn đến tham dự</p>
                <h3 className="font-dancing text-4xl text-[#8d6e63] mb-6">Lễ Thành Hôn</h3>
                <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8 space-y-4 md:space-y-0">
                    <div className="md:text-right">
                        <p className="font-bold text-2xl">Quang Linh</p>
                        <p className="font-cormorant text-md mt-1">Con trai Ông Đỗ Văn Lộc<br/>& Bà Nguyễn Thị Phương</p>
                    </div>
                    <div className="px-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#a1887f]" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    </div>
                    <div className="md:text-left">
                        <p className="font-bold text-2xl">Thanh Loan</p>
                        <p className="font-cormorant text-md mt-1">Con gái Ông Nguyễn Văn Tuấn<br/>& Bà Nguyễn Thị Hà</p>
                    </div>
                </div>
            </div>
        </AnimatedSection>
        
        <AnimatedSection>
          <div>
            <div className="grid md:grid-cols-3 gap-8">
               <div className="p-10 bg-white rounded-lg shadow-md transition-transform transform hover:-translate-y-2 flex flex-col">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-6 text-[#8d6e63]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 12V20H4V12M20 12L12 4L4 12M20 12H4M12 4V20" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                <div className="flex-grow">
                  <h4 className="font-dancing text-3xl text-[#a1887f] mb-3">Lễ Ăn Hỏi</h4>
                  <p className="text-xl font-semibold">15:00 - 07.10.2025</p>
                  <p className="mt-2">Tại tư gia nhà gái</p>
                  <p>Thôn Thọ Khê, Xã Văn Môn, Tỉnh Bắc Ninh</p>
                </div>
                 <a href={brideHouseMapUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-[#8d6e63] text-white text-sm font-bold py-2 px-5 rounded-full hover:bg-[#a1887f] transition-colors duration-300 shadow-md">
                  Xem Bản Đồ
                </a>
              </div>
              <div className="p-10 bg-white rounded-lg shadow-md transition-transform transform hover:-translate-y-2 flex flex-col">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-6 text-[#8d6e63]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <circle cx="9" cy="12" r="6" />
                  <circle cx="15" cy="12" r="6" />
                </svg>
                <div className="flex-grow">
                  <h4 className="font-dancing text-3xl text-[#a1887f] mb-3">Hôn Lễ</h4>
                  <p className="text-xl font-semibold">17:00 - 13.11.2025</p>
                  <p className="mt-2">Tại tư gia nhà trai</p>
                  <p>Thôn Bình An, Xã Văn Môn, Tỉnh Bắc Ninh</p>
                </div>
                <a href={brideHouseMapUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-[#8d6e63] text-white text-sm font-bold py-2 px-5 rounded-full hover:bg-[#a1887f] transition-colors duration-300 shadow-md">
                  Xem Bản Đồ
                </a>
              </div>
              <div className="p-10 bg-white rounded-lg shadow-md transition-transform transform hover:-translate-y-2 flex flex-col">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-6 text-[#8d6e63]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <div className="flex-grow">
                  <h4 className="font-dancing text-3xl text-[#a1887f] mb-3">Tiệc Cưới</h4>
                  <p className="text-xl font-semibold">9:00 - 13.11.2025</p>
                  <p className="mt-2">Tại tư gia nhà trai</p>
                  <p>Thôn Bình An, Xã Văn Môn, Tỉnh Bắc Ninh</p>
                </div>
                <a href={receptionMapUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-[#8d6e63] text-white text-sm font-bold py-2 px-5 rounded-full hover:bg-[#a1887f] transition-colors duration-300 shadow-md">
                  Xem Bản Đồ
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
            <Divider />
            <h3 className="font-dancing text-4xl text-[#a1887f] mb-4">Thời gian còn lại</h3>
            <CountdownTimer targetDate="2025-11-13T17:00:00" />
        </AnimatedSection>
      </div>
    </section>
  );
};

export default InvitationSection;