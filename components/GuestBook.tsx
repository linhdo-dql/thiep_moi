import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';
import Divider from './Divider';
import { db } from '../firebaseConfig';
import { ref, onValue, query, orderByChild } from 'firebase/database';
import * as XLSX from 'xlsx';

interface GuestMessage {
    name: string;
    message: string;
    attendance: 'attending' | 'not_attending';
    date: string;
}

interface WishData {
    name: string;
    message: string;
    attendance: 'attending' | 'not_attending';
    createdAt: number;
}

const GuestBook: React.FC = () => {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const wishesRef = ref(db, 'wishes');
    const wishesQuery = query(wishesRef, orderByChild('createdAt'));

    const unsubscribe = onValue(wishesQuery, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const fetchedMessages: GuestMessage[] = Object.keys(data).map(key => {
                const wish: WishData = data[key];
                return {
                    name: wish.name,
                    message: wish.message,
                    attendance: wish.attendance,
                    date: new Date(wish.createdAt).toISOString(),
                };
            });
            // Sắp xếp theo thứ tự mới nhất trước tiên
            setMessages(fetchedMessages.reverse());
        } else {
            setMessages([]);
        }
        setIsLoading(false);
    }, (error) => {
        console.error("Error fetching messages:", error);
        setIsLoading(false);
    });
    
    window.scrollTo(0, 0);

    // Dọn dẹp listener khi component unmount
    return () => unsubscribe();
  }, []);

  const downloadAsExcel = () => {
    if (messages.length === 0) return;

    const formattedMessages = messages.map(msg => ({
      "Tên Khách": msg.name,
      "Lời Chúc": msg.message,
      "Tình Trạng Tham Dự": msg.attendance === 'attending' ? 'Tham dự' : 'Không tham dự',
      "Thời Gian Gửi": new Date(msg.date).toLocaleString('vi-VN')
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedMessages);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Lời Chúc");
    XLSX.writeFile(workbook, "loi_chuc.xlsx");
  };

  return (
    <div className="py-20 px-6 bg-[#fdfaf6] min-h-screen">
      <div className="max-w-3xl mx-auto text-center">
        <AnimatedSection>
            <h1 className="font-dancing text-6xl text-[#a1887f]">Sổ Lưu Bút</h1>
            <p className="mt-4 text-lg">Những lời chúc phúc từ những người thân yêu.</p>
            <Divider />
        </AnimatedSection>
        
        <div className="space-y-6">
            {isLoading ? (
                <p>Đang tải lời chúc...</p>
            ) : messages.length > 0 ? (
                messages.map((msg, index) => (
                    <AnimatedSection key={index}>
                        <div className="bg-white p-6 rounded-lg shadow-md text-left border-l-4 border-[#a1887f]">
                            <p className="font-cormorant text-xl italic text-gray-700">"{msg.message}"</p>
                            <p className="text-right mt-4 font-bold text-md text-[#8d6e63]">- {msg.name}</p>
                            <p className="text-right text-xs text-gray-400 mt-1">
                                {new Date(msg.date).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </AnimatedSection>
                ))
            ) : (
                <p>Chưa có lời chúc nào được gửi.</p>
            )}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="w-full sm:w-auto bg-[#8d6e63] text-white font-bold py-3 px-8 rounded-full hover:bg-[#a1887f] transition-colors duration-300 shadow-lg">
                Trở Về Thiệp Mời
            </Link>
            {!isLoading && messages.length > 0 && (
              <button 
                onClick={downloadAsExcel}
                className="w-full sm:w-auto bg-white text-[#8d6e63] font-bold py-3 px-8 rounded-full border-2 border-[#8d6e63] hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                aria-label="Tải xuống lời chúc dưới dạng file Excel"
              >
                Tải File Excel
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default GuestBook;