<h1 align="center">
  <img src="https://img.shields.io/badge/Nestly-AI%20Powered%20Real%20Estate-10b981?style=for-the-badge&logo=vercel&logoColor=white" alt="Nestly"/>
  <br/>
  Nestly — Client
</h1>

<p align="center">
  <strong>AI-Powered Real Estate Platform · Next.js 16 · BetterAuth · Google Gemini</strong>
  <br/>
  <br/>
  <a href="https://nestly-client-silk.vercel.app">🌐 Live Demo</a> ·
  <a href="https://github.com/farhansm01/nestly-server">🔗 Backend Repo</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-black?logo=nextdotjs" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/Auth-BetterAuth-6366f1?logo=auth0" />
  <img src="https://img.shields.io/badge/AI-Google%20Gemini-4285F4?logo=google" />
  <img src="https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel" />
</p>

---

## 📖 Overview

**Nestly** is a full-stack, AI-powered real estate platform where users can discover, list, and manage luxury properties. Built with **Next.js 16 (App Router)**, Nestly combines a premium dark-mode UI with live Google Gemini AI intelligence — giving buyers intelligent recommendations, document risk auditing, and a conversational real estate assistant.

---

## ✨ Features

### 🏠 Property Marketplace
- Browse **Apartments, Villas, Penthouses & Suburban Homes**
- Full-text search, type filtering, and sort by newest / price
- Rich property detail pages with photo gallery, specs, and seller info
- Category-filtered browsing from homepage quick-links

### 🤖 AI Intelligence Suite (`/ai-features`)
| Feature | Description |
|---|---|
| **Smart Recommendations** | Google Gemini scores properties against lifestyle preferences (Ocean Views, Smart Home Tech, Private Pool, EV Parking, etc.) with 88–99% match badges |
| **Document Intelligence** | Paste lease or purchase agreement text; AI detects risk clauses, extracts key dates/prices, classifies document type, and generates action items |
| **Real Estate Chat Assistant** | A live Gemini-powered chat assistant with full website context — knows all active property listings, prices, and Nestly platform workflows |

### 🔐 Authentication
- Email/password registration and login via **BetterAuth**
- **Google OAuth** single sign-on
- Role-based session management (`user`, `admin`)

### 📊 Role-Based Dashboards
| Role | Access |
|---|---|
| **Buyer** | Browse saved/favorite properties, view purchase inquiries |
| **Seller** | Add listings (`/dashboard/add`), manage own properties, track views and status |
| **Admin** | Platform statistics overview, approve/reject/manage all listings, manage all users (restrict accounts, change roles, delete users) |

### 💳 Stripe Payments
- Secure property purchase flow powered by Stripe
- Test mode ready with publishable/secret key configuration

### 📷 Image Uploading
- Property images uploaded via ImgBB API
- Multi-image gallery support per listing

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router) | React framework with server-side and static rendering |
| **React 19** | UI component library |
| **BetterAuth** | Authentication (email/password + Google OAuth) |
| **DaisyUI + Tailwind CSS** | Component library and utility CSS |
| **Google Gemini AI** | AI recommendations, document analysis, chat |
| **Stripe** | Payment processing |
| **ImgBB** | Image hosting for property photos |
| **Vercel** | Hosting & deployment |

---

## 🗂 Project Structure

```
nestly-client/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.js             # Homepage
│   │   ├── items/              # Property browse & detail pages
│   │   ├── ai-features/        # AI Intelligence Suite
│   │   ├── dashboard/          # Role-based dashboards
│   │   │   ├── page.js         # Admin overview
│   │   │   ├── add/            # Add new listing
│   │   │   ├── manage/         # Admin manage all listings
│   │   │   ├── saved/          # Buyer saved properties
│   │   │   ├── buyer/          # Buyer dashboard
│   │   │   ├── seller/         # Seller dashboard
│   │   │   └── admin/          # Admin users & properties management
│   │   ├── login/              # Login page
│   │   ├── register/           # Register page
│   │   ├── about/              # About page
│   │   └── contact/            # Contact page
│   ├── api/                    # API helper modules (client-side)
│   │   ├── admin.js            # Admin stats, users, property management APIs
│   │   ├── ai.js               # AI recommendation, audit, chat APIs
│   │   ├── properties.js       # Property CRUD APIs
│   │   └── favorites.js        # Saved/favorite properties APIs
│   ├── components/             # Reusable UI components
│   │   ├── common/             # Shared: Navbar, Footer, ImageUploader, etc.
│   │   └── properties/         # PropertyCard, PropertyDetail, etc.
│   └── lib/
│       ├── fetcher.js          # Shared API fetch wrapper (auto-routes to production backend)
│       ├── auth.js             # BetterAuth server-side configuration
│       └── auth-client.js      # BetterAuth client-side configuration
├── .env.local                  # Local environment variables
└── vercel.json                 # Vercel deployment configuration
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root with the following variables:

```env
# Backend Server URL
NEXT_PUBLIC_SERVER_URL=http://localhost:5000

# Auth Configuration
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# MongoDB (for BetterAuth session storage)
MONGODB_URI=your_mongodb_connection_string

# Stripe Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Image Hosting
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key

# Internal API Secret (must match backend)
INTERNAL_API_SECRET=your_internal_secret
NEXT_PUBLIC_INTERNAL_API_SECRET=your_internal_secret
```

> **For Vercel production deployment**, set `NEXT_PUBLIC_SERVER_URL` to your deployed backend URL (e.g., `https://nestly-server-sigma.vercel.app`) and `NEXT_PUBLIC_BETTER_AUTH_URL` to your frontend URL.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/farhansm01/nestly-client.git
cd nestly-client

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your credentials

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🌐 Deployment

This project is deployed on **Vercel** with automatic CI/CD from the `main` branch.

**Live URL:** [https://nestly-client-silk.vercel.app](https://nestly-client-silk.vercel.app)

### Vercel Environment Variables Required:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SERVER_URL` | `https://nestly-server-sigma.vercel.app` |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | `https://nestly-client-silk.vercel.app` |
| `BETTER_AUTH_URL` | `https://nestly-client-silk.vercel.app` |
| `BETTER_AUTH_SECRET` | *(your secret)* |
| `GOOGLE_CLIENT_ID` | *(from Google Cloud Console)* |
| `GOOGLE_CLIENT_SECRET` | *(from Google Cloud Console)* |
| `MONGODB_URI` | *(your MongoDB Atlas connection string)* |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | *(from Stripe Dashboard)* |
| `STRIPE_SECRET_KEY` | *(from Stripe Dashboard)* |
| `NEXT_PUBLIC_IMGBB_API_KEY` | *(from ImgBB)* |
| `INTERNAL_API_SECRET` | *(must match backend value)* |

---

## 🔗 Related

- **Backend API Repo:** [nestly-server](https://github.com/farhansm01/nestly-server)
- **Live API:** [https://nestly-server-sigma.vercel.app](https://nestly-server-sigma.vercel.app)

---

## 📄 License

MIT License — © 2026 Farhan Sadiq
