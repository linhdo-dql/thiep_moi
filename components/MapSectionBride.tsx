import React from 'react';
import { useSearchParams } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';
import Divider from './Divider';

const MapSectionBride: React.FC = () => {
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

  return (
    <section id="gift" className="py-12 px-6 bg-white text-center">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <h2 className="font-dancing text-5xl text-[#a1887f]" style={{ padding: '20px' }}>Quà Mừng Cưới</h2>
          <Divider />
          <p className="font-cormorant text-lg text-gray-600 mb-8">
            Sự hiện diện của {guestRoleDisplay} trong ngày chung đôi là món quà vô giá đối với {addressing}. Nếu {guestRoleDisplay} có lòng gửi tặng quà mừng, {guestRoleDisplay} có thể sử dụng thông tin bên dưới. Xin chân thành cảm ơn!
          </p>
        </AnimatedSection>
        
        <AnimatedSection>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8">
            <div className="flex-shrink-0">
                <img 
                    src="https://api.vietqr.io/image/bidv-43310000565319-print.png" 
                    alt="QR Code Mừng Cưới"
                    className="mx-auto rounded-lg shadow-lg border-4 border-white w-48 h-48 object-contain"
                />
            </div>

            <div className="text-left bg-gray-50 p-6 rounded-lg border w-full md:max-w-sm">
                <p className="mb-2"><strong className="text-gray-700 w-32 inline-block">Ngân hàng:</strong> <span className="text-[#8d6e63]">BIDV</span></p>
                <p className="mb-2"><strong className="text-gray-700 w-32 inline-block">Số tài khoản:</strong> <span className="text-[#8d6e63]">43310000565319</span></p>
                <p><strong className="text-gray-700 w-32 inline-block">Chủ tài khoản:</strong> <span className="text-[#8d6e63]">NGUYEN THANH LOAN</span></p>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
};

export default MapSectionBride;




