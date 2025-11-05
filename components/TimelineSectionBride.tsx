import React from 'react';
import AnimatedSection from './AnimatedSection';
import Divider from './Divider';

const TimelineSectionBride: React.FC = () => {
  // Timeline cho nhà gái - chia thành 2 ngày
  const scheduleDay1 = [
    { time: '17:00', title: 'Đón Khách & Khai Tiệc', description: 'Gia đình trân trọng đón tiếp Quý vị và bắt đầu tiệc mừng buổi chiều.' },
    { time: '20:00', title: 'Kết Thúc Tiệc & Giao lưu văn nghệ', description: 'Gia đình gửi lời cảm ơn chân thành tới các vị khách đã tham dự.' },
  ];

  const scheduleDay2 = [
    { time: '7:30', title: 'Đón Khách Lễ Thành Hôn', description: 'Chào đón Quý vị cho nghi lễ chính thức và trang trọng nhất.' },
    { time: '8:00', title: 'Nghi Lễ Thành Hôn', description: 'Khoảnh khắc cô dâu và chú rể trao lời thề nguyện và chính thức nên duyên vợ chồng.' },
    { time: '10:00', title: 'Dự Tiệc & Giao lưu văn nghệ', description: 'Kính mời Quý vị cùng dùng bữa cơm thân mật và chia vui cùng gia đình.' },
    { time: '12:00', title: 'Kết Thúc', description: 'Gia đình xin chân thành cảm ơn sự hiện diện của Quý vị trong ngày vui.' },
  ];

const TimelineItem: React.FC<{ time: string; title: string; description: string; isLast?: boolean; isLeft?: boolean }> = ({ time, title, description, isLast = false, isLeft = true }) => {
  return (
    <div className="relative flex items-center mb-8 md:mb-12">
      {/* Timeline line - chỉ hiện trên desktop */}
      {!isLast && (
        <div className="hidden md:block absolute left-1/2 top-12 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#D4AF37] via-[#C9A961] to-transparent"></div>
      )}
      
      {/* Timeline dot - ở giữa */}
      <div className="absolute left-1/2 -translate-x-1/2 top-2 z-10 flex items-center justify-center">
        <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C9A961] border-4 border-white flex items-center justify-center shadow-xl">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {/* Content card - xen kẽ trái/phải trên desktop, luôn căn trái trên mobile */}
      <div className={`w-full md:w-[45%] pb-8 md:pb-0 ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto md:text-left'} ${!isLeft ? 'md:order-2' : 'md:order-1'}`}>
        <div className="bg-gradient-to-br from-white to-[#fefefe] rounded-xl p-5 md:p-6 shadow-xl border border-[#D4AF37]/20 hover:shadow-2xl transition-all duration-300">
          <p className={`font-bold text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] to-[#C9A961] mb-2 font-numbers ${isLeft ? 'md:text-right' : 'md:text-left'}`}>{time}</p>
          <h3 className={`text-2xl md:text-3xl font-dancing text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] to-[#C9A961] mt-1 mb-3 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>{title}</h3>
          <p className={`text-gray-700 font-cormorant text-base md:text-lg mt-2 leading-relaxed ${isLeft ? 'md:text-right' : 'md:text-left'}`}>{description}</p>
        </div>
      </div>
      
      {/* Empty space cho side còn lại trên desktop */}
      <div className={`hidden md:block w-[45%] ${isLeft ? 'md:order-2' : 'md:order-1'}`}></div>
    </div>
  );
};

  return (
    <section id="timeline" className="py-16 px-6 bg-gradient-to-b from-white via-[#fdfaf6] to-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
            <AnimatedSection>
              <div className="mb-8">
                <h2 className="font-dancing text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] via-[#C9A961] to-[#8d6e63] mb-4" style={{ padding: '20px' }}>Lịch Trình Sự Kiện</h2>
              </div>
            </AnimatedSection>
            <Divider />
        </div>
        
        {/* Ngày 12/11 */}
        <div className="mt-12 md:mt-16">
          <AnimatedSection>
            <div className="text-center mb-8 px-4 md:px-6 py-6 md:py-8">
              <h3 className="font-dancing text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] to-[#C9A961] mb-2" style={{ padding: '20px' }}>
                Ngày 12/11/2025
              </h3>
              <p className="font-cormorant text-lg md:text-xl text-gray-600">Thứ Tư</p>
            </div>
          </AnimatedSection>
          {scheduleDay1.map((item, index) => (
            <AnimatedSection key={`day1-${index}`}>
              <TimelineItem 
                time={item.time}
                title={item.title} 
                description={item.description}
                isLast={index === scheduleDay1.length - 1}
                isLeft={index % 2 === 0}
              />
            </AnimatedSection>
          ))}
        </div>

        {/* Ngày 13/11 */}
        <div className="mt-16 md:mt-20">
          <AnimatedSection>
            <div className="text-center mb-8 px-4 md:px-6 py-6 md:py-8">
              <h3 className="font-dancing text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] to-[#C9A961] mb-2" style={{ padding: '20px' }}>
                Ngày 13/11/2025
              </h3>
              <p className="font-cormorant text-lg md:text-xl text-gray-600">Thứ Năm</p>
            </div>
          </AnimatedSection>
          {scheduleDay2.map((item, index) => (
            <AnimatedSection key={`day2-${index}`}>
              <TimelineItem 
                time={item.time}
                title={item.title} 
                description={item.description}
                isLast={index === scheduleDay2.length - 1}
                isLeft={index % 2 === 0}
              />
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TimelineSectionBride;

