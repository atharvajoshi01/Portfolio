'use client'

import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import { Award, Briefcase, GraduationCap, Code, Trophy } from 'lucide-react'

const timeline = [
  {
    year: '2024 - Present',
    title: 'ML Engineer - Vibration Analytics',
    company: 'MMS LLC',
    description:
      'Built production vibration fault classification system achieving 94% accuracy. Deployed real-time CNN-based predictive maintenance solution reducing downtime by 35%.',
  },
  {
    year: '2024',
    title: 'Data Scientist - Biostatistics Research',
    company: 'University at Buffalo',
    description:
      'Conducted PCA analysis on GDM metabolomics data (156 features, 250 patients). Identified 12 biomarkers with p < 0.001 significance. Manuscript submitted to JCEM.',
  },
  {
    year: '2023 - 2024',
    title: 'Data Engineer - Smart City Analytics',
    company: 'City Traffic Management',
    description:
      'Designed and deployed ETL pipeline processing 1.2M traffic records/month. Implemented anomaly detection achieving 91% precision for incident identification.',
  },
]

const skills = {
  'Deep Learning': ['PyTorch', 'TensorFlow', 'Keras', 'Neural PDEs', 'CNN', 'RNN', 'LSTM'],
  'ML Engineering': ['Scikit-learn', 'XGBoost', 'LightGBM', 'Feature Engineering', 'Model Selection'],
  'MLOps & Production': ['FastAPI', 'Docker', 'CI/CD', 'Model Monitoring', 'NannyML', 'Git'],
  'Data Engineering': ['Python', 'SQL', 'PostgreSQL', 'Pandas', 'NumPy', 'Apache Airflow'],
  'Signal Processing': ['FFT', 'Wavelets', 'Filtering', 'Time-Series Analysis', 'SciPy'],
  'Computer Vision': ['OpenCV', 'YOLO', 'Object Detection', 'Image Processing', 'Edge AI'],
  'Cloud & DevOps': ['AWS', 'Linux', 'Docker', 'Git', 'GitHub Actions'],
  'Statistics & Math': ['PCA', 'Statistical Testing', 'Bayesian Methods', 'Linear Algebra'],
}

const achievements = [
  {
    icon: Trophy,
    title: 'National Chess Player',
    description: 'Represented state in rapid chess tournaments. Strategic thinking applied to ML problem-solving.',
  },
  {
    icon: Award,
    title: '100+ Test Coverage',
    description: 'Deep Galerkin project with comprehensive unit and property-based testing (Hypothesis framework).',
  },
  {
    icon: Code,
    title: 'Open Source Contributor',
    description: 'Published production-grade ML repositories with 8,000+ lines of documented code.',
  },
]

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      <Section>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-accent font-medium mb-4 uppercase tracking-wider text-sm">About Me</p>
          <h1 className="text-5xl lg:text-display-sm font-display font-bold text-primary mb-6">
            Hi, I'm Atharva Joshi
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            I'm a <strong>Machine Learning Engineer and Data Scientist</strong> passionate about
            building <strong>production-grade ML systems</strong> that solve real-world problems.
            From neural PDE solvers to edge AI deployment, I focus on systems that are reliable,
            scalable, and impactful.
          </p>
        </motion.div>

        {/* Bio */}
        <div className="max-w-4xl mx-auto mb-20">
          <Card>
            <div className="prose prose-lg max-w-none">
              <p className="text-neutral-700 leading-relaxed">
                My journey into machine learning started with a fascination for using data to uncover
                patterns and make predictions. Over the years, I've specialized in{' '}
                <strong>deep learning</strong>, <strong>MLOps</strong>, and{' '}
                <strong>production deployment</strong>—building systems that don't just work in
                notebooks, but deliver value in the real world.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                I've worked on diverse domains: <strong>quantitative finance</strong> (neural PDE
                solvers for options pricing), <strong>industrial IoT</strong> (vibration analytics for
                predictive maintenance), <strong>healthcare</strong> (metabolomics biostatistics), and
                <strong> computer vision</strong> (edge AI on Jetson Nano).
              </p>
              <p className="text-neutral-700 leading-relaxed">
                What drives me is the challenge of taking complex ML research and turning it into
                reliable, production-ready systems. I believe in writing clean code, comprehensive
                tests, and documentation that helps others understand and build upon my work.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                When I'm not coding, you'll find me playing chess (I'm a national-level rapid chess
                player), reading research papers, or exploring new ML frameworks and tools.
              </p>
            </div>
          </Card>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-display font-bold text-center mb-12 flex items-center justify-center gap-3">
            <Briefcase className="text-accent" size={32} />
            Experience Timeline
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 px-3 py-1 rounded-lg">
                      <p className="text-accent font-semibold text-sm">{item.year}</p>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                      <p className="text-accent font-medium mb-2">{item.company}</p>
                      <p className="text-neutral-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-20">
          <h2 className="text-3xl font-display font-bold text-center mb-12 flex items-center justify-center gap-3">
            <Code className="text-accent" size={32} />
            Technical Skills
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {Object.entries(skills).map(([category, items], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card>
                  <h3 className="font-semibold text-lg mb-4 text-primary">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-3xl font-display font-bold text-center mb-12 flex items-center justify-center gap-3">
            <Award className="text-accent" size={32} />
            Achievements & Highlights
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-accent" size={32} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                    <p className="text-neutral-600 text-sm">{achievement.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Section>
    </div>
  )
}
