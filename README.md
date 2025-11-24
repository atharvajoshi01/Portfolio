# Atharva Joshi - ML Engineer Portfolio

> Production-grade portfolio website showcasing machine learning, deep learning, and MLOps projects.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-ff0055)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Portfolio Screenshot](https://via.placeholder.com/1200x630?text=Atharva+Joshi+Portfolio)

## 🚀 Features

- **Modern Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion
- **Interactive ML Demos:** 3 fully functional playground demos with real-time predictions
- **MDX Blog Engine:** Dynamic content with syntax highlighting and rich formatting
- **Project Showcase:** Detailed case studies with metrics, visualizations, and tech stacks
- **Responsive Design:** Mobile-first, accessible, and optimized for all screen sizes
- **Performance Optimized:** Lighthouse score 95+, fast page loads, smooth animations
- **SEO Ready:** Meta tags, sitemap, semantic HTML
- **Type-Safe:** Full TypeScript coverage with strict mode

## 📁 Project Structure

```
portfolio/
├── app/                        # Next.js 14 App Router
│   ├── page.tsx                # Home page with hero & featured projects
│   ├── projects/
│   │   ├── page.tsx            # Projects listing with filtering
│   │   └── [slug]/page.tsx     # Dynamic project pages (MDX)
│   ├── lab/
│   │   └── page.tsx            # Interactive ML playground
│   ├── writing/
│   │   ├── page.tsx            # Blog listing
│   │   └── [slug]/page.tsx     # Dynamic blog posts (MDX)
│   ├── about/page.tsx          # About page with timeline & skills
│   ├── contact/page.tsx        # Contact information
│   ├── api/                    # API routes for demos
│   │   ├── vibration/predict/route.ts
│   │   ├── options/price/route.ts
│   │   └── pca/compute/route.ts
│   ├── layout.tsx              # Root layout with navigation
│   └── globals.css             # Global styles
│
├── components/                 # React components
│   ├── ui/                     # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Section.tsx
│   ├── demos/                  # Interactive demo components
│   │   ├── VibrationDemo.tsx
│   │   ├── OptionsDemo.tsx
│   │   └── PCADemo.tsx
│   ├── visualizations/
│   │   └── FFTWaveform.tsx     # Animated waveform visualization
│   ├── Navigation.tsx          # Main navigation bar
│   └── Footer.tsx              # Site footer
│
├── content/                    # MDX content
│   ├── projects/               # Project case studies
│   │   ├── deep-galerkin-pde-solver.mdx
│   │   ├── vibration-fault-classification.mdx
│   │   ├── fraud-detection-monitoring.mdx
│   │   ├── welding-automation-cv.mdx
│   │   ├── gdm-metabolomics-analysis.mdx
│   │   └── traffic-monitoring-pipeline.mdx
│   └── posts/                  # Blog posts
│       └── building-deep-galerkin-pde-solver.mdx
│
├── lib/                        # Utility functions
│   ├── mdx.ts                  # MDX content helpers
│   └── utils.ts                # General utilities
│
├── public/                     # Static assets
│
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## 🛠️ Tech Stack

### Core
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Animations:** [Framer Motion 11](https://www.framer.com/motion/)

### Content & Data
- **Content:** MDX with [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- **Metadata:** [gray-matter](https://github.com/jonschlinkert/gray-matter)
- **Charts:** [Recharts](https://recharts.org/) (planned)
- **Icons:** [Lucide React](https://lucide.dev/)

### Development
- **Linting:** ESLint (Next.js config)
- **Type Checking:** TypeScript 5.3
- **Package Manager:** npm

## 📦 Installation

### Prerequisites
- Node.js 18.17+
- npm 9.0+

### Setup

```bash
# Clone repository
git clone https://github.com/atharvajoshi01/portfolio.git
cd portfolio

# Install dependencies
npm install

# Set up environment variables (optional)
cp .env.local.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Development

```bash
# Development server
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## 📝 Adding Content

### Adding a New Project

1. Create MDX file in `content/projects/`:

```mdx
---
title: "Project Title"
description: "Brief description"
date: "2025-01-15"
category: ["Deep Learning", "MLOps"]
featured: true
github: "https://github.com/username/repo"
tech: ["PyTorch", "FastAPI", "Docker"]
---

## Project content here...
```

2. Update `app/projects/page.tsx` to include project in listing (if using static data)

### Adding a Blog Post

1. Create MDX file in `content/posts/`:

```mdx
---
title: "Post Title"
description: "Brief description"
date: "2025-01-15"
readTime: 10
tags: ["Machine Learning", "Python"]
---

## Post content here...
```

2. Content automatically appears in `/writing`

## 🎨 Design System

### Colors

```css
/* Primary */
--color-primary: #0D0D0D;
--color-accent: #3BC9DB;

/* Neutrals */
--color-neutral-50: #FAFAFA;
--color-neutral-100: #F5F5F5;
/* ... */
```

### Typography

- **Headings:** Space Grotesk
- **Body:** Inter

### Component Library

- `Button` - Primary, secondary, outline variants
- `Card` - Content cards with hover effects
- `Section` - Page sections with consistent spacing
- Fully typed with TypeScript

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository on [Vercel](https://vercel.com)
3. Deploy (zero configuration needed)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/atharvajoshi01/portfolio)

### Manual Deployment

```bash
# Build for production
npm run build

# Test production build locally
npm start

# Deploy `./next` folder to hosting provider
```

### Environment Variables

Optional for enhanced features:

```env
# Analytics (optional)
NEXT_PUBLIC_GA_ID=

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🧪 Interactive Demos

The portfolio includes 3 production-ready ML demos:

### 1. Vibration Fault Classifier
- **Technology:** FFT + CNN
- **API:** `/api/vibration/predict`
- **Features:** Real-time signal generation, fault classification
- **Metrics:** 94% accuracy, 45ms inference

### 2. Deep Galerkin Options Pricing
- **Technology:** Neural PDE Solver
- **API:** `/api/options/price`
- **Features:** Interactive parameter sliders, Greeks computation
- **Metrics:** MAE $0.31, 12ms/1000 evaluations

### 3. PCA Visualizer (GDM Metabolomics)
- **Technology:** Dimensionality Reduction
- **API:** `/api/pca/compute`
- **Features:** 2D scatter plot, hover tooltips, variance visualization
- **Metrics:** 156→2 dimensions, 63% variance explained

## 📊 Performance

- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Bundle Size:** Optimized with Next.js automatic code splitting

## 🤝 Contributing

This is a personal portfolio, but suggestions and improvements are welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -m 'Add improvement'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open Pull Request

## 📧 Contact

- **Email:** atharvaj2112@gmail.com
- **LinkedIn:** [linkedin.com/in/atharvajoshi01](https://www.linkedin.com/in/atharvajoshi01)
- **GitHub:** [github.com/atharvajoshi01](https://github.com/atharvajoshi01)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by Atharva Joshi**
*Machine Learning Engineer | Data Scientist | Production ML Specialist*
