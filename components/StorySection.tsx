import React from 'react';
import AnimatedSection from './AnimatedSection';
import Divider from './Divider';

const StorySection: React.FC = () => {
  return (
    <section id="story" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
            <AnimatedSection>
                <h2 className="font-dancing text-5xl text-[#a1887f]">Chuyện Tình Yêu</h2>
            </AnimatedSection>
            <Divider />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <AnimatedSection>
                <img 
                    src="https://picsum.photos/id/10/800/1000" 
                    alt="Our story" 
                    className="rounded-lg shadow-xl w-full h-auto object-cover"
                />
            </AnimatedSection>
          </div>
          <div className="md:w-1/2 space-y-8">
            <AnimatedSection>
                <div>
                    <h3 className="font-dancing text-3xl text-[#8d6e63] mb-2">Ngày Gặp Gỡ</h3>
                    <p className="leading-relaxed">
                    Chúng tôi tình cờ gặp nhau vào một chiều thu Hà Nội, trong một quán cà phê nhỏ ven hồ. Ánh mắt chạm nhau, và từ đó, một câu chuyện tình yêu đẹp đẽ đã bắt đầu.
                    </p>
                </div>
            </AnimatedSection>
             <AnimatedSection>
                <div>
                    <h3 className="font-dancing text-3xl text-[#8d6e63] mb-2">Lời Cầu Hôn</h3>
                    <p className="leading-relaxed">
                    Dưới bầu trời đầy sao của Đà Lạt, Minh đã ngỏ lời. Khoảnh khắc ấy, Anh biết rằng mình đã tìm thấy bến đỗ bình yên của cuộc đời.
                    </p>
                </div>
            </AnimatedSection>
             <AnimatedSection>
                <div>
                    <h3 className="font-dancing text-3xl text-[#8d6e63] mb-2">Và... Đám Cưới</h3>
                    <p className="leading-relaxed">
                    Hành trình của chúng tôi sắp bước sang một trang mới. Chúng tôi vô cùng hạnh phúc khi được chia sẻ ngày trọng đại này cùng gia đình và bạn bè thân yêu.
                    </p>
                </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
