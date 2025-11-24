'use client'

import { motion } from 'framer-motion'
import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  title?: string
  subtitle?: string
  id?: string
}

export default function Section({
  children,
  className,
  title,
  subtitle,
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn('section-padding', className)}>
      <div className="container-custom">
        {(title || subtitle) && (
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {subtitle && (
              <p className="text-accent font-medium mb-2 uppercase tracking-wider text-sm">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-primary">
                {title}
              </h2>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  )
}
