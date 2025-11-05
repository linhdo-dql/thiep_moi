import React from 'react';
import { useSearchParams } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';
import Divider from './Divider';

const SaveTheDateSection: React.FC = () => {
  const [searchParams] = useSearchParams();
  const guestRole = searchParams.get('role') || '';
  const isParent = searchParams.get('parent') === 'true';

  // Hàm xác định cách xưng hô dựa trên vai vế
  const getAddressing = (role: string, parent: boolean): string => {
    let baseAddressing: string;
    
    switch (role) {
      case 'Anh':
      case 'Chị':
        baseAddressing = 'chúng em';
        break;
      case 'Cô':
      case 'Chú':
      case 'Bác':
      case 'Dì':
        baseAddressing = 'chúng cháu';
        break;
      case 'Ông':
      case 'Bà':
        baseAddressing = 'chúng con';
        break;
      case 'Em':
        baseAddressing = 'anh chị';
        break;
      default:
        baseAddressing = 'chúng tôi';
    }
    
    // Nếu là phụ huynh, thêm "hai con " phía trước cách xưng hô
    if (parent) {
      return `hai con ${baseAddressing}`;
    }
    
    return baseAddressing;
  };

  const addressing = getAddressing(guestRole, isParent);

  // Hàm lấy vai vế hiển thị cho người được mời
  const getGuestRoleDisplay = (role: string): string => {
    if (!role) return 'Quý vị';
    return role;
  };

  const guestRoleDisplay = getGuestRoleDisplay(guestRole);

  // --- Dữ liệu cho lịch tháng 11 năm 2025 ---
  const year = 2025;
  const month = 10; // Tháng trong JavaScript bắt đầu từ 0 (0=Tháng 1, 10=Tháng 11)
  const daysInMonth = 30;
  const firstDayOfMonth = new Date(year, month, 1).getDay(); 
  const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const specialDays = [12, 13];
  const specialDayLabels: Record<number, string> = {
    12: 'Tiệc Cưới',
    13: 'Lễ Thành Hôn',
  };

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="aspect-square"></div>);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const isSpecial = specialDays.includes(day);
    calendarDays.push(
      <div 
        key={day} 
        className="flex flex-col items-center justify-center relative aspect-square p-0.5 md:p-1 group"
      >
        <div className={`relative flex items-center justify-center w-full h-full transition-all duration-300 ${
          isSpecial 
            ? 'transform scale-110' 
            : 'hover:scale-105'
        }`}>
          {isSpecial && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] via-[#C9A961] to-[#B8860B] rounded-full opacity-20 animate-pulse-slow"></div>
          )}
          <span className={`relative z-10 flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full font-numbers text-base md:text-lg font-semibold transition-all duration-300 ${
            isSpecial 
              ? 'bg-gradient-to-br from-[#D4AF37] to-[#C9A961] text-white font-bold shadow-xl border-2 border-white/50 aspect-square' 
              : 'text-gray-700 hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 hover:text-gray-800'
          }`}>
            {day}
          </span>
          {isSpecial && (
            <div className="absolute -top-1 -right-1 z-20">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37] animate-bounce-slow drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            </div>
          )}
        </div>
        {isSpecial && (
          <div className="hidden md:block absolute left-1/2 -bottom-5 md:-bottom-6 -translate-x-1/2 z-20 w-full">
            <div className="bg-gradient-to-r from-[#D4AF37] to-[#C9A961] text-white text-xs md:text-sm font-cormorant font-semibold px-2 md:px-3 py-1 md:py-1.5 rounded-full shadow-lg whitespace-nowrap max-w-[90%] mx-auto">
              {specialDayLabels[day]}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <section id="save-the-date" className="py-16 px-6 bg-gradient-to-b from-[#fdfaf6] via-white to-[#fdfaf6]">
      <div className="max-w-6xl mx-auto text-center">
        <AnimatedSection>
          <div className="mb-8">
            <h2 className="font-dancing text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] via-[#C9A961] to-[#8d6e63] mb-6" style={{ padding: '20px' }}>Lịch Tháng Yêu Thương</h2>
          </div>
          <p className="font-cormorant text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed">
            Xin trân trọng gửi tới {guestRoleDisplay} những ngày trọng đại nhất trong hành trình của {addressing}.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] to-[#C9A961] font-cormorant font-semibold text-xl mt-2 block"><span className="font-numbers">12/11</span>: Tiệc Cưới &nbsp;|&nbsp; <span className="font-numbers">13/11</span>: Lễ Thành Hôn</span>
          </p>
          <Divider />
        </AnimatedSection>
        <AnimatedSection>
          <div className="mt-12">
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-white via-[#fefefe] to-white rounded-3xl shadow-2xl border-2 border-[#D4AF37]/30 p-4 md:p-6 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D4AF37] via-[#C9A961] to-[#D4AF37]"></div>
              <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 left-4 w-32 h-32 bg-gradient-to-tr from-[#C9A961]/10 to-transparent rounded-full blur-2xl"></div>
              
              {/* Header */}
              <div className="relative z-10 py-3 md:py-4 flex flex-col items-center justify-center border-b-2 border-[#D4AF37]/20 mb-3 md:mb-4">
                <div className="mb-2 flex items-center gap-2 md:gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-[#D4AF37] animate-pulse-slow" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                  <p className="font-dancing text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] via-[#C9A961] to-[#8d6e63] tracking-wide uppercase">
                    Tháng 11
                  </p>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-[#D4AF37] animate-pulse-slow" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                </div>
                <p className="font-numbers text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] to-[#C9A961] font-semibold">
                  2025
                </p>
              </div>
              
              {/* Weekdays Header */}
              <div className="relative z-10 grid grid-cols-7 gap-1 md:gap-1.5 mb-2 md:mb-3 px-1 md:px-2">
                {weekdays.map((day, index) => (
                  <div 
                    key={day} 
                    className="text-center font-bold text-gray-500 text-sm md:text-base py-1.5 md:py-2 uppercase tracking-wider"
                  >
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Grid */}
              <div className="relative z-10 grid grid-cols-7 gap-1 md:gap-1.5 p-1.5 md:p-2 bg-gradient-to-br from-gray-50/50 to-white/50 rounded-2xl">
                {calendarDays}
              </div>
              
              {/* Footer Legend */}
              <div className="relative z-10 py-2 md:py-3 mt-3 md:mt-4 border-t-2 border-[#D4AF37]/20">
                <div className="flex items-center justify-center gap-2 md:gap-3 bg-gradient-to-r from-[#D4AF37]/10 via-[#C9A961]/10 to-[#D4AF37]/10 rounded-full py-2 md:py-2.5 px-4 md:px-6 border border-[#D4AF37]/20">
                  <img 
                    src="/images/ring.png" 
                    alt="Nhẫn cưới" 
                    className="w-6 h-6 md:w-7 md:h-7 object-contain animate-pulse-slow flex-shrink-0"
                    loading="lazy"
                  />
                  <span className="font-cormorant text-gray-700 text-sm md:text-base font-semibold">Ngày Trọng Đại</span>
                  <img 
                    src="/images/ring.png" 
                    alt="Nhẫn cưới" 
                    className="w-6 h-6 md:w-7 md:h-7 object-contain animate-pulse-slow flex-shrink-0"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
      <style>{`
        @keyframes pulse-glow {
          0% {
            box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(212, 175, 55, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default SaveTheDateSection;