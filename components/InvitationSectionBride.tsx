import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';
import Divider from './Divider';

const CountdownTimer: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: { [key: string]: number } = {};

    if (difference > 0) {
      timeLeft = {
        'Ngày': Math.floor(difference / (1000 * 60 * 60 * 24)),
        'Giờ': Math.floor((difference / (1000 * 60 * 60)) % 24),
        'Phút': Math.floor((difference / 1000 / 60) % 60),
        'Giây': Math.floor((difference / 1000) % 60),
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

  // FIX: Use React.ReactElement to avoid "Cannot find namespace 'JSX'" error.
  const timerComponents: React.ReactElement[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft] && timeLeft[interval as keyof typeof timeLeft] !== 0) {
      return;
    }

    timerComponents.push(
      <div key={interval} className="text-center px-2 py-4 md:px-4 md:py-6 bg-gradient-to-br from-white to-[#fefefe] rounded-xl md:rounded-2xl shadow-xl border border-[#D4AF37]/20 w-full md:w-auto md:min-w-[100px] flex-shrink">
        <div className="text-3xl md:text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#8d6e63] to-[#C9A961] mb-1 md:mb-2 font-numbers">
            {String(timeLeft[interval as keyof typeof timeLeft]).padStart(2, '0')}
        </div>
        <div className="text-[10px] md:text-xs lg:text-sm uppercase tracking-wider text-gray-600 font-cormorant font-medium">{interval}</div>
      </div>
    );
  });

    return (
    <div className="w-full px-2 md:px-0 my-8">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-8 max-w-full">
        {timerComponents.length ? timerComponents : <span className="text-xl text-gray-600 font-cormorant italic">Hôn lễ đã diễn ra!</span>}
      </div>
    </div>
  );
};

