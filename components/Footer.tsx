import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Footer: React.FC = () => {
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
    <footer 
      className="text-center text-white relative overflow-hidden"
    >
      <img 
        src="https://i.postimg.cc/0NZFy3bc/bghead.jpg" 
        alt="Sảnh cưới lộng lẫy trang trí hoa"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        width="1920"
        height="1280"
      />
      <div className="relative bg-black bg-opacity-50 py-20">
        <h2 className="font-dancing text-5xl mb-4" style={{ padding: '20px' }}>Trân trọng cảm ơn!</h2>
        <p className="font-cormorant text-2xl mb-6">Cảm ơn {guestRoleDisplay} đã là một phần trong câu chuyện của {addressing}.</p>
        <div className="flex items-center justify-center gap-4 font-dancing text-3xl">
          <div className="md:hidden text-center leading-tight">
            <span>Quang</span><br/>
            <span>Linh</span>
          </div>
          <span className="hidden md:inline">Quang Linh</span>
          
          <img 
            src="/images/ring.png" 
            alt="Nhẫn cưới" 
            className="h-8 w-8 object-contain flex-shrink-0"
            loading="lazy"
          />

          <div className="md:hidden text-center leading-tight">
            <span>Thanh</span><br/>
            <span>Loan</span>
          </div>
          <span className="hidden md:inline">Thanh Loan</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;