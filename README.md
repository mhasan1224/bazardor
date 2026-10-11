# 🛒 Bazardor — বাজার দর

Bazardor is a Bangla-language market price web application that helps users explore daily prices of essential products in Bangladesh. Users can compare prices, view price increases and decreases, browse product categories, and access detailed market price information through a responsive and user-friendly interface.

**Live Website:** https://bazardor-flame.vercel.app

## ✨ Features

- **Daily Market Prices:** Browse essential product prices in one place.
- **Price Change Tracking:** Explore products with increased or decreased prices.
- **Product Categories:** Browse products by category.
- **Product Details:** View current prices, price changes, minimum and maximum prices, average prices, and market-wise price information.
- **User Authentication:** Sign up and sign in using email and password.
- **Social Authentication:** Sign in using Google or GitHub.
- **Protected Product Details:** Require authentication to access protected product pages.
- **Profile Management:** View account information, update your name, and sign out.
- **Price Sorting:** Sort category products by price from low to high or high to low.
- **Responsive Design:** Optimized layouts for mobile, tablet, and desktop devices.
- **Loading Skeletons:** Display loading placeholders while content is loading.
- **Custom 404 Page:** Show a helpful not-found page with a link back to the homepage.
- **Toast Notifications:** Provide feedback for relevant authentication and profile actions.
- **Animated Price Ticker:** Display market price information in a scrolling ticker.

## 🛠️ Technologies Used

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- DaisyUI
- HeroUI
- Lucide React
- Iconify
- React Fast Marquee
- React Toastify

### Backend and Authentication
- Better Auth
- MongoDB
- Better Auth MongoDB Adapter

### Development Tools
- Node.js
- npm
- ESLint
- Git and GitHub
- Vercel

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (a compatible LTS version)
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/mhasan1224/bazardor
```


### 2. Navigate to the Project

```bash
cd bazardor
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root directory.

Add the following variables with your own credentials:

```env
MONGODB_URL=your_mongodb_connection_string
BETTER_AUTH_URL=http://localhost:3000

BAZARDOR_AUTH_GOOGLE_CLIENT_ID=your_google_client_id
BAZARDOR_AUTH_GOOGLE_SECRET=your_google_client_secret

BAZARDOR_AUTH_GITHUB_CLIENT_ID=your_github_client_id
BAZARDOR_AUTH_GITHUB_SECRET=your_github_client_secret
```

**Important:** Replace all placeholder values with your actual credentials. Configure Google and GitHub OAuth applications with the appropriate callback URLs for your local and production environments. Never commit `.env.local` or expose secret credentials publicly.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production

```bash
npm run build
```

To start the production server after a successful build:

```bash
npm run start
```

## 🔐 Authentication

Bazardor uses Better Auth for user authentication and MongoDB for database storage.

Supported authentication features include:

- Email and password sign-in
- Email and password registration
- Google OAuth
- GitHub OAuth
- Protected product details
- Profile information updates
- Sign-out functionality

Authentication requires correctly configured environment variables and OAuth credentials.

## 🌐 Deployment

The application is deployed on Vercel.

**Live URL:** https://bazardor-flame.vercel.app

For production deployment, configure all required environment variables in the Vercel project settings and ensure that the OAuth callback URLs match the production domain.

## 📁 Project Structure

The project uses the Next.js App Router architecture. Key application areas include:

```text
bazardor/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   ├── category/
│   │   ├── product/
│   │   ├── profile/
│   │   │   └── update/
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
│   ├── services/
│   └── types/
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

*Note: This is a high-level overview. Your actual project may contain additional files and folders.*

## 🎯 Project Objective

The goal of Bazardor is to make daily market price information easier to explore through a clean, accessible, and responsive Bangla-language web experience.

## 👨‍💻 Development

Contributions, suggestions, and feedback are welcome. For development, create a separate branch, make your changes, and test the application before submitting them.

## 📄 License

This project was developed as an assignment project. No specific open-source license has been declared.
