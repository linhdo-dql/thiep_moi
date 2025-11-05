import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';
import Divider from './Divider';
import GiftModal from './GiftModal';
import { db } from '../firebaseConfig';
import { ref, push, serverTimestamp } from 'firebase/database';

const RSVPSection: React.FC = () => {
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
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'attending' | 'not_attending' | ''>('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !attendance) {
      setError('Nhập tên và chọn trạng thái tham dự.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      // Lấy thông tin thiết bị (User Agent)
      const deviceInfo = navigator.userAgent;
      
      let ipAddress = 'unknown';
      let location = 'unknown';

      try {
        // 1. Lấy địa chỉ IP
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        if (ipResponse.ok) {
            const ipData = await ipResponse.json();
            ipAddress = ipData.ip;

            // 2. Dùng IP để lấy thông tin vị trí địa lý
            const geoResponse = await fetch(`http://ip-api.com/json/${ipAddress}`);
            if (geoResponse.ok) {
                const geoData = await geoResponse.json();
                if (geoData.status === 'success') {
                    location = `${geoData.city}, ${geoData.country}`;
                }
            }
        }
      } catch (infoError) {
        console.warn("Could not fetch IP/Geo information:", infoError);
      }

      const wishesRef = ref(db, 'wishes');
      await push(wishesRef, {
        name: name.trim(),
        attendance,
        message: message.trim(),
        createdAt: serverTimestamp(),
        ipAddress: ipAddress,
        deviceInfo: deviceInfo, // Lưu thông tin thiết bị
        location: location,     // Lưu vị trí
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting RSVP:", err);
      setError('Đã có lỗi xảy ra. Thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="rsvp" className="py-12 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-dancing text-5xl text-[#a1887f]" style={{ padding: '20px' }}>Xác Nhận Tham Dự</h2>
            <Divider />
            <p className="font-cormorant text-lg text-gray-600 mb-8">
              Sự hiện diện của {guestRoleDisplay} là niềm vinh hạnh của {addressing}. Gửi lời chúc và xác nhận tham dự trước ngày 01.11.2025.
            </p>
          </AnimatedSection>
          
          <AnimatedSection>
            {isSubmitted ? (
              attendance === 'attending' ? (
                 <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg text-left shadow-md">
                    <h3 className="font-bold text-xl text-green-800">Cảm ơn {guestRoleDisplay} đã xác nhận!</h3>
                    <p className="text-green-700 mt-2">{addressing.charAt(0).toUpperCase() + addressing.slice(1)} rất vui khi có {guestRoleDisplay} chung vui. Hẹn gặp {guestRoleDisplay} tại buổi lễ!</p>
                </div>
              ) : (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg text-left shadow-md">
                    <h3 className="font-bold text-xl text-blue-800">Thật tiếc khi {guestRoleDisplay} không thể tham dự</h3>
                    <p className="text-blue-700 mt-2">Cảm ơn {guestRoleDisplay} đã gửi lời chúc. Dù không thể có mặt, những lời chúc của {guestRoleDisplay} vẫn là nguồn động viên to lớn đối với {addressing}. Trân trọng!</p>
                </div>
              )
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div>
                  <label htmlFor="name" className="block text-md font-medium text-gray-700 mb-2">Họ và Tên</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#a1887f] focus:border-[#a1887f] transition"
                    placeholder={`Tên của ${guestRoleDisplay}`}
                    required
                  />
                </div>
                
                <div>
                  <span className="block text-md font-medium text-gray-700 mb-2">{guestRoleDisplay} sẽ tham dự chứ?</span>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="attendance"
                        value="attending"
                        checked={attendance === 'attending'}
                        onChange={() => setAttendance('attending')}
                        className="h-5 w-5 text-[#8d6e63] focus:ring-[#a1887f]"
                      />
                      <span className="text-gray-700">Chắc chắn rồi!</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="attendance"
                        value="not_attending"
                        checked={attendance === 'not_attending'}
                        onChange={() => setAttendance('not_attending')}
                        className="h-5 w-5 text-[#8d6e63] focus:ring-[#a1887f]"
                      />
                      <span className="text-gray-700">Tiếc quá, mình không thể</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-md font-medium text-gray-700 mb-2">Lời Chúc</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#a1887f] focus:border-[#a1887f] transition"
                    placeholder="Gửi lời chúc tới cặp đôi..."
                  ></textarea>
                </div>
                
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#8d6e63] text-white font-bold py-3 px-12 rounded-full hover:bg-[#a1887f] transition-colors duration-300 shadow-lg disabled:bg-gray-400"
                  >
                    {isSubmitting ? 'Đang Gửi...' : 'Gửi Lời Chúc'}
                  </button>
                </div>
              </form>
            )}
          </AnimatedSection>

          <AnimatedSection>
            <div className="mt-16">
                <p className="font-cormorant text-lg text-gray-600 mb-4">Hoặc {guestRoleDisplay} có thể gửi quà mừng cưới tại đây:</p>
                <button 
                  onClick={() => setIsGiftModalOpen(true)}
                  className="bg-transparent text-[#8d6e63] font-bold py-3 px-8 rounded-full border-2 border-[#8d6e63] hover:bg-[#fdfaf6] transition-colors duration-300"
                >
                    Mừng Cưới Online
                </button>
            </div>
          </AnimatedSection>
        </div>
      </section>
      <GiftModal isOpen={isGiftModalOpen} onClose={() => setIsGiftModalOpen(false)} />
    </>
  );
};

export default RSVPSection;