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
  title: 'Atharva Joshi - Data Scientist & ML Engineer',
  description: 'MS Data Science student at SUNY Buffalo. Building ML systems for finance and AI evaluation. Open source contributor to Microsoft, Google, Goldman Sachs.',
  keywords: ['Data Science', 'Machine Learning', 'Quantitative Finance', 'Python', 'Open Source'],
  authors: [{ name: 'Atharva Joshi', url: 'https://github.com/atharvajoshi01' }],
  creator: 'Atharva Joshi',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Atharva Joshi - Data Scientist & ML Engineer',
    description: 'Building ML systems for finance and AI evaluation. Open source contributor.',
    siteName: 'Atharva Joshi',
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
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
