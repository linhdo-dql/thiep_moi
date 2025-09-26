import React from 'react';
import AnimatedSection from './AnimatedSection';
import Divider from './Divider';

const MapSection: React.FC = () => {
  return (
    <section id="map" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="font-dancing text-5xl text-[#a1887f]">Bản Đồ Chỉ Dẫn</h2>
          <Divider />
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

export default MapSection;
