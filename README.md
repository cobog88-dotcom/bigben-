# Big Ben Global Limited — Web Platform

An enterprise-ready, high-converting e-commerce web platform for **Big Ben Global Limited**, featuring an authentic herbal & botanicals product line, responsive shopping cart & checkout, customer dashboard, operations admin suite, and grounded customer care AI.

## Products Included
- **BEETROOT AND HIBISCUS TEA** (25 Tea Bags, Pure Ruby Botanical Infusion)
- **HERBAL INFUSED TEA** (25 Tea Bags, Green Herbal Rich Taste)
- **COCOA BUTTER** (100% Pure Moisturizing, 120g Natural Skincare)
- **COCONUT OIL** (100% Natural Cold-Pressed Virgin Coconut Oil, 250ml)
- **PEANUT OIL** (100% Natural Cold-Pressed Virgin Peanut Oil, 250ml)
- **COCOA POWDER** (100% Pure Natural Cocoa Powder, 100g)

---

## Deployment to Vercel

This repository is pre-configured with `vercel.json` and a serverless entry point at `/api/index.ts` for immediate zero-config deployment to Vercel.

### Method 1: Push to GitHub & Connect with Vercel (Recommended)

1. **Create a new repository** on GitHub (e.g. `big-ben-global-web`).
2. **Link and push your local commits**:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
3. **Import into Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select your GitHub repository.
   - Vercel automatically detects the build settings:
     - **Framework Preset:** Vite
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - *(Optional)* Under **Environment Variables**, add:
     - `GEMINI_API_KEY`: Your Google Gemini API key (enables real-time AI responses). If omitted, the built-in grounded heuristic tea specialist engine activates automatically.
4. Click **Deploy**. Your app will be live with full frontend and API serverless routes!

---

### Method 2: Deploy via Vercel CLI

If you have the Vercel CLI installed on your machine:
```bash
# 1. Login to your Vercel account
npx vercel login

# 2. Deploy preview
npx vercel

# 3. Deploy directly to production
npx vercel --prod
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start local full-stack dev server
npm run dev
# The application will run at http://localhost:3000

# Build for production
npm run build
```
