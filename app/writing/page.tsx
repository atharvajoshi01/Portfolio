'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'

// Mock blog posts
const posts = [
  {
    slug: 'building-deep-galerkin-pde-solver',
    title: 'Building a Deep Galerkin PDE Solver from Scratch',
    description:
      'Deep dive into physics-informed neural networks for solving partial differential equations in quantitative finance. From theory to production deployment.',
    date: '2025-01-15',
    readTime: 12,
    tags: ['Deep Learning', 'Quantitative Finance', 'PyTorch'],
  },
  {
    slug: 'fft-predictive-maintenance',
    title: 'FFT for Predictive Maintenance: A Practical Guide',
    description:
      'How frequency domain analysis revolutionizes industrial equipment monitoring. Transforming vibration signals into actionable insights.',
    date: '2024-11-28',
    readTime: 10,
    tags: ['Signal Processing', 'ML Engineering', 'Industrial IoT'],
  },
  {
    slug: 'why-ml-models-fail-production',
    title: 'Why ML Models Fail in Production (And How to Fix It)',
    description:
      'Data drift, label delay, and model degradation. Lessons learned from monitoring a fraud detection system in production.',
    date: '2024-09-05',
    readTime: 8,
    tags: ['MLOps', 'Production ML', 'Model Monitoring'],
  },
  {
    slug: 'real-time-inference-jetson-nano',
    title: 'Real-Time Computer Vision on Edge Devices',
    description:
      'Optimizing YOLOv5 for Jetson Nano: TensorRT, FP16, and achieving 30 FPS for industrial welding inspection.',
    date: '2024-07-20',
    readTime: 15,
    tags: ['Edge AI', 'Computer Vision', 'Optimization'],
  },
]

export default function WritingPage() {
  return (
    <div className="pt-32 pb-20">
      <Section>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-accent font-medium mb-4 uppercase tracking-wider text-sm">Blog</p>
          <h1 className="text-5xl lg:text-display-sm font-display font-bold text-primary mb-6">
            Writing & Insights
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Technical deep-dives, lessons learned, and practical guides from building real-world ML
            systems.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {posts.map((post, index) => (
            <Link key={post.slug} href={`/writing/${post.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full group cursor-pointer">
                  <div className="mb-4">
                    <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">{post.description}</p>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4 pb-4 border-b border-neutral-200">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  )
}
