import { useEffect, type FC } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const MetaTags: FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const guestName = searchParams.get('to') || 'Bạn';
  const guestRole = searchParams.get('role') || '';
  const isParent = searchParams.get('parent') === 'true';
  const isBrideRoute = location.pathname === '/bride' || window.location.hash.includes('/bride');
  
  // Xác định ảnh preview dựa trên route và params
  const getPreviewImage = (): string => {
    const baseUrl = 'https://thiepmoi-2ba7b.web.app/images';
    
    // Nếu có tham số custom (tên khách, vai vế)
    if (guestName && guestName !== 'Bạn' && guestRole) {
      // Có thể tạo ảnh preview riêng cho custom invitation
      // Hiện tại dùng ảnh chung, có thể tạo sau
      return isBrideRoute 
        ? `${baseUrl}/3_2_1.jpg` // Ảnh cho nhà gái custom
        : `${baseUrl}/3_2_1.jpg`; // Ảnh cho nhà trai custom
    }
    
    // Link mặc định
    if (isBrideRoute) {
      return `${baseUrl}/3_2_1.jpg`; // Ảnh cho nhà gái mặc định
    }
    return `${baseUrl}/3_2_1.jpg`; // Ảnh cho nhà trai mặc định
  };
  
  // Xác định title và description dựa trên route và params
  const getTitle = (): string => {
    const baseTitle = 'Thiệp Cưới Online | Quang Linh & Thanh Loan';
    if (guestName && guestName !== 'Bạn' && guestRole) {
      return `${baseTitle} - ${guestRole} ${guestName}`;
    }
    return baseTitle;
  };
  
  const getDescription = (): string => {
    if (guestName && guestName !== 'Bạn' && guestRole) {
      return `Trân trọng mời ${guestRole} ${guestName} tham dự lễ cưới của Quang Linh & Thanh Loan`;
    }
    return 'Trân trọng mời Quý vị tham dự lễ cưới của Quang Linh & Thanh Loan';
  };
  
  const getCurrentUrl = (): string => {
    // Tạo URL đầy đủ với query params (không có hash) để crawler đọc được
    const fullUrl = new URL(window.location.href);
    fullUrl.hash = ''; // Bỏ hash để crawler đọc được
    return fullUrl.toString();
  };
  
  useEffect(() => {
    const imageUrl = getPreviewImage();
    const title = getTitle();
    const description = getDescription();
    const url = getCurrentUrl();
    
    // Update hoặc create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = true) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', property);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    // Update title
    document.title = title;
    
    // Update Open Graph tags
    updateMetaTag('og:url', url);
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', imageUrl);
    updateMetaTag('og:image:url', imageUrl);
    updateMetaTag('og:image:secure_url', imageUrl);
    updateMetaTag('og:image:width', '1200');
    updateMetaTag('og:image:height', '1800');
    updateMetaTag('og:image:type', 'image/jpeg');
    
    // Update Twitter tags
    updateMetaTag('twitter:url', url, false);
    updateMetaTag('twitter:title', title, false);
    updateMetaTag('twitter:description', description, false);
    updateMetaTag('twitter:image', imageUrl, false);
    
    // Update description
    updateMetaTag('description', description, false);
    
    // Update Schema.org
    // Update Schema.org - cần update riêng vì có nhiều meta với cùng itemprop
    let nameMeta = document.querySelector('meta[itemprop="name"]') as HTMLMetaElement;
    if (!nameMeta) {
      nameMeta = document.createElement('meta');
      nameMeta.setAttribute('itemprop', 'name');
      document.head.appendChild(nameMeta);
    }
    nameMeta.setAttribute('content', title);
    
    let descMeta = document.querySelector('meta[itemprop="description"]') as HTMLMetaElement;
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('itemprop', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', description);
    
    let imgMeta = document.querySelector('meta[itemprop="image"]') as HTMLMetaElement;
    if (!imgMeta) {
      imgMeta = document.createElement('meta');
      imgMeta.setAttribute('itemprop', 'image');
      document.head.appendChild(imgMeta);
    }
    imgMeta.setAttribute('content', imageUrl);
    
    // Update link rel="image_src"
    let linkImage = document.querySelector('link[rel="image_src"]') as HTMLLinkElement;
    if (!linkImage) {
      linkImage = document.createElement('link');
      linkImage.setAttribute('rel', 'image_src');
      document.head.appendChild(linkImage);
    }
    linkImage.setAttribute('href', imageUrl);
    
  }, [location, searchParams]);
  
  return null; // Component này không render gì
};

export default MetaTags;

