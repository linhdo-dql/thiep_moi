import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';
import Divider from './Divider';

const StorySection: React.FC = () => {
  const [searchParams] = useSearchParams();
  const guestRole = searchParams.get('role') || '';
  const isParent = searchParams.get('parent') === 'true';

  // Hàm xác định cách xưng hô dựa trên vai vế
  const getAddressing = (role: string, parent: boolean): string => {
    // Nếu là phụ huynh, sử dụng "chúng cháu"
    if (parent) {
      return 'chúng cháu';
    }
    
    // Nếu không phải phụ huynh, sử dụng vai vế phù hợp
    switch (role) {
      case 'Anh':
      case 'Chị':
        return 'chúng em';
      case 'Cô':
      case 'Chú':
      case 'Bác':
      case 'Dì':
        return 'chúng cháu';
      case 'Ông':
      case 'Bà':
        return 'chúng con';
      case 'Em':
        return 'anh chị';
      default:
        return 'chúng tôi';
    }
  };

  const addressing = getAddressing(guestRole, isParent);
  return (
    <section id="story" className="py-16 px-4 md:px-6 bg-gradient-to-b from-white via-[#fdfaf6] to-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
            <AnimatedSection>
                <div className="mb-8">
                  <h2 className="font-dancing text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] via-[#C9A961] to-[#8d6e63] mb-6 px-2" style={{ padding: '20px' }}>Chuyện Tình Yêu</h2>
                </div>
            </AnimatedSection>
            <Divider />
        </div>

        <div className="space-y-12 md:space-y-16 mt-8 md:mt-12">
          {/* Ảnh 1 - Text 1: Ngày Gặp Gỡ */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2 w-full px-2 md:px-0">
              <AnimatedSection>
                <img 
                  src="/images/1.JPG" 
                  alt="Ngày gặp gỡ" 
                  className="rounded-lg shadow-xl w-full h-auto object-cover"
                />
              </AnimatedSection>
            </div>
            <div className="md:w-1/2 w-full px-2 md:px-0">
              <AnimatedSection>
                <div className="bg-gradient-to-br from-white to-[#fefefe] rounded-2xl p-6 md:p-8 shadow-xl border border-[#D4AF37]/20">
                  <h3 className="font-dancing text-2xl md:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] to-[#C9A961] mb-4 break-words">Ngày Gặp Gỡ</h3>
                  <p className="leading-relaxed text-gray-700 font-cormorant text-base md:text-lg break-words">
                    Trời thu nắng vàng, chàng gặp nàng qua một lời giới thiệu. Hai con người chưa biết nhiều về nhau nhưng tưởng như đã thân quen. Có thể họ đã gặp nhau nhiều từ trước đó, nhưng chưa bao giờ thực sự nói chuyện với nhau. Hôm ấy là định mệnh để họ tìm thấy nhau. Hai con người mang hai trái tim ấm áp đã bắt đầu hành trình tình yêu.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Text 2 - Ảnh 2: Chuyện tình yêu */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
            <div className="md:w-1/2 w-full px-2 md:px-0">
              <AnimatedSection>
                <img 
                  src="/images/2.JPG" 
                  alt="Chuyện tình yêu" 
                  className="rounded-lg shadow-xl w-full h-auto object-cover"
                />
              </AnimatedSection>
            </div>
            <div className="md:w-1/2 w-full px-2 md:px-0">
              <AnimatedSection>
                <div className="bg-gradient-to-br from-white to-[#fefefe] rounded-2xl p-6 md:p-8 shadow-xl border border-[#D4AF37]/20">
                  <h3 className="font-dancing text-2xl md:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] to-[#C9A961] mb-4 break-words">Chuyện tình yêu</h3>
                  <p className="leading-relaxed text-gray-700 font-cormorant text-base md:text-lg break-words">
                    {addressing.charAt(0).toUpperCase() + addressing.slice(1)} bắt đầu tìm hiểu về nhau, tìm hiểu về tính cách, về những điều mà mỗi người thích và không thích. Tất nhiên rồi, {addressing} có những quan điểm khác nhau về cuộc sống, có những điều không hợp gu nhau. Nhưng mọi thứ đã bắt đầu từ đó. Những quan điểm khác nhau ấy giúp {addressing} hiểu nhau hơn, những điều không hợp gu ấy, lại càng làm {addressing} thay đổi tích cực để hợp với mảnh ghép còn lại. "Không ai sinh ra đã hợp nhau đâu, chúng ta đến với nhau để vì nhau mà hạnh phúc!". Và, phải có chứ, {addressing} đã có nhiều rất nhiều khoảng thời gian lãng mạn, yêu thương và hạnh phúc bên nhau, những chuyến đi đầy ý nghĩa, "lên rừng, xuống biển", đã có với nhau thật nhiều trải nghiệm thú vị. Những khoảnh khắc ấy, {addressing} đã bắt đầu hiểu rằng, mình đã tìm thấy người mình muốn yêu và sống cùng suốt đời. Trải qua hạnh phúc ngập tràn, niềm vui bên cạnh người đối diện với những khoảng lặng đan xen. {addressing.charAt(0).toUpperCase() + addressing.slice(1)} đã có một tình yêu thật đẹp, đa dạng sắc màu và {addressing} tự hào vì điều đó!
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Ảnh 3 - Text 3: Và... Đám Cưới */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2 w-full px-2 md:px-0">
              <AnimatedSection>
                <img 
                  src="/images/3.JPG" 
                  alt="Đám cưới" 
                  className="rounded-lg shadow-xl w-full h-auto object-cover"
                />
              </AnimatedSection>
            </div>
            <div className="md:w-1/2 w-full px-2 md:px-0">
              <AnimatedSection>
                <div className="bg-gradient-to-br from-white to-[#fefefe] rounded-2xl p-6 md:p-8 shadow-xl border border-[#D4AF37]/20">
                  <h3 className="font-dancing text-2xl md:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] to-[#C9A961] mb-4 break-words">Và... Đám Cưới</h3>
                  <p className="leading-relaxed text-gray-700 font-cormorant text-base md:text-lg break-words">
                    Hành trình đẹp ấy vẫn tiếp tục, ngày hôm nay {addressing} lật một trang mới và tiếp tục viết lên những câu chuyện mới. Được sự cho phép của hai bên gia đình, {addressing} vô cùng hạnh phúc khi được chia sẻ ngày trọng đại này cùng gia đình và bạn bè thân yêu. Cảm ơn ông bà, bố mẹ và các anh chị em trong gia đình đã đồng hành cùng {addressing} trong suốt hạnh trình này. Cảm ơn tất cả những tình yêu thương mà các bạn đã dành cho {addressing}. Trân trọng tất cả mọi người!
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 md:mt-20 px-2 md:px-0">
            <AnimatedSection>
                 <Link to="/guestbook" className="inline-block bg-gradient-to-r from-[#D4AF37] to-[#C9A961] text-white font-semibold py-3 md:py-4 px-6 md:px-10 rounded-full border-2 border-transparent hover:from-[#C9A961] hover:to-[#D4AF37] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 font-cormorant text-base md:text-lg break-words">
                    Xem Sổ Lưu Bút Ký Tên
                </Link>
            </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default StorySection;