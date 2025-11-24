'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Mail, Download, Code2, Brain, Zap } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Section from '@/components/ui/Section'
import FFTWaveform from '@/components/visualizations/FFTWaveform'

const featuredProjects = [
  {
    title: 'Deep Galerkin Neural PDE Solver',
    description: 'Production-grade neural network for options pricing using physics-informed deep learning. MAE < $0.31, ~12ms inference for 1000 evaluations.',
    tags: ['Deep Learning', 'PyTorch', 'Quantitative Finance', 'PDE Solvers'],
    href: '/projects/deep-galerkin-pde-solver',
    metrics: [
      { label: 'Accuracy', value: 'MAE $0.31' },
      { label: 'Speed', value: '12ms/1k' },
      { label: 'Tests', value: '100+' },
    ],
  },
  {
    title: 'Machine Fault Classification',
    description: 'Vibration analytics system for predictive maintenance using MiniRocket + RidgeClassifier. Ongoing project achieving 99.98% accuracy in fault classification.',
    tags: ['MiniRocket', 'RidgeClassifier', 'Signal Processing', 'MLOps'],
    href: '/projects/vibration-fault-classification',
    metrics: [
      { label: 'Accuracy', value: '99.98%' },
      { label: 'Status', value: 'Ongoing' },
      { label: 'Data', value: 'Real-time' },
    ],
  },
  {
    title: 'Fraud Detection Monitoring',
    description: 'ML model monitoring system with data drift detection and performance alerts. NannyML-based solution for production model reliability.',
    tags: ['ML Monitoring', 'Data Drift', 'Production ML', 'Python'],
    href: '/projects/fraud-detection-monitoring',
    metrics: [
      { label: 'Drift Detection', value: 'Real-time' },
      { label: 'Alerts', value: 'Automated' },
      { label: 'Coverage', value: '5 features' },
    ],
  },
]

const skills = [
  {
    icon: Brain,
    title: 'Deep Learning',
    items: ['CNN', 'RNN', 'LSTM', 'Neural PDEs', 'PyTorch', 'TensorFlow'],
  },
  {
    icon: Code2,
    title: 'MLOps & Production',
    items: ['FastAPI', 'Docker', 'CI/CD', 'Model Monitoring', 'AWS', 'Git'],
  },
  {
    icon: Zap,
    title: 'ML Engineering',
    items: ['Scikit-learn', 'Pandas', 'NumPy', 'Signal Processing', 'Computer Vision'],
  },
]

export default function HomePage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-neutral-100 -z-10" />

        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                className="text-accent font-medium mb-4 uppercase tracking-wider text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                ML Engineer & Data Scientist
              </motion.p>

              <motion.h1
                className="text-5xl lg:text-display-md font-display font-bold text-primary mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                I build and deploy{' '}
                <span className="gradient-text">real-world machine learning</span> systems
              </motion.h1>

              <motion.p
                className="text-lg lg:text-xl text-neutral-600 mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Specializing in Deep Learning, MLOps, Predictive Maintenance, and Quantitative
                Finance. From neural PDE solvers to production ML pipelines — I build systems that
                work.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button href="/projects" size="lg">
                  View Projects
                  <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button
                  href="https://github.com/atharvajoshi01"
                  variant="outline"
                  size="lg"
                >
                  <Github className="mr-2" size={20} />
                  GitHub
                </Button>
              </motion.div>

              <motion.div
                className="flex items-center space-x-6 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <a
                  href="https://www.linkedin.com/in/atharvajoshi01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-accent transition-colors"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="mailto:atharvaj2112@gmail.com"
                  className="text-neutral-600 hover:text-accent transition-colors"
                >
                  <Mail size={24} />
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column - Interactive Visualization */}
            <motion.div
              className="h-[400px] lg:h-[500px]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <FFTWaveform />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <Section title="Featured Projects" subtitle="Recent Work">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <Link key={project.title} href={project.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full group cursor-pointer">
                  <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-neutral-200">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="text-center">
                        <p className="text-lg font-semibold text-accent">{metric.value}</p>
                        <p className="text-xs text-neutral-500">{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center text-accent font-medium group-hover:translate-x-2 transition-transform">
                    View Project <ArrowRight className="ml-2" size={16} />
                  </div>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Button href="/projects" variant="outline" size="lg">
            View All Projects
          </Button>
        </motion.div>
      </Section>

      {/* Skills & Expertise */}
      <Section title="Technical Expertise" subtitle="Skills" className="bg-neutral-100/50">
        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-accent" size={24} />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-4">{skill.title}</h3>
                  <ul className="space-y-2">
                    {skill.items.map((item) => (
                      <li key={item} className="flex items-center text-neutral-600">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-primary text-white">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Available for ML/AI consulting, full-time opportunities, and exciting collaborations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Get in Touch
            </Button>
            <Button href="/lab" variant="outline" size="lg" className="!text-white !border-white hover:!bg-white hover:!text-primary">
              Explore Interactive Demos
            </Button>
          </div>
        </motion.div>
      </Section>
    </div>
  )
}
