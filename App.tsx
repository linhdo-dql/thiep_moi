import React, { useState, useRef, useEffect } from 'react';
import { HashRouter, Routes, Route, useSearchParams, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HeaderBride from './components/HeaderBride';
import SaveTheDateSection from './components/SaveTheDateSection';
import InvitationSection from './components/InvitationSection';
import InvitationSectionBride from './components/InvitationSectionBride';
import TimelineSection from './components/TimelineSection';
import TimelineSectionBride from './components/TimelineSectionBride';
import StorySection from './components/StorySection';
import GallerySection from './components/GallerySection';
import RSVPSection from './components/RSVPSection';
import ContactSection from './components/ContactSection';
import ContactSectionBride from './components/ContactSectionBride';
import MapSection from './components/MapSection';
import MapSectionBride from './components/MapSectionBride';
import Footer from './components/Footer';
import FooterBride from './components/FooterBride';
import GuestBook from './components/GuestBook';
import ToastNotification from './components/ToastNotification';
import Fireworks from './components/Fireworks';
import MetaTags from './components/MetaTags';
import { db } from './firebaseConfig';
import { ref, onChildAdded, query, orderByChild, startAt, get } from 'firebase/database';

interface Wish {
  key: string;
  name: string;
  message: string;
  createdAt: number;
}

interface MainInvitationPageProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainInvitationPage: React.FC<MainInvitationPageProps> = ({ audioRef, isPlaying, setIsPlaying }) => (
  <>
    <Header />
    <main>
      <SaveTheDateSection />
      <InvitationSection />
      <TimelineSection />
      <StorySection />
      <GallerySection audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <RSVPSection />
      <ContactSection />
      <MapSection />
    </main>
    <Footer />
  </>
);

const MainInvitationPageBride: React.FC<MainInvitationPageProps> = ({ audioRef, isPlaying, setIsPlaying }) => (
  <>
    <HeaderBride />
    <main>
      <SaveTheDateSection />
      <InvitationSectionBride />
      <TimelineSectionBride />
      <StorySection />
      <GallerySection audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <RSVPSection />
      <ContactSectionBride />
      <MapSectionBride />
    </main>
    <FooterBride />
  </>
);

const AppContent: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const location = useLocation();

  const [searchParams] = useSearchParams();
  // Đọc query params từ URL gốc (không chỉ hash) để hỗ trợ cả query params trong URL gốc
  const urlParams = new URLSearchParams(window.location.search);
  const routeParam = urlParams.get('route') || searchParams.get('route');
  const guestName = urlParams.get('to') || searchParams.get('to') || 'Bạn';
  const guestRole = urlParams.get('role') || searchParams.get('role') || '';
  const isParentFromUrl = urlParams.get('parent') === 'true' || searchParams.get('parent') === 'true';
  // Xác định route: từ query param 'route' hoặc từ hash/pathname
  const isBrideRoute = routeParam === 'bride' || location.pathname === '/bride' || window.location.hash.includes('/bride');

  // Kiểm tra xem có hash route không (link mặc định hoặc link cá nhân hóa)
  // Với HashRouter, kiểm tra cả window.location.hash và location.pathname
  const [hasHashRoute, setHasHashRoute] = useState(() => {
    const hash = window.location.hash;
    const pathname = location.pathname;
    // Nếu có hash bắt đầu bằng #/ hoặc pathname không phải root
    return (hash && hash.startsWith('#/')) || (pathname && pathname !== '/');
  });
  const [isSiteEntered, setIsSiteEntered] = useState(() => {
    // Nếu có hash route hoặc query params, tự động vào site
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(window.location.search);
    return (hash && hash.startsWith('#/')) || urlParams.has('route') || urlParams.has('to');
  });

  // Đảm bảo hash route được set đúng khi có query param 'route'
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const routeFromUrl = urlParams.get('route');
    const hash = window.location.hash;
    
    if (routeFromUrl) {
      const expectedHash = routeFromUrl === 'bride' ? '#/bride' : '#/';
      // Nếu hash không đúng, set lại hash
      if (hash !== expectedHash && !hash.startsWith(expectedHash)) {
        window.location.hash = expectedHash;
      }
    }
    // Nếu không có query param 'route' nhưng có hash, giữ nguyên
    else if (hash && hash.startsWith('#/')) {
      // Hash đã có, không cần làm gì
    }
  }, [location]); // Chạy khi location thay đổi

  // Cập nhật hasHashRoute khi location thay đổi
  useEffect(() => {
    const hash = window.location.hash;
    const pathname = location.pathname;
    // Nếu có hash bắt đầu bằng #/ hoặc pathname không phải root
    const hasRoute = (hash && hash.startsWith('#/')) || (pathname && pathname !== '/');
    setHasHashRoute(hasRoute);
  }, [location]);

  // State cho form tạo link cá nhân hóa
  const [inputName, setInputName] = useState('');
  const [inputRole, setInputRole] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<'groom' | 'bride'>('groom'); // 'groom' = nhà trai, 'bride' = nhà gái
  const [isParent, setIsParent] = useState(false); // Checkbox phụ huynh
  const [personalLink, setPersonalLink] = useState('');

  const [allWishes, setAllWishes] = useState<Wish[]>([]);
  const [wishQueue, setWishQueue] = useState<Wish[]>([]);
  const [currentToastWish, setCurrentToastWish] = useState<{ name: string; message: string } | null>(null);
  const displayedToastKeys = useRef(new Set<string>());

  useEffect(() => {
    if (!isSiteEntered) return;

    const wishesRef = ref(db, 'wishes');
    const initialTimestamp = Date.now();

    const fetchInitialWishes = async () => {
      const snapshot = await get(query(wishesRef, orderByChild('createdAt')));
      if (snapshot.exists()) {
        const wishesData = snapshot.val();
        const loadedWishes: Wish[] = Object.keys(wishesData).map(key => ({
          key,
          ...wishesData[key],
        }));

        loadedWishes.forEach(w => displayedToastKeys.current.add(w.key));
        
        const shuffledWishes = [...loadedWishes].sort(() => Math.random() - 0.5);
        setAllWishes(loadedWishes);
        setWishQueue(shuffledWishes);
      }
    };

    fetchInitialWishes();

    const newWishesQuery = query(
      wishesRef,
      orderByChild('createdAt'),
      startAt(initialTimestamp)
    );

    const unsubscribe = onChildAdded(newWishesQuery, (snapshot) => {
      const newWish = { key: snapshot.key as string, ...snapshot.val() };
      
      if (newWish && newWish.name && newWish.message && !displayedToastKeys.current.has(newWish.key)) {
        displayedToastKeys.current.add(newWish.key);
        setWishQueue(prevQueue => [newWish, ...prevQueue]);
        setAllWishes(prevAll => [...prevAll, newWish]);
      }
    });

    return () => unsubscribe();
  }, [isSiteEntered]);

  useEffect(() => {
    if (currentToastWish || wishQueue.length === 0 || !isSiteEntered) {
      return;
    }

    const timer = setTimeout(() => {
      const nextQueue = [...wishQueue];
      const nextWish = nextQueue.shift();

      if (nextQueue.length === 0 && allWishes.length > 0) {
        const reshuffledWishes = [...allWishes].sort(() => Math.random() - 0.5);
        setWishQueue(reshuffledWishes);
      } else {
        setWishQueue(nextQueue);
      }

      if (nextWish) {
        setCurrentToastWish({ name: nextWish.name, message: nextWish.message });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentToastWish, wishQueue, allWishes, isSiteEntered]);


  const handleSiteEnter = () => {
    setIsSiteEntered(true);
    const audio = audioRef.current;
    if (audio && audio.src) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Audio playback failed after interaction:", error);
        setIsPlaying(false);
      });
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio && audio.src) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

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

  // Hàm sinh lời mời theo vai vế
  function getInvitationText(role: string, name: string, parent: boolean) {
    const addressing = getAddressing(role, parent);
    
    switch (role) {
      case 'Anh':
        return `Trân trọng kính mời Anh ${name} tới dự lễ cưới của ${addressing}.`;
      case 'Chị':
        return `Trân trọng kính mời Chị ${name} tới dự lễ cưới của ${addressing}.`;
      case 'Cô':
        return `Trân trọng kính mời Cô ${name} cùng gia đình tới dự lễ thành hôn của ${addressing}.`;
      case 'Chú':
        return `Trân trọng kính mời Chú ${name} cùng gia đình tới dự lễ thành hôn của ${addressing}.`;
      case 'Bác':
        return `Trân trọng kính mời Bác ${name} cùng gia đình tới dự lễ thành hôn của ${addressing}.`;
      case 'Dì':
        return `Trân trọng kính mời Dì ${name} cùng gia đình tới dự lễ thành hôn của ${addressing}.`;
      case 'Ông':
        return `Trân trọng kính mời Ông ${name} cùng gia đình tới dự lễ thành hôn của ${addressing}.`;
      case 'Bà':
        return `Trân trọng kính mời Bà ${name} cùng gia đình tới dự lễ thành hôn của ${addressing}.`;
      case 'Em':
        return `Mời Em ${name} đến chung vui cùng ${addressing}.`;
      case 'Bạn':
        return `Mời Bạn ${name} đến chung vui cùng ${addressing}.`;
      default:
        return `Trân trọng mời ${name} tham dự lễ cưới.`;
    }
  }

  return (
    <div className="bg-gradient-to-b from-[#fdfaf6] via-[#faf8f3] to-[#fdfaf6] text-gray-700 font-cormorant">
      <MetaTags />
      <audio 
        ref={audioRef} 
        src="https://files.catbox.moe/ux7bsp.mp3"
        loop 
      />
      <Fireworks />

      {!isSiteEntered && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center text-white text-center p-2 md:p-4 overflow-y-auto">
            <img src="/images/3.JPG" alt="Sảnh cưới lộng lẫy" className="fixed inset-0 w-full h-full object-cover object-top z-0" style={{ objectPosition: '25% 25%' }} />
            <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40 z-10"></div>
            <div className="relative z-20 animate-fade-in w-full max-w-full px-3 md:px-4 py-4 md:py-0">
                <div className="mb-6 md:mb-8">
                  {/* <p className="font-dancing text-3xl md:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-white via-[#FFE5B4] to-[#D4AF37] drop-shadow-lg tracking-wide font-medium break-words mx-auto text-center">
                    Save The Date
                  </p>
                  <div className="w-20 md:w-32 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2 md:mt-4 opacity-70"></div> */}
                </div>
                <h1 className="font-dancing text-4xl md:text-7xl lg:text-9xl mb-6 md:mb-8 flex flex-wrap items-center justify-center gap-3 md:gap-6 lg:gap-12 drop-shadow-2xl px-4 md:px-8 overflow-visible" style={{ textRendering: 'optimizeLegibility', WebkitFontSmoothing: 'antialiased' }}>
                    {isBrideRoute ? (
                      <>
                        {/* Nhà gái trước - Thanh Loan */}
                        <div className="text-center leading-tight overflow-visible">
                            <span className="bg-gradient-to-b from-white via-[#FFE5B4] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] inline-block landing-name-text" style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Thanh</span><br/>
                            <span className="bg-gradient-to-b from-white via-[#FFE5B4] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] inline-block landing-name-text" style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Loan</span>
                        </div>
                        <img 
                          src="/images/ring.png" 
                          alt="Nhẫn cưới" 
                          className="h-10 w-10 md:h-14 md:w-14 lg:h-16 lg:w-16 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-pulse-slow flex-shrink-0 object-contain"
                          loading="eager"
                        />
                        {/* Nhà trai sau - Quang Linh */}
                        <div className="text-center leading-tight overflow-visible">
                            <span className="bg-gradient-to-b from-white via-[#FFE5B4] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] inline-block landing-name-text" style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Quang</span><br/>
                            <span className="bg-gradient-to-b from-white via-[#FFE5B4] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] inline-block landing-name-text" style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Linh</span>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Nhà trai trước - Quang Linh */}
                    <div className="text-center leading-tight overflow-visible">
                        <span className="bg-gradient-to-b from-white via-[#FFE5B4] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] inline-block landing-name-text" style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Quang</span><br/>
                        <span className="bg-gradient-to-b from-white via-[#FFE5B4] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] inline-block landing-name-text" style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Linh</span>
                    </div>
                    <img 
                      src="/images/ring.png" 
                      alt="Nhẫn cưới" 
                      className="h-10 w-10 md:h-14 md:w-14 lg:h-16 lg:w-16 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-pulse-slow flex-shrink-0 object-contain"
                      loading="eager"
                    />
                        {/* Nhà gái sau - Thanh Loan */}
                    <div className="text-center leading-tight overflow-visible">
                        <span className="bg-gradient-to-b from-white via-[#FFE5B4] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] inline-block landing-name-text" style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Thanh</span><br/>
                        <span className="bg-gradient-to-b from-white via-[#FFE5B4] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] inline-block landing-name-text" style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Loan</span>
                    </div>
                      </>
                    )}
                </h1>
                <p className="font-cormorant text-base md:text-xl lg:text-2xl mb-6 md:mb-8 tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-2 md:px-4 break-words text-center">
                  {guestRole && guestName !== 'Quý vị'
                    ? (<span className="font-light italic">{getInvitationText(guestRole, guestName, isParentFromUrl)}</span>)
                    : (<span>Trân trọng mời <span className="font-semibold text-[#FFE5B4]">{guestName}</span> tham dự lễ cưới</span>)}
                </p>
                {/* Form tạo link cá nhân hóa chỉ hiện khi chưa có tên khách, chưa vào site, và không có hash route (chỉ hiện khi truy cập trang root) */}
                {!searchParams.get('to') && !isSiteEntered && !hasHashRoute && (
                  <div className="mb-8 flex flex-col items-center justify-center gap-3 bg-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-white/20 shadow-2xl mx-auto w-full max-w-sm md:max-w-md overflow-visible">
                    <label htmlFor="guestNameInput" className="text-white/90 font-cormorant text-sm md:text-base font-medium text-center px-2 break-words">Tạo link mời cá nhân hóa:</label>
                    <input
                      id="guestNameInput"
                      type="text"
                      value={inputName}
                      onChange={e => setInputName(e.target.value)}
                      placeholder="Nhập tên khách mời"
                      className="px-4 md:px-5 py-2 md:py-3 rounded-xl text-gray-800 w-full bg-white/95 backdrop-blur-sm border border-white/30 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all text-sm md:text-base"
                    />
                    <select
                      id="guestRoleSelect"
                      value={inputRole}
                      onChange={e => setInputRole(e.target.value)}
                      className="px-4 md:px-5 py-2 md:py-3 rounded-xl text-gray-800 w-full bg-white/95 backdrop-blur-sm border border-white/30 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all text-sm md:text-base"
                    >
                      <option value="">Chọn vai vế</option>
                      <option value="Anh">Anh</option>
                      <option value="Chị">Chị</option>
                      <option value="Cô">Cô</option>
                      <option value="Chú">Chú</option>
                      <option value="Bác">Bác</option>
                      <option value="Ông">Ông</option>
                      <option value="Bà">Bà</option>
                      <option value="Em">Em</option>
                      <option value="Bạn">Bạn</option>
                    </select>
                    <div className="w-full">
                      <label className="text-white/90 font-cormorant text-sm md:text-base font-medium text-center block mb-2">Chọn thiệp:</label>
                      <div className="flex gap-4 justify-center">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="family"
                            value="groom"
                            checked={selectedFamily === 'groom'}
                            onChange={(e) => setSelectedFamily(e.target.value as 'groom' | 'bride')}
                            className="w-4 h-4 text-[#D4AF37] focus:ring-[#D4AF37] focus:ring-2"
                          />
                          <span className="text-white/90 font-cormorant text-sm md:text-base">Nhà Trai</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="family"
                            value="bride"
                            checked={selectedFamily === 'bride'}
                            onChange={(e) => setSelectedFamily(e.target.value as 'groom' | 'bride')}
                            className="w-4 h-4 text-[#D4AF37] focus:ring-[#D4AF37] focus:ring-2"
                          />
                          <span className="text-white/90 font-cormorant text-sm md:text-base">Nhà Gái</span>
                        </label>
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isParent}
                          onChange={(e) => setIsParent(e.target.checked)}
                          className="w-4 h-4 text-[#D4AF37] focus:ring-[#D4AF37] focus:ring-2 rounded"
                        />
                        <span className="text-white/90 font-cormorant text-sm md:text-base">Phụ huynh</span>
                      </label>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                    <button
                      onClick={() => {
                        if (inputName.trim() && inputRole) {
                            // Tạo link với query params trong URL gốc (để Facebook crawler đọc được) và hash cho routing
                            const selectedRoute = selectedFamily === 'bride' ? 'bride' : 'groom';
                            const parentParam = isParent ? '&parent=true' : '';
                            // Query params trong URL gốc để crawler đọc, hash để routing
                            const baseUrl = `${window.location.origin}${window.location.pathname}?route=${selectedRoute}&to=${encodeURIComponent(inputName.trim())}&role=${encodeURIComponent(inputRole)}${parentParam}#/${selectedRoute === 'bride' ? 'bride' : ''}`;
                            setPersonalLink(baseUrl);
                        }
                      }}
                        disabled={!inputName.trim() || !inputRole}
                        className="bg-gradient-to-r from-[#D4AF37] to-[#C9A961] text-white font-cormorant px-6 md:px-8 py-2 md:py-3 rounded-full hover:from-[#C9A961] hover:to-[#B8860B] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 font-semibold text-sm md:text-base w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      Tạo link mời
                    </button>
                      <div className="w-full flex flex-col gap-2">
                        <button
                          onClick={() => {
                            // Tạo link mặc định cho nhà trai với query params trong URL gốc
                            const baseUrl = `${window.location.origin}${window.location.pathname}?route=groom#/`;
                            setPersonalLink(baseUrl);
                          }}
                          className="bg-gradient-to-r from-white/20 to-white/10 text-white font-cormorant px-6 md:px-8 py-2 md:py-3 rounded-full hover:from-white/30 hover:to-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-sm md:text-base w-full border border-white/30"
                        >
                          Tạo thiệp mời mặc định - Nhà Trai
                        </button>
                        <button
                          onClick={() => {
                            // Tạo link mặc định cho nhà gái với query params trong URL gốc
                            const baseUrl = `${window.location.origin}${window.location.pathname}?route=bride#/bride`;
                            setPersonalLink(baseUrl);
                          }}
                          className="bg-gradient-to-r from-white/20 to-white/10 text-white font-cormorant px-6 md:px-8 py-2 md:py-3 rounded-full hover:from-white/30 hover:to-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-sm md:text-base w-full border border-white/30"
                        >
                          Tạo thiệp mời mặc định - Nhà Gái
                        </button>
                      </div>
                    </div>
                    {personalLink && (
                      <div className="mt-3 text-sm text-white/95 break-all bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 overflow-visible w-full">
                        <span className="font-medium block mb-2 text-white">Link mời đã tạo: </span>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={personalLink}
                            readOnly
                            className="flex-1 px-3 py-2 rounded-lg bg-white/20 text-white text-xs border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                            onClick={(e) => e.currentTarget.select()}
                          />
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(personalLink);
                              alert('Đã sao chép link!');
                            }}
                            className="px-3 py-2 bg-[#D4AF37] hover:bg-[#C9A961] text-white rounded-lg transition-colors text-xs font-semibold"
                          >
                            Copy
                          </button>
                        </div>
                        <a href={personalLink} target="_blank" rel="noopener noreferrer" className="underline text-[#FFE5B4] hover:text-[#D4AF37] transition-colors break-all inline-block w-full mt-2 text-xs">
                          {personalLink}
                        </a>
                      </div>
                    )}
                  </div>
                )}
                <button
                    onClick={handleSiteEnter}
                    className="bg-gradient-to-r from-white/20 via-white/15 to-white/20 backdrop-blur-xl border-2 border-white/30 text-white font-cormorant text-base md:text-xl font-semibold py-3 md:py-4 px-8 md:px-16 rounded-full hover:from-white/30 hover:via-white/25 hover:to-white/30 transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transform hover:scale-105 tracking-wider mx-auto"
                >
                    Mở Thiệp Mời
                </button>
                <div className="mt-6 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/70 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
            </div>
            <style>{`
                @keyframes fade-in {
                  from { opacity: 0; transform: translateY(30px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse-slow {
                  0%, 100% { opacity: 0.9; transform: scale(1); }
                  50% { opacity: 1; transform: scale(1.05); }
                }
                .animate-fade-in {
                  animation: fade-in 1.8s ease-out forwards;
                }
                .animate-pulse-slow {
                  animation: pulse-slow 3s ease-in-out infinite;
                }
                .landing-name-text {
                  padding: 10px !important;
                }
            `}</style>
        </div>
      )}

      {isSiteEntered && (
        <div className="animate-app-fade-in">
          <Routes>
            <Route path="/" element={<MainInvitationPage audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />} />
            <Route path="/bride" element={<MainInvitationPageBride audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />} />
            <Route path="/guestbook" element={<GuestBook />} />
          </Routes>

          <button
            onClick={toggleMusic}
            className="fixed bottom-5 right-5 z-50 p-4 bg-gradient-to-br from-white/90 to-white/70 rounded-full shadow-2xl backdrop-blur-md hover:from-white hover:to-white/90 transition-all duration-300 border-2 border-[#D4AF37]/30 hover:border-[#D4AF37]/50 hover:scale-110"
            aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l-4-4m0 4l4-4" />
              </svg>
            )}
          </button>
          
          {currentToastWish && (
            <ToastNotification
              name={currentToastWish.name}
              message={currentToastWish.message}
              onClose={() => setCurrentToastWish(null)}
            />
          )}

           <style>{`
            @keyframes app-fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-app-fade-in {
              animation: app-fade-in 1s ease-in;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => (
  <HashRouter>
    <AppContent />
  </HashRouter>
);

export default App;