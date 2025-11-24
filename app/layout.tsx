import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Atharva Joshi - ML Engineer & Data Scientist',
  description: 'Production-grade machine learning systems. Specializing in Deep Learning, MLOps, Predictive Maintenance, and Quantitative Finance.',
  keywords: ['Machine Learning', 'Deep Learning', 'MLOps', 'Data Science', 'Python', 'PyTorch', 'TensorFlow', 'Quantitative Finance'],
  authors: [{ name: 'Atharva Joshi', url: 'https://github.com/atharvajoshi01' }],
  creator: 'Atharva Joshi',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Atharva Joshi - ML Engineer & Data Scientist',
    description: 'Building reliable, production-grade machine learning systems',
    siteName: 'Atharva Joshi Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atharva Joshi - ML Engineer & Data Scientist',
    description: 'Building reliable, production-grade machine learning systems',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
