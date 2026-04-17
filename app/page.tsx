'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  ExternalLink,
  GitPullRequest,
  GitMerge,
  BookOpen,
  Gamepad2,
  Music,
  Tv,
} from 'lucide-react'

/* ── animation preset ── */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

/* ========================================================
   DATA
   ======================================================== */

const projects = [
  {
    title: 'finreg-ml',
    description:
      'Regulation-aware ML pipeline for finance. Published on PyPI with GovernedModel, SHAP explainability, fairness audits, EU AI Act compliance, drift detection (KS+PSI), and consolidated reports.',
    tags: ['Python', 'scikit-learn', 'SHAP', 'PyPI', 'GitHub Actions'],
    image: '/images/projects/finreg-ml.png',
    gradient: 'from-[#1A232A] to-[#0E194A]',
    links: {
      github: 'https://github.com/atharvajoshi01/finreg-ml',
      pypi: 'https://pypi.org/project/finreg-ml/',
      demo: 'https://huggingface.co/spaces/aadu21/finreg-ml-demo',
    },
  },
  {
    title: 'agenteval',
    description:
      'AI agent evaluation framework with AgentRunner, LLM-as-judge scoring (OpenAI + Anthropic), CLI, safety checks for PII & prompt injection, and multi-format export (JSON/CSV/Markdown).',
    tags: ['Python', 'OpenAI', 'Anthropic', 'pydantic', 'CLI'],
    image: '/images/projects/agenteval.png',
    gradient: 'from-[#2A324E] to-[#3A2A4E]',
    links: {
      github: 'https://github.com/atharvajoshi01/agenteval',
    },
  },
  {
    title: 'crypto-stat-arb',
    description:
      'Statistical arbitrage engine for crypto markets. Engle-Granger cointegration, Johansen basket trading, Kalman filter hedge ratios, walk-forward backtesting, regime detection, and paper trading.',
    tags: ['Python', 'statsmodels', 'scipy', 'pandas', 'Kraken API'],
    image: '/images/projects/crypto-stat-arb.png',
    gradient: 'from-[#0E194A] to-[#1A232A]',
    links: {
      github: 'https://github.com/atharvajoshi01/crypto-stat-arb',
    },
  },
]

const mergedPRs = [
  { repo: 'TauricResearch/TradingAgents', number: 549, title: 'Unicode encoding fix', stars: '50.8k' },
  { repo: 'Microsoft/agent-governance-toolkit', number: 776, title: 'EU AI Act risk classifier', stars: '1.2k' },
  { repo: 'Microsoft/agent-governance-toolkit', number: 786, title: 'Docs follow-up', stars: '1.2k' },
  { repo: 'AI4Finance-Foundation/FinRL', number: 1410, title: 'Threading bug fix', stars: '14.6k' },
]

const openPRs = [
  { repo: 'goldmansachs/gs-quant', number: 345, title: 'Pandas 2.x compatibility', stars: '10k' },
  { repo: 'google/tf-quant-finance', number: 113, title: 'MD5 to SHA-256 security fix', stars: '5.3k' },
  { repo: 'sktime/sktime', number: 9809, title: 'NaiveForecaster bug fix', stars: '9.7k' },
  { repo: 'stefan-jansen/zipline-reloaded', number: 328, title: 'DataPortal correctness bugs', stars: '1.7k' },
  { repo: 'bukosabino/ta', number: 364, title: 'Rank + Percentile indicators', stars: '5k' },
  { repo: 'ranaroussi/quantstats', number: 512, title: 'Compounded flag for calmar/rar', stars: '7k' },
  { repo: 'joshyattridge/smart-money-concepts', number: 103, title: 'Look-ahead bias fix', stars: '1.4k' },
]

