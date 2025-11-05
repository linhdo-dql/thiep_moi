import React, { useRef } from 'react';
import AnimatedSection from './AnimatedSection';
import Divider from './Divider';

// Added more photos with varying aspect ratios for a better masonry effect
interface MediaItem {
  src: string;
  type: 'image' | 'video';
}

interface GallerySectionProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const media: MediaItem[] = [
  { src: '/images/10.JPG', type: 'image' },
  { src: '/images/11.JPG', type: 'image' },
  { src: '/images/3.JPG', type: 'image' },
  { src: '/images/4.JPG', type: 'image' },
  { src: '/images/5.JPG', type: 'image' },
  { src: '/images/6.JPG', type: 'image' },
  { src: '/images/7.JPG', type: 'image' },
  { src: '/images/8.JPG', type: 'image' },
  { src: '/images/9.JPG', type: 'image' },
];

const GallerySection: React.FC<GallerySectionProps> = ({ audioRef, isPlaying, setIsPlaying }) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const checkAndResumeMusic = () => {
    // Check if any video is playing
    const anyVideoPlaying = videoRefs.current.some(video => video && !video.paused && !video.ended);
    
    // If no video is playing, resume background music
    if (!anyVideoPlaying) {
      const audio = audioRef.current;
      if (audio && !isPlaying) {
        audio.play().catch(error => {
          console.error("Failed to resume audio:", error);
        });
        setIsPlaying(true);
      }
    }
  };

  const handleVideoPlay = (currentIndex: number) => {
    // Pause all other videos
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex) {
        video.pause();
      }
    });

    // Pause background music
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoPause = () => {
    checkAndResumeMusic();
  };

  const handleVideoEnd = () => {
    checkAndResumeMusic();
  };

  return (
    <section id="gallery" className="py-16 px-6 bg-gradient-to-b from-[#fdfaf6] via-white to-[#fdfaf6]">
      <div className="max-w-6xl mx-auto text-center">
        <AnimatedSection>
          <div className="mb-12">
            <h2 className="font-dancing text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] via-[#C9A961] to-[#8d6e63] mb-6" style={{ padding: '20px' }}>Khoảnh Khắc Đáng Nhớ</h2>
          </div>
        </AnimatedSection>
        <Divider />
        <div className="columns-2 md:columns-3 gap-6 space-y-6">
          {media.map((item, index) => (
            <AnimatedSection key={index}>
              {/* The inline style prevents an image from splitting across columns */}
              <div 
                className="overflow-hidden rounded-2xl shadow-xl group border-2 border-[#D4AF37]/20 transition-all duration-300 hover:shadow-2xl hover:border-[#D4AF37]/40"
                style={{ breakInside: 'avoid' }}
              >
                {item.type === 'image' ? (
                <img
                    src={item.src}
                    alt={`Ảnh kỷ niệm ${index + 1}`}
                    className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <video
                    ref={(el) => videoRefs.current[index] = el}
                    src={item.src}
                    className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                    controls
                    onPlay={() => handleVideoPlay(index)}
                    onPause={handleVideoPause}
                    onEnded={handleVideoEnd}
                />
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
