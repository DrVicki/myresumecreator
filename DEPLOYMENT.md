# Deployment Guide

This guide covers the best ways to host your Resume Creator application.

## 🚀 Quick Start - Vercel (Recommended)

### Option 1: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (run from project directory)
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: resume-creator
# - Directory: ./
# - Override settings? No
```

### Option 2: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Deploy automatically

## 🌐 Netlify Deployment

### Option 1: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build your app
npm run build

# Deploy
netlify deploy

# For production
netlify deploy --prod
```

### Option 2: Netlify Dashboard
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "New site from Git"
4. Choose your repository
5. Build command: `npm run build`
6. Publish directory: `build`
7. Deploy

## 📚 GitHub Pages

### Setup Steps:
1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/MyResumeCreator.git
   git push -u origin main
   ```

2. **Update Homepage URL**
   Edit `package.json` and change the homepage to your actual GitHub username:
   ```json
   "homepage": "https://yourusername.github.io/MyResumeCreator"
   ```

3. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Save

## ☁️ Other Hosting Options

### Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

### AWS S3 + CloudFront
1. Create S3 bucket
2. Enable static website hosting
3. Upload build files
4. Set up CloudFront distribution
5. Configure custom domain (optional)

### DigitalOcean App Platform
1. Go to DigitalOcean App Platform
2. Connect GitHub repository
3. Configure build settings
4. Deploy

## 🔧 Environment Variables

If you need environment variables, create a `.env` file:
```env
REACT_APP_API_URL=your_api_url
REACT_APP_ANALYTICS_ID=your_analytics_id
```

## 📱 Custom Domain Setup

### Vercel
1. Go to project settings
2. Domains → Add domain
3. Configure DNS records
4. Wait for SSL certificate

### Netlify
1. Site settings → Domain management
2. Add custom domain
3. Configure DNS
4. SSL certificate auto-generated

## 🚨 Common Issues & Solutions

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routing Issues (SPA)
For single-page apps, configure redirects:

**Netlify** (`public/_redirects`):
```
/*    /index.html   200
```

**Vercel** (`vercel.json`):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### PDF Generation Issues
- Ensure all fonts are loaded
- Test on different browsers
- Consider using a server-side PDF service for production

## 📊 Performance Optimization

### Before Deployment
1. **Optimize images**
2. **Enable compression**
3. **Minify CSS/JS**
4. **Use CDN for assets**

### Monitoring
- Set up Google Analytics
- Monitor Core Web Vitals
- Track user interactions

## 🔒 Security Considerations

1. **HTTPS only** (automatic with most hosts)
2. **Content Security Policy**
3. **Regular dependency updates**
4. **Environment variable protection**

## 📈 Analytics Setup

### Google Analytics
```html
<!-- Add to public/index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎯 Recommended Workflow

1. **Development**: Use `npm start` for local development
2. **Testing**: Test thoroughly before deployment
3. **Staging**: Deploy to staging environment first
4. **Production**: Deploy to production with monitoring

## 📞 Support

- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Netlify**: [netlify.com/support](https://netlify.com/support)
- **GitHub Pages**: [docs.github.com/pages](https://docs.github.com/pages)

---

**Choose Vercel for the easiest deployment experience!** 🚀 