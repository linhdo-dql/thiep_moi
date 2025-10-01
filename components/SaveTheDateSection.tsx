import React from 'react';
import AnimatedSection from './AnimatedSection';
import Divider from './Divider';

const SaveTheDateSection: React.FC = () => {
  // --- Dữ liệu cho lịch tháng 11 năm 2025 ---
  const year = 2025;
  const month = 10; // Tháng trong JavaScript bắt đầu từ 0 (0=Tháng 1, 10=Tháng 11)
  const daysInMonth = 30;
  // Lấy ngày đầu tiên của tháng (0=Chủ Nhật, 6=Thứ Bảy). Ngày 1/11/2025 là Thứ Bảy.
  const firstDayOfMonth = new Date(year, month, 1).getDay(); 
  
  const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const specialDays = [12, 13];

  const calendarDays = [];

  // Thêm các ô trống cho những ngày trước ngày 1 của tháng
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="aspect-square"></div>);
  }

  // Thêm các ngày trong tháng vào lịch
  for (let day = 1; day <= daysInMonth; day++) {
    const isSpecial = specialDays.includes(day);
    calendarDays.push(
      <div 
        key={day} 
        className={`aspect-square flex items-center justify-center text-xl relative font-cormorant`}
      >
        <span className={`
          flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300
          ${isSpecial 
            ? 'bg-[#a1887f] text-white font-bold animate-pulse-glow' 
            : 'text-gray-600 hover:bg-gray-100'
          }
        `}>
          {day}
        </span>
      </div>
    );
  }
  
  return (
    <section id="save-the-date" className="py-20 px-6 bg-[#fdfaf6]">
      <div className="max-w-xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="font-dancing text-5xl text-[#a1887f] mb-4">Lịch Tháng Yêu Thương</h2>
           <p className="font-cormorant text-xl text-gray-600 mb-4">
            Đánh dấu vào lịch những ngày quan trọng nhất trong hành trình của chúng tôi.
          </p>
          <Divider />
        </AnimatedSection>
        <AnimatedSection>
          <div className="mt-8">
            <div className="max-w-md mx-auto bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="bg-[#a1887f] text-white py-5">
                <p className="font-cormorant text-4xl font-bold tracking-widest uppercase">Tháng 11 Năm 2025</p>
              </div>
              <div className="grid grid-cols-7 gap-2 p-4">
                {weekdays.map(day => (
                  <div key={day} className="text-center font-bold text-gray-500 text-base py-2">{day}</div>
                ))}
                {calendarDays}
              </div>
               <div className="bg-gray-50 py-4 px-6">
                  <div className="flex items-center justify-center gap-4">
                      <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-[#a1887f] block shadow-inner"></span>
                          <span className="font-cormorant text-gray-700">Ngày Trọng Đại</span>
                      </div>
                  </div>
               </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
      <style>{`
        @keyframes pulse-glow {
          0% {
            box-shadow: 0 0 0 0 rgba(161, 136, 127, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(161, 136, 127, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(161, 136, 127, 0);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default SaveTheDateSection;