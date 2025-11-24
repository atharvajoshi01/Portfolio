'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Github, ExternalLink, Filter } from 'lucide-react'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'

// Mock project data - will be replaced by MDX content
const projects = [
  {
    slug: 'deep-galerkin-pde-solver',
    title: 'Deep Galerkin Neural PDE Solver',
    description: 'Physics-informed neural network for derivatives pricing. Production-grade implementation with MAE < $0.31 and comprehensive testing suite (100+ tests).',
    date: '2025-01',
    category: ['Deep Learning', 'Quant Finance', 'MLOps'],
    tech: ['PyTorch', 'FastAPI', 'Docker', 'Python', 'PDEs'],
    github: 'https://github.com/atharvajoshi01/deep-galerkin-pricing',
    featured: true,
  },
  {
    slug: 'vibration-fault-classification',
    title: 'Machine Fault Classification',
    description: 'Vibration analytics system for predictive maintenance using MiniRocket + RidgeClassifier. Ongoing project achieving 99.98% accuracy in fault classification.',
    date: '2025-08',
    category: ['Machine Learning', 'MLOps', 'Signal Processing'],
    tech: ['MiniRocket', 'RidgeClassifier', 'Python', 'FFT', 'Scikit-learn'],
    featured: true,
  },
  {
    slug: 'fraud-detection-monitoring',
    title: 'Fraud Detection Monitoring System',
    description: 'ML model monitoring with NannyML for data drift detection and performance tracking. Automated alerting system for production model reliability.',
    date: '2024-08',
    category: ['ML Monitoring', 'Production ML'],
    tech: ['Python', 'NannyML', 'Pandas', 'ML Monitoring'],
    featured: true,
  },
  {
    slug: 'welding-automation-cv',
    title: 'Real-Time Welding Quality Control',
    description: 'Computer vision system on Jetson Nano for automated welding defect detection. CUDA-accelerated inference achieving 30 FPS real-time processing.',
    date: '2024-06',
    category: ['Computer Vision', 'Deep Learning', 'Edge AI'],
    tech: ['OpenCV', 'CUDA', 'Jetson Nano', 'Python', 'Real-time Processing'],
    featured: false,
  },
  {
    slug: 'gdm-metabolomics-analysis',
    title: 'GDM Metabolomics PCA Analysis',
    description: 'Biostatistical analysis of gestational diabetes metabolomics data using PCA and statistical modeling in R. Research collaboration with UB.',
    date: '2024-03',
    category: ['Healthcare', 'Data Science'],
    tech: ['R', 'PCA', 'Statistics', 'Biostatistics', 'Data Visualization'],
    featured: false,
  },
  {
    slug: 'traffic-monitoring-pipeline',
    title: 'Traffic Monitoring SQL Pipeline',
    description: 'Python + SQL workflow for traffic pattern analysis and anomaly detection. ETL pipeline processing 1M+ records with automated reporting.',
    date: '2023-12',
    category: ['Data Engineering', 'ML'],
    tech: ['Python', 'SQL', 'PostgreSQL', 'ETL', 'Data Analysis'],
    featured: false,
  },
]

const allCategories = ['All', 'Deep Learning', 'MLOps', 'Quant Finance', 'Computer Vision', 'Healthcare', 'Data Engineering', 'ML Monitoring']

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects
    return projects.filter((project) => project.category.includes(selectedCategory))
  }, [selectedCategory])

  return (
    <div className="pt-32 pb-20">
      <Section>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-accent font-medium mb-4 uppercase tracking-wider text-sm">Portfolio</p>
          <h1 className="text-5xl lg:text-display-sm font-display font-bold text-primary mb-6">
            Projects & Research
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Production-grade ML systems, deep learning research, and real-world deployments. From
            neural PDE solvers to edge AI applications.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/projects/${project.slug}`}>
                <Card className="h-full group cursor-pointer">
                  {project.featured && (
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium mb-4">
                      Featured
                    </span>
                  )}

                  <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-neutral-600 mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.category.slice(0, 2).map((cat) => (
                      <span
                        key={cat}
                        className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-neutral-200">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-accent/5 text-accent text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 text-neutral-500 text-xs">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-accent font-medium group-hover:translate-x-2 transition-transform">
                      View Details <ArrowRight className="ml-2" size={16} />
                    </div>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                      >
                        <Github size={18} className="text-neutral-600" />
                      </a>
                    )}
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-neutral-500 text-lg">No projects found in this category.</p>
          </motion.div>
        )}
      </Section>
    </div>
  )
}
