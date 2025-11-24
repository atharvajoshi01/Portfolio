'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/atharvajoshi01',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/atharvajoshi01',
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: 'mailto:atharvaj2112@gmail.com',
    icon: Mail,
  },
]

const footerLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Lab', href: '/lab' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-neutral-100 border-t border-neutral-800">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand & Tagline */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <motion.h3
                className="text-2xl font-display font-bold"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-neutral-100">Atharva</span>
                <span className="text-accent ml-1">Joshi</span>
              </motion.h3>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Building production-grade machine learning systems.
              <br />
              Deep Learning • MLOps • Quantitative Finance
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Connect */}
          <div>
            <h4 className="font-display font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-accent transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              })}
            </div>
            <p className="text-neutral-400 text-xs">
              Available for ML/AI consulting and full-time opportunities
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-400 text-sm">
              &copy; {currentYear} Atharva Joshi. Built with Next.js & Tailwind CSS.
            </p>
            <p className="text-neutral-500 text-xs">
              Designed for clarity. Optimized for performance.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
