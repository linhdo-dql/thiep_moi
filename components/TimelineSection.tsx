import React from 'react';
import AnimatedSection from './AnimatedSection';
import Divider from './Divider';

const schedule = [
  { time: '09:00', title: 'Đón Khách & Khai Tiệc', description: 'Gia đình trân trọng đón tiếp quý khách và bắt đầu tiệc mừng buổi sáng.' },
  { time: '11:30', title: 'Kết Thúc Tiệc Sáng', description: 'Gia đình gửi lời cảm ơn chân thành tới các vị khách đã tham dự.' },
  { time: '16:30', title: 'Đón Khách Lễ Thành Hôn', description: 'Chào đón quý khách cho nghi lễ chính thức và trang trọng nhất.' },
  { time: '17:00', title: 'Nghi Lễ Thành Hôn', description: 'Khoảnh khắc cô dâu và chú rể trao lời thề nguyện và chính thức nên duyên vợ chồng.' },
  { time: '18:00', title: 'Dự Tiệc Tối & Giao Lưu', description: 'Kính mời quý khách cùng dùng bữa tối thân mật và chia vui cùng gia đình.' },
  { time: '20:00', title: 'Kết Thúc', description: 'Gia đình xin chân thành cảm ơn sự hiện diện của quý khách trong ngày vui.' },
];

const TimelineItem: React.FC<{ time: string; title: string; description: string; isLast?: boolean }> = ({ time, title, description, isLast = false }) => {
  return (
    <div className="relative pl-12">
      {!isLast && <div className="absolute left-[18px] top-5 h-full w-px bg-gray-300"></div>}
      <div className="absolute left-0 top-2 flex items-center justify-center">
        <div className="h-9 w-9 rounded-full bg-[#a1887f] border-4 border-white flex items-center justify-center shadow-md">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <div className="text-left pb-12">
        <p className="font-bold text-lg text-[#8d6e63]">{time}</p>
        <h3 className="text-2xl font-dancing text-gray-800 mt-1">{title}</h3>
        <p className="text-gray-600 font-cormorant mt-2">{description}</p>
      </div>
    </div>
  );
};

const TimelineSection: React.FC = () => {
  return (
    <section id="timeline" className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
            <AnimatedSection>
              <h2 className="font-dancing text-5xl text-[#a1887f]">Lịch Trình Sự Kiện</h2>
              <p className="font-cormorant text-lg text-gray-600 mt-4">Thứ Năm, Ngày 13 tháng 11 năm 2025</p>
            </AnimatedSection>
            <Divider />
        </div>
        
        <div className="mt-12">
            {schedule.map((item, index) => (
                <AnimatedSection key={index}>
                    <TimelineItem 
                        time={item.time} 
                        title={item.title} 
                        description={item.description}
                        isLast={index === schedule.length - 1}
                    />
                </AnimatedSection>
            ))}
        </div>

      </div>
    </section>
  );
};

export default TimelineSection;