const devicon = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'
const simpleicon = 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons'
const skillIcons: Record<string, string> = {
  'Python': `${devicon}/python/python-original.svg`,
  'SQL': `${devicon}/postgresql/postgresql-original.svg`,
  'C++': `${devicon}/cplusplus/cplusplus-original.svg`,
  'TypeScript': `${devicon}/typescript/typescript-original.svg`,
  'scikit-learn': `${devicon}/scikitlearn/scikitlearn-original.svg`,
  'PyTorch': `${devicon}/pytorch/pytorch-original.svg`,
  'pandas': `${devicon}/pandas/pandas-original.svg`,
  'numpy': `${devicon}/numpy/numpy-original.svg`,
  'Docker': `${devicon}/docker/docker-original.svg`,
  'FastAPI': `${devicon}/fastapi/fastapi-original.svg`,
  'GitHub Actions': `${devicon}/github/github-original.svg`,
  'Git': `${devicon}/git/git-original.svg`,
  'Claude': `${simpleicon}/anthropic.svg`,
  'ChatGPT': `${simpleicon}/openai.svg`,
  'Gemini': `${simpleicon}/googlegemini.svg`,
}

const skillColors: Record<string, string> = {
  'SHAP': '#7B68EE', 'statsmodels': '#4B8BBE', 'scipy': '#8CAAE6',
  'Engle-Granger': '#2E86C1', 'Kalman Filter': '#1ABC9C', 'GARCH': '#8E44AD',
  'pydantic': '#E92063', 'LLMs': '#10B981', 'Prompt Engineering': '#F59E0B',
}

const skillGroups = [
  {
    title: 'Languages',
    items: ['Python', 'SQL', 'C++', 'TypeScript'],
  },
  {
    title: 'ML & Deep Learning',
    items: ['scikit-learn', 'PyTorch', 'SHAP', 'statsmodels', 'scipy'],
  },
  {
    title: 'Data & Quant Finance',
    items: ['pandas', 'numpy', 'Engle-Granger', 'Kalman Filter', 'GARCH'],
  },
  {
    title: 'Tools & DevOps',
    items: ['Docker', 'FastAPI', 'GitHub Actions', 'pydantic', 'Git'],
  },
  {
    title: 'AI',
    items: ['Claude', 'ChatGPT', 'Gemini', 'LLMs', 'Prompt Engineering'],
  },
]

const timeline = [
  {
    type: 'education' as const,
    title: 'MS Data Science',
    org: 'State University of New York at Buffalo',
    period: '2024 - 2026',
    detail: 'GPA 3.73',
    description: 'Pursuing a research-focused Master\'s in Data Science, spanning machine learning, statistical modeling, quantitative finance, and production ML systems. Building open source tools and contributing to major frameworks.',
    bullets: [
      'Published finreg-ml on PyPI — regulation-aware ML pipeline',
      'Built crypto-stat-arb — cointegration-based statistical arbitrage engine',
      'Built agenteval — AI agent evaluation framework',
    ],
  },
  {
    type: 'work' as const,
    title: 'Open Source Contributor',
    org: 'Microsoft, Google, Goldman Sachs, FinRL, TradingAgents',
    period: '2025 - Present',
    detail: '4 merged PRs, 7 open PRs',
    description: 'Contributing bug fixes, features, and security patches to quantitative finance and ML frameworks. Working across repos with 100k+ combined stars, from threading fixes in FinRL to EU AI Act compliance in Microsoft\'s governance toolkit.',
    bullets: [
      'TradingAgents (50.8k stars) — Unicode encoding fix',
      'Microsoft agent-governance-toolkit — EU AI Act risk classifier',
      'Goldman Sachs gs-quant — Pandas 2.x compatibility',
      'Google tf-quant-finance — MD5 to SHA-256 security fix',
    ],
  },
]

/* ========================================================
   LOCAL TIME COMPONENT
   ======================================================== */
function LocalTime() {
  const [time, setTime] = useState<string>('')
  const [date, setDate] = useState<string>('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }))
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase())
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="rounded-2xl flex flex-col items-center justify-center text-center h-56" style={{ background: 'linear-gradient(135deg, #3A2A4E 0%, #1A1A3E 100%)' }}>
      <p className="text-sm font-semibold text-white mb-2">Local Time</p>
      <p className="text-4xl font-display font-bold text-white">{time}</p>
      <p className="text-sm text-neutral-400 mt-1">{date}</p>
    </div>
  )
}

