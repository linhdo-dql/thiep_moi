import React from 'react';
import AnimatedSection from './AnimatedSection';
import Divider from './Divider';

const MapSection: React.FC = () => {
  return (
    <section id="gift" className="py-20 px-6 bg-white text-center">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <h2 className="font-dancing text-5xl text-[#a1887f]">Quà Mừng Cưới</h2>
          <Divider />
          <p className="font-cormorant text-lg text-gray-600 mb-8">
            Sự hiện diện của bạn trong ngày chung đôi là món quà vô giá đối với chúng tôi. Nếu bạn có lòng gửi tặng quà mừng, bạn có thể sử dụng thông tin bên dưới. Xin chân thành cảm ơn!
          </p>
        </AnimatedSection>
        
        <AnimatedSection>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8">
            <div className="flex-shrink-0">
                <img 
                    src="https://api.vietqr.io/image/mbbank-0326838898-print.png" 
                    alt="QR Code Mừng Cưới"
                    className="mx-auto rounded-lg shadow-lg border-4 border-white w-48 h-48 object-contain"
                />
            </div>

            <div className="text-left bg-gray-50 p-6 rounded-lg border w-full md:max-w-sm">
                <p className="mb-2"><strong className="text-gray-700 w-32 inline-block">Ngân hàng:</strong> <span className="text-[#8d6e63]">MB Bank</span></p>
                <p className="mb-2"><strong className="text-gray-700 w-32 inline-block">Số tài khoản:</strong> <span className="text-[#8d6e63]">0326838898</span></p>
                <p><strong className="text-gray-700 w-32 inline-block">Chủ tài khoản:</strong> <span className="text-[#8d6e63]">QUANG LINH</span></p>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
};

export default MapSection;