const InvitationSectionBride: React.FC = () => {
  const brideHouseMapUrl = "https://maps.app.goo.gl/De1P3MeuYD1YVYdZA";
  const receptionMapUrl = "https://maps.app.goo.gl/NT9KpErVBhQ99stN6?g_st=com.google.maps.preview.copy";
  
  const [searchParams] = useSearchParams();
  const guestName = searchParams.get('to') || 'Quý Vị';
  const guestRole = searchParams.get('role') || '';
  const isParent = searchParams.get('parent') === 'true';

  // Hàm xác định cách xưng hô dựa trên vai vế
  const getAddressing = (role: string, parent: boolean): { self: string; children: string; guest: string } => {
    let baseAddressing: { self: string; children: string; guest: string };
    
    switch (role) {
      case 'Anh':
      case 'Chị':
        baseAddressing = { self: 'chúng em', children: 'chúng em', guest: 'Anh/Chị' };
        break;
      case 'Cô':
      case 'Chú':
      case 'Bác':
      case 'Dì':
        baseAddressing = { self: 'chúng cháu', children: 'chúng cháu', guest: 'Cô/Chú/Bác/Dì' };
        break;
      case 'Ông':
      case 'Bà':
        baseAddressing = { self: 'chúng con', children: 'chúng con', guest: 'Ông/Bà' };
        break;
      case 'Em':
        baseAddressing = { self: 'anh chị', children: 'anh chị', guest: 'Em/Bạn' };
        break;
      default:
        baseAddressing = { self: 'chúng tôi', children: 'chúng tôi', guest: 'Quý vị' };
    }
    
    // Nếu là phụ huynh, thêm "hai con " phía trước cách xưng hô
    if (parent) {
      return {
        self: `hai con ${baseAddressing.self}`,
        children: `hai con ${baseAddressing.children}`,
        guest: baseAddressing.guest
      };
    }
    
    return baseAddressing;
  };

  const addressing = getAddressing(guestRole, isParent);

  // Hàm lấy vai vế hiển thị
  const getGuestRoleDisplay = (role: string): string => {
    if (!role) return 'Quý vị';
    return role;
  };

  // Hàm lấy tên khách mời với vai vế
  const getGuestNameWithRole = (name: string, role: string): string => {
    if (!role) return name;
    return `${role} ${name}`;
  };

  const guestRoleDisplay = getGuestRoleDisplay(guestRole);
  const guestNameWithRole = getGuestNameWithRole(guestName, guestRole);

  return (
    <section id="invitation" className="py-16 px-6 bg-gradient-to-b from-[#fdfaf6] via-white to-[#fdfaf6]">
      <div className="max-w-5xl mx-auto text-center">
        <AnimatedSection>
            <div className="mb-8">
              <h2 className="font-dancing text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] via-[#C9A961] to-[#8d6e63] mb-6" style={{ padding: '20px' }}>Lời Mời Trân Trọng</h2>
            </div>
            <p className="font-cormorant max-w-2xl mx-auto text-xl md:text-2xl italic text-gray-700 mb-16 leading-relaxed">
            "Tình yêu không phải là nhìn chằm chằm vào nhau, mà là cùng nhau nhìn về một hướng." <br/>
            <span className="text-lg text-gray-500 mt-2 block">- Antoine de Saint-Exupéry</span>
            </p>
        </AnimatedSection>
        
        <AnimatedSection>
             <div className="max-w-4xl mx-auto border-2 border-[#D4AF37]/30 rounded-3xl p-12 md:p-16 shadow-2xl bg-gradient-to-br from-white via-[#fefefe] to-white mb-20 backdrop-blur-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
                <p className="font-cormorant text-xl md:text-2xl text-gray-800 leading-relaxed mb-12 font-light">
                    Được sự cho phép của hai bên gia đình, {addressing.self} vô cùng hạnh phúc báo tin vui và trân trọng kính mời <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] to-[#C9A961]">{guestNameWithRole}</span> đến tham dự buổi tiệc thân mật mừng Lễ Thành Hôn của hai con {addressing.self}:
                </p>
                
                {/* Thông tin nhà gái trước, nhà trai sau */}
                <div className="flex flex-col md:flex-row items-center justify-center md:space-x-12 space-y-4 md:space-y-0 mb-12 px-4 md:px-0">
                    <div className="text-center md:text-right w-full md:w-auto">
                        <p className="font-bold text-3xl md:text-4xl lg:text-5xl font-cormorant text-transparent bg-clip-text bg-gradient-to-r from-[#C9A961] to-[#8d6e63] mb-3 md:mb-2 leading-tight">Thanh Loan</p>
                        <p className="font-cormorant text-base md:text-lg lg:text-xl mt-2 text-gray-600 leading-relaxed">Con gái Ông Nguyễn Quang Tuấn<br/>& Bà Nguyễn Thị Hà</p>
                    </div>
                    <div className="px-2 md:px-4 py-2 md:py-0">
                        <img 
                          src="/images/ring.png" 
                          alt="Nhẫn cưới" 
                          className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 drop-shadow-lg object-contain flex-shrink-0"
                          loading="eager"
                        />
                    </div>
                    <div className="text-center md:text-left w-full md:w-auto">
                        <p className="font-bold text-3xl md:text-4xl lg:text-5xl font-cormorant text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] to-[#C9A961] mb-3 md:mb-2 leading-tight">Quang Linh</p>
                        <p className="font-cormorant text-base md:text-lg lg:text-xl mt-2 text-gray-600 leading-relaxed">Con trai Ông Đỗ Văn Lộc<br/>& Bà Nguyễn Thị Phương</p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-[#D4AF37]/20">
                  <p className="font-cormorant text-xl md:text-2xl text-gray-800 leading-relaxed italic font-light">
                      Sự hiện diện của {guestRoleDisplay} là niềm vinh hạnh to lớn và là lời chúc phúc quý giá nhất cho ngày vui của {addressing.self}.
                      <br/><br/>
                      <span className="text-[#8d6e63] font-medium">Rất hân hạnh được đón tiếp!</span>
                  </p>
                </div>
            </div>
        </AnimatedSection>
        
        <AnimatedSection>
          <div>
            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              <div className="p-10 bg-gradient-to-br from-white to-[#fefefe] rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl flex flex-col border border-[#D4AF37]/20 relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] via-[#C9A961] to-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mx-auto mb-6 text-[#D4AF37] transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <div className="flex-grow">
                  <h4 className="font-dancing text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] to-[#C9A961] mb-4">Tiệc Cưới</h4>
                  <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-3"><span className="font-numbers">17:00</span> - <span className="font-numbers">12.11.2025</span></p>
                  <p className="text-gray-600 mb-1">Tại nhà văn hóa cộng đồng</p>
                  <p className="text-gray-600">Thôn Thọ Khê, Xã Văn Môn, Tỉnh Bắc Ninh</p>
                </div>
                <a href={receptionMapUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block bg-gradient-to-r from-[#8d6e63] to-[#C9A961] text-white text-sm font-semibold py-3 px-6 rounded-full hover:from-[#C9A961] hover:to-[#8d6e63] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Xem Bản Đồ
                </a>
              </div>
              <div className="p-10 bg-gradient-to-br from-white to-[#fefefe] rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl flex flex-col border border-[#D4AF37]/20 relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] via-[#C9A961] to-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mx-auto mb-6 text-[#D4AF37] transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <circle cx="9" cy="12" r="6" />
                  <circle cx="15" cy="12" r="6" />
                </svg>
                <div className="flex-grow">
                  <h4 className="font-dancing text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] to-[#C9A961] mb-4">Hôn Lễ</h4>
                  <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-3"><span className="font-numbers">7:00</span> - <span className="font-numbers">13.11.2025</span></p>
                  <p className="text-gray-600 mb-1">Tại tư gia nhà gái</p>
                  <p className="text-gray-600">Thôn Thọ Khê, Xã Văn Môn, Tỉnh Bắc Ninh</p>
                </div>
                <a href={brideHouseMapUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block bg-gradient-to-r from-[#8d6e63] to-[#C9A961] text-white text-sm font-semibold py-3 px-6 rounded-full hover:from-[#C9A961] hover:to-[#8d6e63] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Xem Bản Đồ
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
            <Divider />
            <div className="mt-16">
              <h3 className="font-dancing text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] via-[#C9A961] to-[#8d6e63] mb-8" style={{ padding: '20px' }}>Thời gian còn lại</h3>
              <CountdownTimer targetDate="2025-11-13T07:00:00" />
            </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default InvitationSectionBride;

