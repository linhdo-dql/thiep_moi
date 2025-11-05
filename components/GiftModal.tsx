import React from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GiftModal: React.FC<GiftModalProps> = ({ isOpen, onClose }) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const guestRole = searchParams.get('role') || '';
  const isBrideRoute = location.pathname === '/bride' || window.location.hash.includes('/bride');

  // Hàm lấy vai vế hiển thị cho người được mời
  const getGuestRoleDisplay = (role: string): string => {
    if (!role) return 'Quý vị';
    return role;
  };

  const guestRoleDisplay = getGuestRoleDisplay(guestRole);

  // Xác định thông tin ngân hàng dựa trên route
  const bankInfo = isBrideRoute ? {
    qrUrl: 'https://api.vietqr.io/image/bidv-43310000565319-print.png',
    bankName: 'BIDV',
    accountNumber: '43310000565319',
    accountHolder: 'NGUYEN THANH LOAN'
  } : {
    qrUrl: 'https://api.vietqr.io/image/vietcombank-0301000384961-print.png',
    bankName: 'Vietcombank',
    accountNumber: '0301000384961',
    accountHolder: 'DO QUANG LINH'
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-lg shadow-2xl p-6 max-w-lg w-full text-center relative transform transition-all duration-300 scale-95 animate-modal-pop"
        style={{ animation: 'modal-pop 0.3s ease-out forwards' }}
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          aria-label="Đóng"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h3 className="font-dancing text-4xl text-[#a1887f] mb-4">Mừng Cưới Online</h3>
        <p className="font-cormorant text-lg text-gray-600 mb-6">
            Món quà lớn nhất là sự hiện diện của {guestRoleDisplay}. Nếu {guestRoleDisplay} có nhã ý gửi tặng quà mừng, {guestRoleDisplay} có thể sử dụng thông tin bên dưới.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex-shrink-0">
                <img 
                    src={bankInfo.qrUrl}
                    alt="QR Code Mừng Cưới"
                    className="mx-auto rounded-md shadow-md w-40 h-40 object-contain"
                />
            </div>

            <div className="text-left bg-gray-50 p-4 rounded-lg border w-full flex-grow">
                <p className="mb-2"><strong className="text-gray-700">Ngân hàng:</strong> <span className="text-[#8d6e63]">{bankInfo.bankName}</span></p>
                <p className="mb-2"><strong className="text-gray-700">Số tài khoản:</strong> <span className="text-[#8d6e63]">{bankInfo.accountNumber}</span></p>
                <p><strong className="text-gray-700">Chủ tài khoản:</strong> <span className="text-[#8d6e63]">{bankInfo.accountHolder}</span></p>
            </div>
        </div>

        <button
            onClick={onClose}
            className="mt-8 bg-[#8d6e63] text-white font-bold py-2 px-6 rounded-full hover:bg-[#a1887f] transition-colors duration-300"
          >
            Đóng
        </button>
      </div>
      <style>{`
        @keyframes modal-pop {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-modal-pop {
          animation: modal-pop 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default GiftModal;