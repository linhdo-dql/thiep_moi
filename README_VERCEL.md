# Hướng dẫn Deploy lên Vercel

## Đã thiết lập:

1. **Vercel API Route** (`api/index.ts`):
   - Đọc query params từ URL
   - Inject meta tags động (og:url, og:title, og:description) vào HTML
   - Trả về HTML với meta tags đúng cho Facebook crawler

2. **vercel.json**:
   - Rewrite root path `/` đến `/api/index` để inject meta tags
   - Rewrite các path khác đến `/index.html` cho SPA routing

## Cách Deploy:

### Option 1: Deploy qua Vercel CLI

```bash
# Cài đặt Vercel CLI (nếu chưa có)
npm i -g vercel

# Login vào Vercel
vercel login

# Deploy
vercel

# Deploy production
vercel --prod
```

### Option 2: Deploy qua GitHub

1. Push code lên GitHub
2. Vào https://vercel.com
3. Import project từ GitHub
4. Vercel sẽ tự động detect và deploy

### Option 3: Deploy qua Vercel Dashboard

1. Vào https://vercel.com/new
2. Import project (GitHub, GitLab, Bitbucket)
3. Vercel sẽ tự động build và deploy

## Cấu hình:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Root Path Rewrite**: `/` → `/api/index` (để inject meta tags)
- **SPA Routing**: Tất cả path khác → `/index.html`

## Test:

Sau khi deploy, test các URL:
- `https://your-project.vercel.app/` - Base URL
- `https://your-project.vercel.app/?route=bride` - Nhà gái
- `https://your-project.vercel.app/?route=groom` - Nhà trai
- `https://your-project.vercel.app/?route=bride&to=Tên&role=Chị` - Custom invitation

Kiểm tra meta tags trong source code hoặc dùng Facebook Debugger:
https://developers.facebook.com/tools/debug/

## Lưu ý:

- Vercel miễn phí cho personal projects
- API routes có giới hạn execution time (10s cho free tier)
- Cần đảm bảo `dist/index.html` tồn tại sau khi build

