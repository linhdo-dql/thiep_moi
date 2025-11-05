import React from 'react';
import { useSearchParams } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';
import Divider from './Divider';

const ContactSection: React.FC = () => {
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
    <section id="contact" className="py-12 px-6 bg-[#fdfaf6]">
      <div className="max-w-6xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="font-dancing text-5xl text-[#a1887f]" style={{ padding: '20px' }}>Liên Hệ & Chỉ Dẫn</h2>
          <Divider />
          <p className="text-lg mb-12">
            Nếu {guestRoleDisplay} có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với {addressing}.
          </p>
        </AnimatedSection>
        <AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8 text-center mb-16">
            {/* Groom Contact */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-4 text-[#8d6e63]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <h3 className="text-xl font-semibold mb-1">Chú Rể - Quang Linh</h3>
              <a href="tel:+84326838898" className="text-[#8d6e63] hover:underline">0326 838 898</a>
            </div>
            
            {/* Bride Contact */}
            <div className="p-6 bg-white rounded-lg shadow-md">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-4 text-[#8d6e63]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <h3 className="text-xl font-semibold mb-1">Cô Dâu - Thanh Loan</h3>
              <a href="tel:+84869992842" className="text-[#8d6e63] hover:underline">0869 992 842</a>
            </div>

            {/* Email Contact */}
             <div className="p-6 bg-white rounded-lg shadow-md">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-4 text-[#8d6e63]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold mb-1">Email Hỗ Trợ</h3>
              <a href="mailto:damcuoi@example.com" className="text-[#8d6e63] hover:underline">damcuoi@example.com</a>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Groom's House Map */}
            <div>
              <h3 className="font-dancing text-4xl text-[#8d6e63] mb-6">Nhà Trai</h3>
              <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.399654259753!2d105.9369785760013!3d21.176276982694198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313507000d01da99%3A0x67a013023f5af554!2zTmjDoCBNw6w!5e0!3m2!1svi!2s!4v1758882854996!5m2!1svi!2s"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bản đồ nhà trai"
                ></iframe>
              </div>
            </div>
            
            {/* Bride's House Map */}
            <div>
              <h3 className="font-dancing text-4xl text-[#8d6e63] mb-6">Nhà Gái</h3>
              <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d930.1687504829418!2d105.95572927568317!3d21.16532824628131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDA5JzU1LjIiTiAxMDXCsDU3JzI1LjAiRQ!5e0!3m2!1svi!2s!4v1758883060828!5m2!1svi!2s"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bản đồ nhà gái"
                ></iframe>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactSection;