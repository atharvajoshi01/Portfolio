'use client'

import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import { Mail, Linkedin, Github, MapPin } from 'lucide-react'

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'atharvaj2112@gmail.com',
    href: 'mailto:atharvaj2112@gmail.com',
    description: 'Best for detailed inquiries and collaborations',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/atharvajoshi01',
    href: 'https://www.linkedin.com/in/atharvajoshi01',
    description: "Let's connect professionally",
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/atharvajoshi01',
    href: 'https://github.com/atharvajoshi01',
    description: 'Check out my code and projects',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'New York, USA',
    href: null,
    description: 'Open to remote and on-site opportunities',
  },
]

const availability = [
  {
    title: 'Full-Time Opportunities',
    description:
      'ML Engineer, Data Scientist, or MLOps roles. Interested in companies building production ML systems at scale.',
    status: 'Open',
  },
  {
    title: 'Consulting Projects',
    description:
      'Short-term engagements for ML system design, model optimization, or production deployment guidance.',
    status: 'Open',
  },
  {
    title: 'Research Collaborations',
    description:
      'Academic partnerships in deep learning, signal processing, or biostatistics. Experience with metabolomics and industrial ML.',
    status: 'Open',
  },
]

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20">
      <Section>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-accent font-medium mb-4 uppercase tracking-wider text-sm">
            Get in Touch
          </p>
          <h1 className="text-5xl lg:text-display-sm font-display font-bold text-primary mb-6">
            Let's Work Together
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            I'm always interested in hearing about new opportunities, collaborations, and challenging
            ML problems. Whether you're hiring, looking for a consultant, or just want to chat about
            machine learning — I'd love to hear from you.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20">
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {method.href ? (
                  <a href={method.href} target="_blank" rel="noopener noreferrer">
                    <Card className="group cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                          <Icon size={24} className="text-accent group-hover:text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1 group-hover:text-accent transition-colors">
                            {method.label}
                          </h3>
                          <p className="text-accent font-mono text-sm mb-2">{method.value}</p>
                          <p className="text-neutral-600 text-sm">{method.description}</p>
                        </div>
                      </div>
                    </Card>
                  </a>
                ) : (
                  <Card>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Icon size={24} className="text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{method.label}</h3>
                        <p className="text-neutral-700 font-mono text-sm mb-2">{method.value}</p>
                        <p className="text-neutral-600 text-sm">{method.description}</p>
                      </div>
                    </div>
                  </Card>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Availability */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            Currently Available For
          </h2>

          <div className="space-y-6">
            {availability.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                      <p className="text-neutral-600 leading-relaxed">{item.description}</p>
                    </div>
                    <div>
                      <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold text-sm">
                        {item.status}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-8">
            <h3 className="text-2xl font-display font-bold mb-4">Ready to Start a Conversation?</h3>
            <p className="text-neutral-600 mb-6">
              Send me an email at{' '}
              <a href="mailto:atharvaj2112@gmail.com" className="text-accent hover:underline font-semibold">
                atharvaj2112@gmail.com
              </a>{' '}
              and I'll get back to you within 24 hours.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>Usually responds within 1 business day</span>
            </div>
          </div>
        </motion.div>
      </Section>
    </div>
  )
}
