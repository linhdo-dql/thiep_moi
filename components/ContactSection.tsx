import React from 'react';
import AnimatedSection from './AnimatedSection';
import Divider from './Divider';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 px-6 bg-[#fdfaf6]">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="font-dancing text-5xl text-[#a1887f]">Liên Hệ</h2>
          <Divider />
          <p className="text-lg mb-12">
            Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi.
          </p>
        </AnimatedSection>
        <AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {/* Groom Contact */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-4 text-[#8d6e63]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <h3 className="text-xl font-semibold mb-1">Chú Rể - Quang Minh</h3>
              <a href="tel:+84123456789" className="text-[#8d6e63] hover:underline">0123 456 789</a>
            </div>
            
            {/* Bride Contact */}
            <div className="p-6 bg-white rounded-lg shadow-md">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-4 text-[#8d6e63]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <h3 className="text-xl font-semibold mb-1">Cô Dâu - Thuỳ Anh</h3>
              <a href="tel:+84987654321" className="text-[#8d6e63] hover:underline">0987 654 321</a>
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
      </div>
    </section>
  );
};

export default ContactSection;