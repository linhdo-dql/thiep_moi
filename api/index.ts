import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as fs from 'fs';
import * as path from 'path';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  try {
    // Đọc query params
    const route = (req.query.route as string) || '';
    const guestName = (req.query.to as string) || 'Bạn';
    const guestRole = (req.query.role as string) || '';
    const isParent = req.query.parent === 'true';

    // Xác định route
    const isBrideRoute = route === 'bride';

    // Tạo URL đầy đủ với query params
    const host = req.headers.host || 'thiepmoi-2ba7b.vercel.app';
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const baseUrl = `${protocol}://${host}`;
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

    // Escape HTML
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
    const indexPath = path.join(process.cwd(), 'dist', 'index.html');
    
    let html = '';
    if (fs.existsSync(indexPath)) {
      html = fs.readFileSync(indexPath, 'utf-8');
    } else {
      res.status(500).send('HTML file not found');
      return;
    }

    // Replace meta tags
    html = html.replace(
      /<meta\s+property="og:url"\s+[^>]*content="[^"]*"[^>]*\/?>/i,
      `<meta property="og:url" content="${escapedOgUrl}" />`
    );

    html = html.replace(
      /<title>[^<]*<\/title>/i,
      `<title>${escapedTitle}</title>`
    );

    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${escapedDescription}" />`
    );

    html = html.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${escapedTitle}" />`
    );

    html = html.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${escapedDescription}" />`
    );

    html = html.replace(
      /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:url" content="${escapedOgUrl}" />`
    );

    html = html.replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" content="${escapedTitle}" />`
    );

    html = html.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" content="${escapedDescription}" />`
    );

    html = html.replace(
      /<meta\s+itemprop="name"\s+content="[^"]*"\s*\/?>/i,
      `<meta itemprop="name" content="${escapedTitle}" />`
    );

    html = html.replace(
      /<meta\s+itemprop="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta itemprop="description" content="${escapedDescription}" />`
    );

    // Set headers
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    
    res.status(200).send(html);
  } catch (error) {
    console.error('Error rendering HTML:', error);
    res.status(500).send('Error rendering HTML');
  }
}

