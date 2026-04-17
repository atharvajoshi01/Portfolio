'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#', label: 'Overview' },
  { href: '#projects', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#opensource', label: 'Open Source' },
  { href: '#experience', label: 'About' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState('#')

  useEffect(() => {
    const handleScroll = () => {
      // Update active section based on scroll position
      const sections = ['contact', 'experience', 'skills', 'opensource', 'projects']
      let current = '#'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 200) {
          current = `#${id}`
          break
        }
      }
      // Map sections back to nav labels
      if (current === '#contact') current = '#experience'
      setActive(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
    >
      {/* Desktop pill nav */}
      <div className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200/60 shadow-sm"
        style={{ boxShadow: '0 0 20px rgba(170, 213, 228, 0.24)' }}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              active === link.href
                ? 'text-accent'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            {link.label}
            {active === link.href && (
              <motion.div
                layoutId="nav-underline"
                className="h-0.5 bg-accent rounded-full mt-0.5"
                transition={{ duration: 0.3 }}
              />
            )}
          </a>
        ))}
      </div>

      {/* Mobile nav */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200/60 shadow-sm"
          style={{ boxShadow: '0 0 20px rgba(170, 213, 228, 0.24)' }}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-14 right-0 w-48 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-neutral-200/60 shadow-lg"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-neutral-600 hover:text-accent hover:bg-neutral-50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
