import React, { useState, useEffect } from 'react';

interface ToastNotificationProps {
  name: string;
  message: string;
  onClose: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ name, message, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const handleClose = () => {
      setIsExiting(true);
      setTimeout(() => {
        onClose();
      }, 500); // Đợi hiệu ứng kết thúc rồi mới gỡ component
    };

    const timer = setTimeout(handleClose, 6500); // Tự động đóng sau 6.5 giây

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const handleManualClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };
  
  // Rút gọn tin nhắn dài
  const truncatedMessage = message.length > 50 ? message.substring(0, 50) + '...' : message;

  return (
    <div 
      className={`fixed bottom-5 left-5 z-[101] max-w-sm w-full bg-white rounded-xl shadow-2xl p-4 border-l-4 border-[#a1887f] transform transition-all duration-500 ease-out
      ${isExiting ? 'opacity-0 -translate-x-full' : 'opacity-100 translate-x-0'}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#8d6e63]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-bold text-gray-800">
            Lời chúc mới từ <span className="text-[#8d6e63]">{name}</span>
          </p>
          <p className="mt-1 text-sm text-gray-600 font-cormorant italic">
            "{truncatedMessage}"
          </p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button onClick={handleManualClose} className="inline-flex text-gray-400 rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a1887f]">
            <span className="sr-only">Đóng</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToastNotification;
