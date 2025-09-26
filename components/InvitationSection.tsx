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
  return (
    <section id="invitation" className="py-20 px-6 bg-[#fdfaf6]">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedSection>
            <h2 className="font-dancing text-5xl text-[#a1887f] mb-4">Lời Mời Trân Trọng</h2>
            <p className="font-cormorant max-w-2xl mx-auto text-xl italic text-gray-600 mb-12">
            "Tình yêu không phải là nhìn chằm chằm vào nhau, mà là cùng nhau nhìn về một hướng." <br/>- Antoine de Saint-Exupéry
            </p>
        </AnimatedSection>
        
        <AnimatedSection>
            <div className="max-w-3xl mx-auto border-2 border-gray-200 rounded-lg p-10 shadow-sm mb-16">
                <p className="mb-4 text-lg">Trân trọng kính mời bạn đến tham dự</p>
                <h3 className="font-dancing text-4xl text-[#8d6e63] mb-6">Lễ Thành Hôn</h3>
                <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8 space-y-4 md:space-y-0">
                    <div className="md:text-right">
                        <p className="font-bold text-2xl">Quang Minh</p>
                        <p className="font-cormorant text-md mt-1">Con trai Ông Nguyễn Văn An<br/>& Bà Trần Thị Bích</p>
                    </div>
                    <p className="font-dancing text-4xl text-[#a1887f]">&</p>
                    <div className="md:text-left">
                        <p className="font-bold text-2xl">Thuỳ Anh</p>
                        <p className="font-cormorant text-md mt-1">Con gái Ông Lê Hoàng Long<br/>& Bà Đặng Thu Cúc</p>
                    </div>
                </div>
            </div>
        </AnimatedSection>
        
        <AnimatedSection>
          <div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="p-10 bg-white rounded-lg shadow-md transition-transform transform hover:-translate-y-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-6 text-[#8d6e63]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <circle cx="9" cy="12" r="6" />
                  <circle cx="15" cy="12" r="6" />
                </svg>
                <h4 className="font-dancing text-3xl text-[#a1887f] mb-3">Hôn Lễ</h4>
                <p className="text-xl font-semibold">10:00 - 18.12.2025</p>
                <p className="mt-2">Tại tư gia nhà gái</p>
                <p>Số 123, Đường ABC, Quận 1, TP. Hồ Chí Minh</p>
              </div>
              <div className="p-10 bg-white rounded-lg shadow-md transition-transform transform hover:-translate-y-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-6 text-[#8d6e63]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <h4 className="font-dancing text-3xl text-[#a1887f] mb-3">Tiệc Cưới</h4>
                <p className="text-xl font-semibold">18:00 - 18.12.2025</p>
                <p className="mt-2">Trung tâm tiệc cưới Diamond Place</p>
                <p>15A Hồ Văn Huê, P.9, Q. Phú Nhuận, TP. HCM</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
            <Divider />
            <h3 className="font-dancing text-4xl text-[#a1887f] mb-4">Thời gian còn lại</h3>
            <CountdownTimer targetDate="2025-12-18T10:00:00" />
        </AnimatedSection>
      </div>
    </section>
  );
};

export default InvitationSection;