/* ========================================================
   PAGE
   ======================================================== */
export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Animated grid background */}
      <div className="fixed inset-0 animated-grid -z-10" />

      {/* ═══════════ HERO ═══════════ */}
      <section className="min-h-[90vh] flex items-center justify-center">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto"
          >
            {/* Name & title */}
            <p className="text-neutral-500 text-lg mb-1">Atharva Joshi</p>
            <p className="text-neutral-500 mb-6">Data Scientist &amp; ML Engineer</p>

            {/* Tagline with colored keywords */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight mb-6">
              Building{' '}
              <span className="text-accent">ML Systems</span>
              {' '}for Finance and{' '}
              <span className="text-accent">AI Evaluation</span>
            </h1>

            {/* Badges row */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <span className="badge-green">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 animate-pulse" />
                Open for work
              </span>
              <span className="w-px h-5 bg-neutral-300" />
              <span className="badge-neutral">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/icons/ub-logo.svg" alt="UB" className="w-6 h-6 mr-1.5 object-contain rounded" />
                MS Data Science @ SUNY Buffalo
              </span>
            </div>

            {/* Social icon row — large branded logo cards */}
            <div className="flex items-center justify-center gap-5 mt-2">
              {[
                { href: 'https://github.com/atharvajoshi01', label: 'GitHub', bg: '#f0f0f0', rotate: '-3deg', iconColor: '#181717' },
                { href: 'https://www.linkedin.com/in/atharvajoshi01', label: 'LinkedIn', bg: '#E8F0FE', rotate: '2deg', iconColor: '#0A66C2' },
                { href: '/resume.pdf', label: 'Resume', bg: '#FFF3E0', rotate: '-2deg', iconColor: '#E65100' },
              ].map((s) => {
                const IconComp = s.label === 'GitHub' ? Github : s.label === 'LinkedIn' ? Linkedin : FileText
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08, rotate: 0, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-24 h-24 rounded-3xl border border-neutral-200/60 flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-xl transition-all"
                    style={{ backgroundColor: s.bg, transform: `rotate(${s.rotate})` }}
                    aria-label={s.label}
                  >
                    <IconComp size={36} style={{ color: s.iconColor }} />
                    <span className="text-[10px] font-semibold text-neutral-500">{s.label}</span>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ PROJECTS ═══════════ */}
      <section id="projects" className="section-padding">
        <div className="container-custom">
          <motion.h2 {...fadeUp} className="text-center text-3xl lg:text-4xl font-display font-bold mb-4">
            Some of my <span className="text-accent">best works</span>
          </motion.h2>
          <motion.p {...fadeUp} className="text-center text-neutral-500 mb-12 max-w-lg mx-auto">
            Published on PyPI, deployed on HuggingFace, battle-tested with 180+ tests
          </motion.p>

          <div className="space-y-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-2xl p-6 lg:p-8 bg-gradient-to-br ${project.gradient} text-white`}
              >
                <h3 className="text-2xl font-display font-bold mb-3">{project.title}</h3>
                <p className="text-neutral-300 leading-relaxed mb-5 max-w-2xl">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/90 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <Github size={15} /> GitHub
                  </a>
                  {project.links.pypi && (
                    <a
                      href={project.links.pypi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
                    >
                      <ExternalLink size={15} /> PyPI
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
                    >
                      <ExternalLink size={15} /> Live Demo
                    </a>
                  )}
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ OPEN SOURCE ═══════════ */}
      <section id="opensource" className="section-padding bg-neutral-50/80">
        <div className="container-custom">
          <motion.h2 {...fadeUp} className="text-center text-3xl lg:text-4xl font-display font-bold mb-4">
            Open Source <span className="text-accent">Contributions</span>
          </motion.h2>
          <motion.p {...fadeUp} className="text-center text-neutral-500 mb-12 max-w-lg mx-auto">
            Contributing to repos with 100k+ combined stars
          </motion.p>

          {/* Merged PRs */}
          <motion.div {...fadeUp} className="mb-10">
            <h3 className="flex items-center gap-2 text-lg font-display font-semibold mb-4">
              <GitMerge size={18} className="text-purple-600" />
              Merged
            </h3>
            <div className="space-y-3">
              {mergedPRs.map((pr) => (
                <a
                  key={`${pr.repo}-${pr.number}`}
                  href={`https://github.com/${pr.repo}/pull/${pr.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl border border-neutral-200 bg-white hover:border-purple-300 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 text-xs font-bold shrink-0">
                      #{pr.number}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-neutral-900 truncate">{pr.title}</p>
                      <p className="text-xs text-neutral-400">{pr.repo}</p>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-400 shrink-0 ml-3">{pr.stars} stars</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Open PRs */}
          <motion.div {...fadeUp}>
            <h3 className="flex items-center gap-2 text-lg font-display font-semibold mb-4">
              <GitPullRequest size={18} className="text-emerald-600" />
              Open
            </h3>
            <div className="space-y-3">
              {openPRs.map((pr) => (
                <a
                  key={`${pr.repo}-${pr.number}`}
                  href={`https://github.com/${pr.repo}/pull/${pr.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl border border-neutral-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 text-xs font-bold shrink-0">
                      #{pr.number}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-neutral-900 truncate">{pr.title}</p>
                      <p className="text-xs text-neutral-400">{pr.repo}</p>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-400 shrink-0 ml-3">{pr.stars} stars</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SKILLS ═══════════ */}
      <section id="skills" className="section-padding bg-gradient-to-br from-navy-light to-navy text-white">
        <div className="container-custom">
          <motion.h2 {...fadeUp} className="text-center text-3xl lg:text-4xl font-display font-bold mb-4">
            What I am <span className="text-accent-light">skilled at</span>
          </motion.h2>
          <motion.p {...fadeUp} className="text-center text-neutral-400 mb-12 max-w-md mx-auto">
            Python-first stack for ML, quantitative finance, and production systems
          </motion.p>

          <div className="grid sm:grid-cols-2 gap-5">
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="skill-card"
              >
                <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium bg-white/10 text-white/90 border border-white/10"
                    >
                      {skillIcons[item] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={skillIcons[item]}
                          alt={item}
                          className="w-4 h-4 object-contain shrink-0"
                          style={skillIcons[item].includes('simple-icons') ? { filter: 'invert(1)' } : undefined}
                        />
                      ) : (
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: skillColors[item] || '#6B7280' }}
                        />
                      )}
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ABOUT / EXPERIENCE ═══════════ */}
      <section id="experience" className="section-padding">
        <div className="container-custom">
          {/* Heading */}
          <motion.h2 {...fadeUp} className="text-center text-3xl lg:text-4xl font-display font-bold mb-6">
            A little about me
          </motion.h2>

          {/* Bio paragraph */}
          <motion.p {...fadeUp} className="text-neutral-600 leading-relaxed mb-4 max-w-3xl mx-auto">
            I&apos;m a data scientist and ML engineer who builds production-grade machine learning systems. Currently pursuing my MS in Data Science at SUNY Buffalo, focusing on quantitative finance and AI evaluation. My work bridges statistical modeling with software engineering — from cointegration-based stat arb engines to EU AI Act compliance pipelines.
          </motion.p>
          <motion.p {...fadeUp} className="text-neutral-600 leading-relaxed mb-16 max-w-3xl mx-auto">
            I&apos;m passionate about open source and have contributed to repos at Microsoft, Google, Goldman Sachs, and more. I publish my own tools on PyPI and believe in building systems that are rigorous, well-tested, and production-ready. Based in New York, targeting Data Scientist, ML Engineer, Quant Developer, and AI Engineer roles.
          </motion.p>

          {/* Timeline entries — alternating layout */}
          <div className="space-y-20 max-w-4xl mx-auto">
            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`grid md:grid-cols-2 gap-10 items-start ${i % 2 === 1 ? 'md:direction-rtl' : ''}`}
              >
                {/* Decorative side — icon block */}
                <div className={`flex justify-center ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="w-full max-w-xs rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/10 p-8 flex flex-col items-center justify-center text-center">
                    {item.type === 'education' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src="/images/icons/ub-logo.svg" alt="University at Buffalo" className="w-20 h-20 object-contain mb-4" />
                    ) : (
                      <Github size={56} className="text-neutral-800 mb-4" />
                    )}
                    <p className="text-sm font-semibold text-neutral-900">{item.title}</p>
                    <p className="text-xs text-neutral-500 mt-1">{item.period}</p>
                  </div>
                </div>

                {/* Content side */}
                <div className={`${i % 2 === 1 ? 'md:order-1' : ''}`}>
                  <h3 className="text-2xl font-display font-bold text-neutral-900">{item.title}</h3>
                  <p className="text-accent font-semibold mt-1">{item.org}</p>
                  <p className="text-sm text-neutral-400 mt-1 mb-4">{item.period} &middot; {item.detail}</p>

                  <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Bullet points */}
                  {item.bullets && (
                    <ul className="space-y-2">
                      {item.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-neutral-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ A LITTLE MORE ABOUT ME ═══════════ */}
      <section className="section-padding bg-neutral-50/80">
        <div className="container-custom">
          <motion.h2 {...fadeUp} className="text-center text-3xl lg:text-4xl font-display font-bold mb-12">
            A little more about me
          </motion.h2>

          {/* Row 1: Reading | Listening | Watching — 3 equal columns */}
          <motion.div {...fadeUp} className="grid grid-cols-3 gap-4">
            {/* Currently Reading */}
            <div className="rounded-2xl overflow-hidden relative h-72 flex flex-col items-center justify-end p-4" style={{ background: 'linear-gradient(180deg, #2A1A1A 0%, #1A0A0A 100%)' }}>
              <p className="absolute top-4 left-4 text-sm font-semibold text-white z-10">Currently Reading</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/media/me-before-you.jpg"
                alt="Me Before You"
                className="h-56 rounded-lg shadow-2xl object-contain"
              />
            </div>

            {/* Currently Listening */}
            <div className="rounded-2xl overflow-hidden relative h-72" style={{ background: '#181818' }}>
              <p className="absolute top-4 left-4 text-sm font-semibold text-white z-10">Currently Listening</p>
              <div className="flex flex-col justify-center h-full px-5 pt-10">
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/media/the-night-we-met.jpg"
                    alt="Strange Trails"
                    className="w-24 h-24 rounded-lg shadow-xl shrink-0"
                  />
                  <div className="text-white min-w-0">
                    <p className="text-base font-bold truncate">The Night We Met</p>
                    <p className="text-xs text-neutral-400 mt-0.5">Lord Huron</p>
                    <a
                      href="https://open.spotify.com/track/2qAMkMJo7LFVRC1tPaOdJB"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#1DB954] mt-2 hover:underline"
                    >
                      <Music size={12} />
                      Save on Spotify
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Currently Watching */}
            <div className="rounded-2xl overflow-hidden relative h-72 flex flex-col items-center justify-end p-4" style={{ background: 'linear-gradient(180deg, #2A324E 0%, #0E194A 100%)' }}>
              <p className="absolute top-4 left-4 text-sm font-semibold text-white z-10">Currently Watching</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/media/grave-of-fireflies.jpg"
                alt="Grave of the Fireflies"
                className="h-56 rounded-lg shadow-2xl object-contain"
              />
            </div>
          </motion.div>

          {/* Row 2: Always Supporting | Currently Playing | Local Time — 3 equal columns */}
          <motion.div {...fadeUp} className="grid grid-cols-3 gap-4 mt-4">
            {/* Always Supporting */}
            <div className="lifestyle-card flex flex-col h-56">
              <p className="text-sm font-semibold text-white mb-auto">Always Supporting</p>
              <div className="flex items-center justify-center gap-5 flex-wrap">
                {[
                  { name: 'Man United', src: '/images/teams/manutd.svg' },
                  { name: 'Real Madrid', src: '/images/teams/realmadrid.svg' },
                  { name: 'India Cricket', src: '/images/teams/india-cricket.png' },
                  { name: 'Bills', src: '/images/teams/bills.svg' },
                ].map((team) => (
                  <div key={team.name}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={team.src} alt={team.name} className="w-20 h-20 object-contain drop-shadow-lg" />
                  </div>
                ))}
              </div>
            </div>

            {/* Currently Playing */}
            <a
              href="https://www.chess.com/member/aaichamulga"
              target="_blank"
              rel="noopener noreferrer"
              className="lifestyle-card bg-gradient-to-br from-[#769656]/40 to-[#1A232A] flex flex-col items-center justify-center h-56 hover:scale-[1.02] transition-transform"
            >
              <p className="text-sm font-semibold text-white mb-4">Currently Playing</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/media/chess-logo.png"
                alt="Chess.com"
                className="w-24 h-24 object-contain drop-shadow-2xl"
              />
            </a>

            {/* Local Time */}
            <LocalTime />
          </motion.div>

          {/* Row 3: Inspirations — full width */}
          <motion.div {...fadeUp} className="lifestyle-card py-8 mt-4">
            <p className="text-sm font-semibold text-white mb-8 text-center">Inspirations</p>
            <div className="flex items-center justify-center gap-12 flex-wrap">
              {[
                { name: 'Cristiano Ronaldo', sport: 'Football', img: '/images/people/ronaldo.jpg' },
                { name: 'Novak Djokovic', sport: 'Tennis', img: '/images/people/djokovic.jpg' },
                { name: 'Kobe Bryant', sport: 'Basketball', img: '/images/people/kobe.jpg' },
                { name: 'Bobby Fischer', sport: 'Chess', img: '/images/people/fischer.jpg' },
              ].map((person) => (
                <div key={person.name} className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 shadow-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={person.img}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-white">{person.name}</p>
                    <p className="text-[11px] text-neutral-500">{person.sport}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" className="section-padding bg-gradient-to-br from-navy-light to-navy text-white">
        <div className="container-custom">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-8">
              Let&apos;s get connected!
            </h2>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Left: contact info */}
              <div>
                <p className="text-lg font-semibold mb-1">Send me a Hi!</p>
                <p className="text-neutral-400 text-sm mb-6">and I&apos;ll reach out to you</p>

                <div className="space-y-3">
                  <a
                    href="mailto:atharvaj2112@gmail.com"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-accent/50 transition-all group"
                  >
                    <Mail size={16} className="text-neutral-400 group-hover:text-accent transition-colors" />
                    <span className="text-sm">atharvaj2112@gmail.com</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/atharvajoshi01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-accent/50 transition-all group"
                  >
                    <Linkedin size={16} className="text-neutral-400 group-hover:text-accent transition-colors" />
                    <span className="text-sm">linkedin.com/in/atharvajoshi01</span>
                  </a>
                  <a
                    href="https://github.com/atharvajoshi01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-accent/50 transition-all group"
                  >
                    <Github size={16} className="text-neutral-400 group-hover:text-accent transition-colors" />
                    <span className="text-sm">github.com/atharvajoshi01</span>
                  </a>
                </div>
              </div>

              {/* Right: social icons + tagline */}
              <div className="flex flex-col justify-center">
                <p className="text-lg font-semibold mb-1">Find me on my socials</p>
                <p className="text-neutral-400 text-sm mb-6">and drop me a hey</p>

                <div className="flex gap-3">
                  {[
                    { href: 'https://github.com/atharvajoshi01', icon: Github },
                    { href: 'https://www.linkedin.com/in/atharvajoshi01', icon: Linkedin },
                    { href: 'mailto:atharvaj2112@gmail.com', icon: Mail },
                  ].map((s, i) => {
                    const Icon = s.icon
                    return (
                      <motion.a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-accent/30 transition-all"
                      >
                        <Icon size={20} />
                      </motion.a>
                    )
                  })}
                </div>

                <p className="text-neutral-500 text-xs mt-8">
                  Based in New York &middot; Open to relocation
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
