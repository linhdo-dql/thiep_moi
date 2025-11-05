import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";

admin.initializeApp();

// Function để render HTML động với og:url dựa trên query params
export const renderHTML = functions.https.onRequest((req, res) => {
  try {
    // Đọc query params
    const route = req.query.route as string || '';
    const guestName = req.query.to as string || 'Bạn';
    const guestRole = req.query.role as string || '';
    const isParent = req.query.parent === 'true';

    // Xác định route
    const isBrideRoute = route === 'bride';

    // Tạo URL đầy đủ với query params
    const baseUrl = 'https://thiepmoi-2ba7b.web.app';
    let ogUrl = baseUrl + '/';
    const queryParams = new URLSearchParams();
    
    if (route) queryParams.set('route', route);
    if (guestName && guestName !== 'Bạn') queryParams.set('to', guestName);
    if (guestRole) queryParams.set('role', guestRole);
    if (isParent) queryParams.set('parent', 'true');
    
    if (queryParams.toString()) {
      ogUrl = baseUrl + '/?' + queryParams.toString();
    }

    // Tạo title và description động
    let title = 'Thiệp Cưới Online | Quang Linh & Thanh Loan';
    let description = 'Trân trọng mời Quý vị tham dự lễ cưới của Quang Linh & Thanh Loan';

    if (isBrideRoute) {
      title = 'Thiệp Cưới Online - Nhà Gái | Quang Linh & Thanh Loan';
      description = 'Trân trọng mời Quý vị tham dự lễ cưới của Thanh Loan & Quang Linh';
    } else if (route === 'groom') {
      title = 'Thiệp Cưới Online - Nhà Trai | Quang Linh & Thanh Loan';
      description = 'Trân trọng mời Quý vị tham dự lễ cưới của Quang Linh & Thanh Loan';
    }

    if (guestName && guestName !== 'Bạn' && guestRole) {
      title = title + ' - ' + guestRole + ' ' + guestName;
      description = 'Trân trọng mời ' + guestRole + ' ' + guestName + ' tham dự lễ cưới của ' + 
        (isBrideRoute ? 'Thanh Loan & Quang Linh' : 'Quang Linh & Thanh Loan');
    }

    // Escape HTML cho title và description
    const escapeHtml = (text: string): string => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const escapedTitle = escapeHtml(title);
    const escapedDescription = escapeHtml(description);
    const escapedOgUrl = escapeHtml(ogUrl);

    // Đọc index.html từ dist folder
    // Trong production, cần copy dist/index.html vào functions/dist/ hoặc đọc từ hosting
    // Tạm thời đọc từ dist folder của project root
    const indexPath = path.join(__dirname, '../../dist/index.html');
    
    let html = '';
    if (fs.existsSync(indexPath)) {
      html = fs.readFileSync(indexPath, 'utf-8');
    } else {
      // Fallback: fetch từ hosting URL (tránh circular dependency bằng cách không gọi function)
      // Hoặc tạo template HTML động
      console.error('HTML file not found at:', indexPath);
      res.status(500).send('HTML file not found. Please ensure dist/index.html exists.');
      return;
    }

    // Replace og:url trong HTML (có thể có id hoặc không)
    html = html.replace(
      /<meta\s+property="og:url"\s+[^>]*content="[^"]*"[^>]*\/?>/i,
      `<meta property="og:url" content="${escapedOgUrl}" />`
    );

    // Replace title nếu có
    html = html.replace(
      /<title>[^<]*<\/title>/i,
      `<title>${escapedTitle}</title>`
    );

    // Replace description nếu có
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${escapedDescription}" />`
    );

    // Replace og:title
    html = html.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${escapedTitle}" />`
    );

    // Replace og:description
    html = html.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${escapedDescription}" />`
    );

    // Replace twitter:url
    html = html.replace(
      /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:url" content="${escapedOgUrl}" />`
    );

    // Replace twitter:title
    html = html.replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" content="${escapedTitle}" />`
    );

    // Replace twitter:description
    html = html.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" content="${escapedDescription}" />`
    );

    // Replace Schema.org name
    html = html.replace(
      /<meta\s+itemprop="name"\s+content="[^"]*"\s*\/?>/i,
      `<meta itemprop="name" content="${escapedTitle}" />`
    );

    // Replace Schema.org description
    html = html.replace(
      /<meta\s+itemprop="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta itemprop="description" content="${escapedDescription}" />`
    );

    // Set headers
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    
    res.status(200).send(html);
  } catch (error) {
    console.error('Error rendering HTML:', error);
    res.status(500).send('Error rendering HTML');
  }
});

