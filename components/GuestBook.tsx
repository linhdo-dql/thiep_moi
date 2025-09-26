import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';
import Divider from './Divider';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';

interface GuestMessage {
    name: string;
    message: string;
    attendance: 'attending' | 'not_attending';
    date: string;
}

// Firestore document structure (for type safety)
interface WishDoc {
    name: string;
    message: string;
    attendance: 'attending' | 'not_attending';
    createdAt: Timestamp;
}


const GuestBook: React.FC = () => {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
        setIsLoading(true);
        try {
            const wishesCollection = collection(db, 'wishes');
            const q = query(wishesCollection, orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const fetchedMessages: GuestMessage[] = querySnapshot.docs.map(doc => {
                const data = doc.data() as WishDoc;
                return {
                    name: data.name,
                    message: data.message,
                    attendance: data.attendance,
                    date: data.createdAt.toDate().toISOString(), // Convert Timestamp to ISO string
                };
            });
            setMessages(fetchedMessages);
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    fetchMessages();
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);

  const downloadMessages = () => {
    if (messages.length === 0) return;
    const messagesString = JSON.stringify(messages, null, 2);
    const blob = new Blob([messagesString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'loi-chuc-dam-cuoi.json';
    document.body.appendChild(a); // Required for Firefox
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
                onClick={downloadMessages}
                className="w-full sm:w-auto bg-white text-[#8d6e63] font-bold py-3 px-8 rounded-full border-2 border-[#8d6e63] hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                aria-label="Tải xuống lời chúc"
              >
                Tải Lời Chúc
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default GuestBook;