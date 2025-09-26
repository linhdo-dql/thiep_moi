import React from 'react';
import AnimatedSection from './AnimatedSection';
import Divider from './Divider';

// Added more photos with varying aspect ratios for a better masonry effect
const photos = [
  'https://picsum.photos/id/1015/600/800',
  'https://picsum.photos/id/1016/800/600',
  'https://picsum.photos/id/1018/800/800',
  'https://picsum.photos/id/1019/600/900',
  'https://picsum.photos/id/1025/800/600',
  'https://picsum.photos/id/103/600/800',
  'https://picsum.photos/id/1040/800/600',
  'https://picsum.photos/id/1043/600/800',
  'https://picsum.photos/id/1044/800/800',
];

const GallerySection: React.FC = () => {
  return (
    <section id="gallery" className="py-20 px-6 bg-[#fdfaf6]">
      <div className="max-w-6xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="font-dancing text-5xl text-[#a1887f]">Khoảnh Khắc Đáng Nhớ</h2>
        </AnimatedSection>
        <Divider />
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {photos.map((photo, index) => (
            <AnimatedSection key={index}>
              {/* The inline style prevents an image from splitting across columns */}
              <div 
                className="overflow-hidden rounded-lg shadow-lg group"
                style={{ breakInside: 'avoid' }}
              >
                <img
                  src={photo}
                  alt={`Gallery photo ${index + 1}`}
                  className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
