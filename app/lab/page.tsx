'use client'

import { useState } from 'react'
import Section from '@/components/ui/Section'
import { motion } from 'framer-motion'
import VibrationDemo from '@/components/demos/VibrationDemo'
import OptionsDemo from '@/components/demos/OptionsDemo'
import PCADemo from '@/components/demos/PCADemo'

const demos = [
  {
    id: 'vibration',
    title: 'Vibration Fault Classifier',
    description: 'Real-time machine fault detection using FFT and CNN',
    component: VibrationDemo,
  },
  {
    id: 'options',
    title: 'Deep Galerkin Options Pricing',
    description: 'Neural PDE solver for derivatives pricing',
    component: OptionsDemo,
  },
  {
    id: 'pca',
    title: 'PCA Visualizer (GDM Metabolomics)',
    description: '2D projection of high-dimensional biomarker data',
    component: PCADemo,
  },
]

export default function LabPage() {
  const [activeDemo, setActiveDemo] = useState(demos[0].id)

  const ActiveComponent = demos.find((d) => d.id === activeDemo)?.component || VibrationDemo

  return (
    <div className="pt-32 pb-20">
      <Section>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-accent font-medium mb-4 uppercase tracking-wider text-sm">
            Interactive Playground
          </p>
          <h1 className="text-5xl lg:text-display-sm font-display font-bold text-primary mb-6">
            Machine Learning Lab
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Explore interactive ML demos showcasing real-world applications. Try out models,
            visualize results, and understand how they work.
          </p>
        </motion.div>

        {/* Demo Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {demos.map((demo) => (
            <motion.button
              key={demo.id}
              onClick={() => setActiveDemo(demo.id)}
              className={`px-6 py-4 rounded-xl text-left transition-all ${
                activeDemo === demo.id
                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                  : 'bg-white hover:bg-neutral-50 border border-neutral-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="font-semibold mb-1">{demo.title}</h3>
              <p className={`text-sm ${activeDemo === demo.id ? 'text-white/90' : 'text-neutral-600'}`}>
                {demo.description}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Active Demo Component */}
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl border border-neutral-200 shadow-lg p-8"
        >
          <ActiveComponent />
        </motion.div>
      </Section>
    </div>
  )
}
