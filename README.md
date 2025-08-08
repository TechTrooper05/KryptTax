# KryptTax
KryptTax is a web-based cryptocurrency tax calculator specifically designed for Indian users. It allows traders and investors to import crypto transaction data, compute capital gains taxes, and track their portfolios—all through a beautiful and modern interface.

---

Team Members:
1. Kartik Singh
2. Ayush Tak
3. Shaurya Jain
4. Aditya Pawaskar
5. Suryakiran Haridas
   
---

## 🌐 Live Demo
Here's the preview of our web app:
https://preview-krypttax-website-kzmiyequ79liq27uu79s.vusercontent.net/

---

## 🧰 Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Package Manager**: pnpm
- **Bundler**: Vite (via Next.js internal)

---

## 🗂️ Folder Structure

```
KryptTax/
├── app/                  # Main routes and layout
│   ├── page.tsx
│   └── layout.tsx
├── components/           # Reusable React components
│   └── theme-provider.tsx
├── styles/               # Global CSS styles
├── public/               # Static files like icons and images
├── package.json          # Project metadata and scripts
├── tsconfig.json         # TypeScript configuration
├── postcss.config.mjs    # PostCSS setup
├── next.config.mjs       # Next.js configuration
└── pnpm-lock.yaml        # Package lock file
```

---

## ✨ Features

- 📥 Upload crypto transaction data
- 🧮 Calculate capital gains (Short/Long Term)
- 💼 Track real-time portfolio (Mock Data)
- 🇮🇳 Specially designed for Indian tax system

---

## 🔍 How It Works

1. Upload transaction CSV or manually enter trades.
2. App calculates:
    - Buy/Sell Dates
    - Holding Period
    - Taxable Gains (Short-Term or Long-Term)
3. Display tax liability summary and profit/loss insights.

> In future versions, real-time API support and more countries will be supported.

---


## 📄 Future Roadmap

- 🔁 Integration with real-time price APIs (e.g., CoinGecko)
- 🌍 Multi-country tax support
- 📊 CSV/Excel export of tax reports
- 🧾 Auto-upload from exchanges

---

## ⚠️ Known Limitations

- No login or cloud sync yet.

---
Licensed under the [MIT License]
(LICENSE) © 2025 KryptTax Team
